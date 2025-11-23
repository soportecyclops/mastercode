/* ============================================================
   CodeInsertor - scripts.js
   Lógica completa de análisis, historial, IA y manipulación
   ============================================================ */

console.log("CodeInsertor loaded ✓");

// ============================================================
// 1.  Helpers básicos
// ============================================================

function $(id) {
    return document.getElementById(id);
}

function notify(msg, type = "info") {
    const box = $("notification");
    box.textContent = msg;
    box.className = `show ${type}`;
    setTimeout(() => {
        box.className = "";
    }, 2500);
}

// ============================================================
// 2. Manejo del historial (máximo 5 versiones)
// ============================================================

let historyStack = [];
const MAX_HISTORY = 5;

function addToHistory(content, reason = "change") {
    historyStack.unshift({
        timestamp: new Date().toISOString(),
        content,
        reason
    });

    if (historyStack.length > MAX_HISTORY) {
        historyStack.pop();
    }

    saveHistoryToLocalStorage();

    notify("Versión guardada (" + reason + ")");
}

function saveHistoryToLocalStorage() {
    localStorage.setItem("codeinsertor_history", JSON.stringify(historyStack));
}

function loadHistoryFromLocalStorage() {
    const raw = localStorage.getItem("codeinsertor_history");
    if (raw) {
        historyStack = JSON.parse(raw);
    }
}

function showHistory() {
    const menu = $("historyMenu");
    menu.innerHTML = "";

    if (historyStack.length === 0) {
        menu.innerHTML = "<p>No hay versiones guardadas.</p>";
        return;
    }

    historyStack.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <strong>Versión ${index + 1}</strong>
            <small>${item.timestamp}</small>
            <p>Motivo: ${item.reason}</p>
            <button onclick="restoreHistory(${index})">Restaurar</button>
        `;
        menu.appendChild(div);
    });
}

function restoreHistory(index) {
    const entry = historyStack[index];
    if (!entry) return;

    $("originalCode").value = entry.content;
    notify("Versión restaurada");
}

// ============================================================
// 3. Acción: Cargar archivo
// ============================================================

$("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        $("originalCode").value = reader.result;
        addToHistory(reader.result, "Archivo cargado");
    };
    reader.readAsText(file);

    detectLanguage(file.name);
});

// ============================================================
// 4. Detección automática del lenguaje
// ============================================================

function detectLanguage(filename) {
    const ext = filename.split(".").pop().toLowerCase();
    const map = {
        js: "JavaScript",
        html: "HTML",
        css: "CSS",
        py: "Python",
        cpp: "C++",
        cs: "C#",
        java: "Java"
    };

    $("detectedLanguage").textContent = map[ext] || "Desconocido";
}

// ============================================================
// 5. Búsqueda Local Inteligente (Jaccard + similitud)
// ============================================================

function analyzeLocal() {
    const original = $("originalCode").value.split("\n");
    const patch = $("patchCode").value.split("\n");

    if (patch.length === 0 || patch[0].trim() === "") {
        notify("No hay código en la ventana 2", "error");
        return;
    }

    const results = [];

    for (let i = 0; i < original.length; i++) {
        const window = original.slice(i, i + patch.length);
        const score = similarity(window.join("\n"), patch.join("\n"));

        results.push({
            index: i,
            score
        });
    }

    results.sort((a, b) => b.score - a.score);

    if (results.length === 0) return;

    const best = results[0];

    showAnalysis(best, results);
}

// Similaridad basada en conjuntos de tokens
function similarity(a, b) {
    const A = new Set(a.split(/\W+/));
    const B = new Set(b.split(/\W+/));
    const inter = new Set([...A].filter(x => B.has(x)));
    const union = new Set([...A, ...B]);
    return inter.size / union.size;
}

// ============================================================
// 6. Mostrar análisis y alternativas
// ============================================================

function showAnalysis(best, alternatives) {
    const res = $("analysis");
    res.innerHTML = `
        <h3>Mejor coincidencia encontrada</h3>
        <p>Línea: <strong>${best.index + 1}</strong></p>
        <p>Similitud: <strong>${(best.score * 100).toFixed(2)}%</strong></p>

        <button onclick="applyReplace(${best.index})">Reemplazar aquí</button>
        <button onclick="applyInsertAbove(${best.index})">Insertar arriba</button>
        <button onclick="applyInsertBelow(${best.index})">Insertar abajo</button>

        <hr>
        <button onclick="toggleAlternatives()">Mostrar coincidencias alternativas</button>

        <div id="alternatives" style="display:none; margin-top:10px;">
            <h4>Otras coincidencias</h4>
        </div>
    `;

    const altBox = $("alternatives");

    alternatives.slice(1, 10).forEach(alt => {
        const d = document.createElement("div");
        d.className = "alt-item";
        d.innerHTML = `
            <p>Línea ${alt.index + 1} — ${(alt.score * 100).toFixed(2)}%</p>
            <button onclick="applyReplace(${alt.index})">Reemplazar aquí</button>
            <button onclick="applyInsertAbove(${alt.index})">Insertar arriba</button>
            <button onclick="applyInsertBelow(${alt.index})">Insertar abajo</button>
        `;
        altBox.appendChild(d);
    });

    highlightLine(best.index);
}

function toggleAlternatives() {
    const el = $("alternatives");
    el.style.display = el.style.display === "none" ? "block" : "none";
}

// ============================================================
// 7. Resaltar líneas
// ============================================================

function highlightLine(lineIndex) {
    const textarea = $("originalCode");
    const lines = textarea.value.split("\n");

    let start = 0;
    for (let i = 0; i < lineIndex; i++) {
        start += lines[i].length + 1;
    }

    const end = start + lines[lineIndex].length;

    textarea.focus();
    textarea.setSelectionRange(start, end);

    notify("Coincidencia resaltada");
}

// ============================================================
// 8. Aplicar cambios (Replace / Insert)
// ============================================================

function applyReplace(index) {
    const content = $("originalCode").value.split("\n");
    const patch = $("patchCode").value.split("\n");

    content.splice(index, patch.length, ...patch);

    $("originalCode").value = content.join("\n");
    addToHistory($("originalCode").value, "Replace");

    notify("Reemplazo aplicado", "success");
}

function applyInsertAbove(index) {
    const content = $("originalCode").value.split("\n");
    const patch = $("patchCode").value.split("\n");

    content.splice(index, 0, ...patch);

    $("originalCode").value = content.join("\n");
    addToHistory($("originalCode").value, "Insert Above");

    notify("Insertado arriba", "success");
}

function applyInsertBelow(index) {
    const content = $("originalCode").value.split("\n");
    const patch = $("patchCode").value.split("\n");

    content.splice(index + 1, 0, ...patch);

    $("originalCode").value = content.join("\n");
    addToHistory($("originalCode").value, "Insert Below");

    notify("Insertado abajo", "success");
}

// ============================================================
// 9. IA opcional (OpenAI, DeepSeek, Gemini…)
// ============================================================

async function analyzeIA() {
    const apiKey = $("apiKey").value.trim();
    if (!apiKey) {
        notify("No hay API Key", "error");
        return;
    }

    notify("Enviando a IA...");

    const original = $("originalCode").value;
    const patch = $("patchCode").value;

    const prompt = `
        Archivo original:
        ${original}

        Código sugerido:
        ${patch}

        Necesito que identifiques exactamente EN QUÉ LÍNEA va el código sugerido
        y que devuelvas SOLO un JSON:
        {
            "best_line": <número>,
            "alternatives": [n1, n2, n3]
        }
    `;

    const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const json = await result.json();

    try {
        const data = JSON.parse(json.choices[0].message.content);
        highlightLine(data.best_line - 1);
        notify("IA encontró coincidencia en línea " + data.best_line);

    } catch {
        notify("Error interpretando respuesta de IA", "error");
    }
}

// ============================================================
// 10. Exportar historial
// ============================================================

function exportHistory() {
    const blob = new Blob([JSON.stringify(historyStack, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "codeinsertor_history.json";
    a.click();
}

// ============================================================
// 11. Inicialización
// ============================================================

loadHistoryFromLocalStorage();

