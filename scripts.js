// ========== SISTEMA MEJORADO DE DETECCIÓN DE ARCHIVOS ==========
class FileTypeDetector {
    static detectType(content, filename = '') {
        console.log("🔍 Detectando tipo de archivo...");
        
        // Primero verificar por nombre de archivo
        if (filename) {
            const ext = filename.toLowerCase().split('.').pop();
            const typeFromExt = this.getTypeFromExtension(ext);
            if (typeFromExt !== 'unknown') {
                console.log(`📁 Tipo detectado por extensión: ${typeFromExt}`);
                return typeFromExt;
            }
        }

        // Detección por contenido
        const contentDetection = this.detectByContent(content);
        console.log(`🔍 Tipo detectado por contenido: ${contentDetection}`);
        return contentDetection;
    }

    static getTypeFromExtension(ext) {
        const extensionMap = {
            // Web
            'html': 'html', 'htm': 'html',
            'css': 'css', 'scss': 'css', 'sass': 'css', 'less': 'css',
            'js': 'javascript', 'jsx': 'javascript', 'mjs': 'javascript',
            'ts': 'typescript', 'tsx': 'typescript',
            
            // Backend
            'py': 'python', 'php': 'php', 'rb': 'ruby',
            'java': 'java', 'cs': 'csharp', 'cpp': 'cpp', 'c': 'c',
            'go': 'go', 'rs': 'rust', 'swift': 'swift',
            
            // Configuración
            'json': 'json', 'xml': 'xml', 'yaml': 'yaml', 'yml': 'yaml',
            'md': 'markdown', 'txt': 'text',
            
            // Otros
            'vue': 'vue', 'svelte': 'svelte'
        };
        
        return extensionMap[ext] || 'unknown';
    }

    static detectByContent(content) {
        const trimmed = content.trim();
        
        if (!trimmed) return 'text';
        
        // HTML detection
        if (trimmed.includes('<!DOCTYPE html>') || 
            trimmed.includes('<html') || 
            (trimmed.includes('<div') && trimmed.includes('</div>'))) {
            return 'html';
        }
        
        // CSS detection
        if (trimmed.includes(':root {') || 
            trimmed.match(/\.\w+.*\{/) || 
            trimmed.includes('@media') ||
            (trimmed.includes('{') && trimmed.includes('}') && 
             trimmed.includes(':') && !trimmed.includes('function'))) {
            return 'css';
        }
        
        // JavaScript detection
        if (trimmed.includes('function') || 
            trimmed.includes('const ') || 
            trimmed.includes('let ') || 
            trimmed.includes('var ') ||
            trimmed.includes('=>')) {
            return 'javascript';
        }
        
        // TypeScript detection
        if (trimmed.includes('interface ') || 
            trimmed.includes('type ') || 
            trimmed.includes(': string') ||
            trimmed.includes(': number')) {
            return 'typescript';
        }
        
        // Python detection
        if (trimmed.includes('def ') || 
            trimmed.includes('import ') || 
            trimmed.includes('from ') ||
            trimmed.includes('# ') && !trimmed.includes('/*'))) {
            return 'python';
        }
        
        return 'text';
    }

    static getDefaultFilename(type, originalName = '') {
        const baseName = originalName && originalName !== 'ninguno' 
            ? originalName.replace(/\.[^/.]+$/, "")
            : 'codigo';
            
        const extensions = {
            'html': '.html',
            'css': '.css',
            'javascript': '.js',
            'typescript': '.ts',
            'python': '.py',
            'php': '.php',
            'java': '.java',
            'csharp': '.cs',
            'text': '.txt',
            'json': '.json'
        };
        
        const ext = extensions[type] || '.txt';
        return `${baseName}-modificado${ext}`;
    }
}

// ========== EJEMPLOS PRE-CARGADOS MEJORADOS ==========
const codeExamples = {
    html: {
        original: `<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio Web</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Bienvenido</h1>
        </header>
        <main>
            <p>Contenido principal aquí.</p>
        </main>
    </div>
</body>
</html>`,

        insert: `<header>
    <h1>Bienvenido a Mi Sitio</h1>
    <p>Experiencia mejorada con nuevos estilos</p>
</header>
<main>
    <p>Contenido principal mejorado aquí.</p>
</main>`
    },

    css: {
        original: `:root {
    --primary: #3b82f6;
    --secondary: #64748b;
    --accent: #8b5cf6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background: var(--primary);
    color: white;
    padding: 1rem;
}

.button {
    background: var(--accent);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}`,

        insert: `:root {
    --primary: #3b82f6;
    --secondary: #64748b;
    --accent: #8b5cf6;
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --radius: 8px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.header {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 2rem;
    border-radius: var(--radius);
    text-align: center;
}

.button {
    background: linear-gradient(135deg, var(--accent), var(--primary));
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow);
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}`
    },

    javascript: {
        original: `function calculateTotal(price, quantity) {
    return price * quantity;
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }
}`,

        insert: `function calculateTotal(price, quantity, taxRate = 0.1) {
    const subtotal = price * quantity;
    const tax = subtotal * taxRate;
    return subtotal + tax;
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discount = 0;
    }
    
    applyDiscount(percentage) {
        this.discount = percentage;
    }
    
    getTotal() {
        const subtotal = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
        return subtotal * (1 - this.discount / 100);
    }
}`
    }
};

// ========== ALGORITMO DE COMPARACIÓN MEJORADO ==========
class EnhancedAnalyzer {
    static analyzeLocal(originalText, insertText) {
        console.log("🔍 Ejecutando análisis mejorado...");
        
        const originalType = FileTypeDetector.detectByContent(originalText);
        const insertType = FileTypeDetector.detectByContent(insertText);
        
        console.log(`📊 Tipos detectados - Original: ${originalType}, Insert: ${insertType}`);
        
        // Estrategias específicas por tipo de archivo
        const strategies = {
            'css': this.analyzeCSS,
            'html': this.analyzeHTML,
            'javascript': this.analyzeJavaScript,
            'typescript': this.analyzeTypeScript
        };
        
        const analyzer = strategies[originalType] || this.analyzeGeneric;
        return analyzer(originalText, insertText);
    }

    static analyzeCSS(originalText, insertText) {
        const results = [];
        
        // Extraer selectores CSS
        const originalSelectors = this.extractCSSSelectors(originalText);
        const insertSelectors = this.extractCSSSelectors(insertText);
        
        console.log(`🎯 Selectores CSS encontrados: ${originalSelectors.length} original, ${insertSelectors.length} insert`);
        
        // Buscar selectores comunes
        insertSelectors.forEach(insertSelector => {
            originalSelectors.forEach(originalSelector => {
                const similarity = this.calculateSelectorSimilarity(originalSelector, insertSelector);
                if (similarity > 0.6) {
                    const position = this.findSelectorPosition(originalText, originalSelector);
                    if (position) {
                        results.push({
                            startLine: position.startLine,
                            endLine: position.endLine,
                            score: similarity,
                            excerpt: originalSelector.content,
                            strategy: 'css-selector',
                            exactMatch: similarity > 0.9
                        });
                    }
                }
            });
        });
        
        // Buscar variables CSS (--root)
        const rootMatches = this.analyzeCSSVariables(originalText, insertText);
        results.push(...rootMatches);
        
        return this.deduplicateAndSort(results);
    }

    static extractCSSSelectors(cssText) {
        const selectors = [];
        const lines = cssText.split('\n');
        let currentSelector = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Detectar inicio de selector (línea que termina con {)
            if (line.endsWith('{') && !line.startsWith('@') && !line.startsWith('/*')) {
                const selectorText = line.slice(0, -1).trim();
                currentSelector = {
                    name: selectorText,
                    content: line,
                    startLine: i + 1,
                    endLine: i + 1
                };
            }
            // Continuar bloque CSS
            else if (currentSelector && line.includes('}')) {
                currentSelector.endLine = i + 1;
                currentSelector.content = lines.slice(currentSelector.startLine - 1, i + 1).join('\n');
                selectors.push(currentSelector);
                currentSelector = null;
            }
            // Agregar línea al selector actual
            else if (currentSelector) {
                currentSelector.content += '\n' + line;
            }
        }
        
        return selectors;
    }

    static calculateSelectorSimilarity(selector1, selector2) {
        const name1 = selector1.name.toLowerCase();
        const name2 = selector2.name.toLowerCase();
        
        if (name1 === name2) return 1.0;
        
        // Similitud por tokens en el nombre del selector
        const tokens1 = name1.split(/[^\w-]/).filter(t => t.length > 1);
        const tokens2 = name2.split(/[^\w-]/).filter(t => t.length > 1);
        
        const commonTokens = tokens1.filter(token => 
            tokens2.some(t => t.includes(token) || token.includes(t))
        ).length;
        
        return commonTokens / Math.max(tokens1.length, tokens2.length, 1);
    }

    static findSelectorPosition(text, selector) {
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(selector.name) && lines[i].includes('{')) {
                // Encontrar el cierre del bloque
                let braceCount = 0;
                let endLine = i;
                for (let j = i; j < lines.length; j++) {
                    braceCount += (lines[j].match(/{/g) || []).length;
                    braceCount -= (lines[j].match(/}/g) || []).length;
                    
                    if (braceCount === 0) {
                        endLine = j;
                        break;
                    }
                }
                return { startLine: i + 1, endLine: endLine + 1 };
            }
        }
        return null;
    }

    static analyzeCSSVariables(originalText, insertText) {
        const results = [];
        const originalVars = originalText.match(/--[^:]+:/g) || [];
        const insertVars = insertText.match(/--[^:]+:/g) || [];
        
        originalVars.forEach(originalVar => {
            insertVars.forEach(insertVar => {
                if (originalVar === insertVar) {
                    const position = originalText.indexOf(originalVar);
                    const lines = originalText.substring(0, position).split('\n');
                    const lineNumber = lines.length;
                    
                    results.push({
                        startLine: lineNumber,
                        endLine: lineNumber,
                        score: 0.9,
                        excerpt: `:root { ${originalVar} ... }`,
                        strategy: 'css-variables',
                        exactMatch: true
                    });
                }
            });
        });
        
        return results;
    }

    static analyzeHTML(originalText, insertText) {
        const results = [];
        const originalLines = originalText.split('\n');
        const insertLines = insertText.split('\n');
        
        // Buscar etiquetas HTML similares
        for (let i = 0; i < originalLines.length; i++) {
            const originalLine = originalLines[i].trim();
            if (!originalLine) continue;
            
            for (let j = 0; j < insertLines.length; j++) {
                const insertLine = insertLines[j].trim();
                if (!insertLine) continue;
                
                const similarity = this.calculateHTMLSimilarity(originalLine, insertLine);
                if (similarity > 0.7) {
                    const startLine = Math.max(0, i - 2);
                    const endLine = Math.min(originalLines.length - 1, i + 2);
                    
                    results.push({
                        startLine: startLine + 1,
                        endLine: endLine + 1,
                        score: similarity,
                        excerpt: originalLines.slice(startLine, endLine + 1).join('\n'),
                        strategy: 'html-tag',
                        exactMatch: similarity > 0.9
                    });
                }
            }
        }
        
        return this.deduplicateAndSort(results);
    }

    static calculateHTMLSimilarity(line1, line2) {
        if (line1 === line2) return 1.0;
        
        // Extraer etiquetas
        const tag1 = line1.match(/<\/?(\w+)/)?.[1] || '';
        const tag2 = line2.match(/<\/?(\w+)/)?.[1] || '';
        
        if (tag1 && tag2 && tag1 === tag2) return 0.8;
        
        return this.calculateLineSimilarity(line1, line2);
    }

    static analyzeJavaScript(originalText, insertText) {
        const results = [];
        const originalLines = originalText.split('\n');
        const insertLines = insertText.split('\n');
        
        // Buscar funciones y declaraciones similares
        for (let i = 0; i < originalLines.length; i++) {
            const originalLine = originalLines[i].trim();
            if (!originalLine) continue;
            
            for (let j = 0; j < insertLines.length; j++) {
                const insertLine = insertLines[j].trim();
                if (!insertLine) continue;
                
                const similarity = this.calculateJSSimilarity(originalLine, insertLine);
                if (similarity > 0.7) {
                    const startLine = Math.max(0, i - 2);
                    const endLine = Math.min(originalLines.length - 1, i + 2);
                    
                    results.push({
                        startLine: startLine + 1,
                        endLine: endLine + 1,
                        score: similarity,
                        excerpt: originalLines.slice(startLine, endLine + 1).join('\n'),
                        strategy: 'javascript-function',
                        exactMatch: similarity > 0.9
                    });
                }
            }
        }
        
        return this.deduplicateAndSort(results);
    }

    static calculateJSSimilarity(line1, line2) {
        if (line1 === line2) return 1.0;
        
        // Detectar funciones
        const isFunction1 = line1.includes('function') || line1.includes('=>') || line1.match(/\w+\([^)]*\)/);
        const isFunction2 = line2.includes('function') || line2.includes('=>') || line2.match(/\w+\([^)]*\)/);
        
        if (isFunction1 && isFunction2) {
            const funcName1 = line1.match(/(?:function|const|let|var)\s+(\w+)/)?.[1] || '';
            const funcName2 = line2.match(/(?:function|const|let|var)\s+(\w+)/)?.[1] || '';
            
            if (funcName1 && funcName2 && funcName1 === funcName2) return 0.9;
        }
        
        return this.calculateLineSimilarity(line1, line2);
    }

    static analyzeGeneric(originalText, insertText) {
        const results = [];
        const originalLines = originalText.split('\n');
        const insertLines = insertText.split('\n');
        
        // Buscar líneas idénticas o muy similares
        for (let i = 0; i < originalLines.length; i++) {
            for (let j = 0; j < insertLines.length; j++) {
                const similarity = this.calculateLineSimilarity(originalLines[i], insertLines[j]);
                if (similarity > 0.7) {
                    const startLine = Math.max(0, i - 2);
                    const endLine = Math.min(originalLines.length - 1, i + 2);
                    
                    results.push({
                        startLine: startLine + 1,
                        endLine: endLine + 1,
                        score: similarity,
                        excerpt: originalLines.slice(startLine, endLine + 1).join('\n'),
                        strategy: 'line-similarity',
                        exactMatch: similarity > 0.9
                    });
                }
            }
        }
        
        return this.deduplicateAndSort(results);
    }

    static calculateLineSimilarity(line1, line2) {
        if (line1 === line2) return 1.0;
        if (!line1 || !line2) return 0;
        
        const norm1 = line1.trim().toLowerCase();
        const norm2 = line2.trim().toLowerCase();
        
        if (norm1 === norm2) return 0.95;
        
        // Similitud por tokens
        const tokens1 = norm1.split(/\W+/).filter(t => t.length > 2);
        const tokens2 = norm2.split(/\W+/).filter(t => t.length > 2);
        
        if (tokens1.length === 0 || tokens2.length === 0) return 0;
        
        const commonTokens = tokens1.filter(token => 
            tokens2.some(t => t.includes(token) || token.includes(t))
        ).length;
        
        return commonTokens / Math.max(tokens1.length, tokens2.length);
    }

    static deduplicateAndSort(results) {
        const uniqueResults = [];
        const seenPositions = new Set();
        
        results.forEach(result => {
            const key = `${result.startLine}-${result.endLine}`;
            if (!seenPositions.has(key)) {
                seenPositions.add(key);
                uniqueResults.push(result);
            }
        });
        
        return uniqueResults
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }
}

// ========== ESTADO Y ELEMENTOS DOM ==========
const state = {
    suggestions: [],
    chosen: null,
    originalContent: '',
    modifiedContent: '',
    currentFiles: {
        original: { name: 'ninguno', size: 0 },
        insert: { name: 'ninguno', size: 0 }
    }
};

const originalEl = document.getElementById('originalEl');
const insertEl = document.getElementById('insertEl');
const suggestionList = document.getElementById('suggestionList');
const resultsContainer = document.getElementById('resultsContainer');
const matchPercentage = document.getElementById('matchPercentage');
const analysisStats = document.getElementById('analysisStats');
const replaceBtn = document.getElementById('replaceBtn');
const aboveBtn = document.getElementById('aboveBtn');
const belowBtn = document.getElementById('belowBtn');
const stickyActions = document.getElementById('stickyActions');

// ========== FUNCIONES PRINCIPALES MEJORADAS ==========
function runLocalAnalysis() {
    try {
        const originalText = originalEl.value;
        const insertText = insertEl.value;

        if (!originalText.trim() || !insertText.trim()) {
            throw new Error('Ambas ventanas deben contener código');
        }

        console.clear();
        const results = EnhancedAnalyzer.analyzeLocal(originalText, insertText);
        state.suggestions = results;
        state.originalContent = originalText;

        displayResults(results);
        updateAnalysisInfo(results);
        stickyActions.style.display = 'block';

        if (results.length === 0) {
            showNotification('No se encontraron coincidencias exactas. Revisa manualmente las áreas similares.', 'warning');
        } else {
            showNotification(`Encontradas ${results.length} coincidencias`, 'success');
        }

    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
        console.error('Error en análisis:', error);
    }
}

function displayResults(results) {
    const placeholder = resultsContainer.querySelector('.placeholder-text');
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    if (results.length === 0) {
        suggestionList.innerHTML = '<p class="placeholder-text">No se encontraron coincidencias significativas. Considera revisar manualmente las áreas similares.</p>';
        suggestionList.style.display = 'block';
        return;
    }

    suggestionList.innerHTML = results.map((result, index) => `
        <div class="suggestion-item ${index === 0 ? 'selected' : ''} ${result.exactMatch ? 'exact-match' : ''}" 
             onclick="selectSuggestion(${index})">
            <span class="suggestion-score">${Math.round(result.score * 100)}% coincidencia</span>
            ${result.exactMatch ? '<span class="suggestion-warning">✅ EXACTA</span>' : ''}
            <small style="color: var(--muted); font-size: 11px;">Estrategia: ${result.strategy}</small>
            <div class="suggestion-excerpt">Líneas ${result.startLine}-${result.endLine}:\n${result.excerpt}</div>
        </div>
    `).join('');

    suggestionList.style.display = 'block';
    state.chosen = results[0];
    
    replaceBtn.disabled = false;
    aboveBtn.disabled = false;
    belowBtn.disabled = false;
}

function updateAnalysisInfo(results) {
    if (results.length === 0) {
        matchPercentage.textContent = 'Coincidencia: 0%';
        analysisStats.textContent = 'Sin coincidencias';
        return;
    }

    const bestMatch = results[0];
    const percentage = Math.round(bestMatch.score * 100);
    
    matchPercentage.textContent = `Coincidencia: ${percentage}%`;
    analysisStats.textContent = `${results.length} sugerencias · Líneas ${bestMatch.startLine}-${bestMatch.endLine}`;
}

function applyEdit(mode) {
    if (!state.chosen) {
        showNotification('Selecciona una sugerencia primero', 'warning');
        return;
    }

    const modifiedCode = applyCodeChanges(mode);
    showExportDialog(modifiedCode);
}

function applyCodeChanges(mode) {
    const lines = state.originalContent.split('\n');
    const insertContent = insertEl.value;
    const startIndex = state.chosen.startLine - 1;
    const endIndex = state.chosen.endLine - 1;
    
    let modifiedLines;

    switch (mode) {
        case 'replace':
            modifiedLines = [
                ...lines.slice(0, startIndex),
                insertContent,
                ...lines.slice(endIndex + 1)
            ];
            break;
        case 'above':
            modifiedLines = [
                ...lines.slice(0, startIndex),
                insertContent,
                ...lines.slice(startIndex)
            ];
            break;
        case 'below':
            modifiedLines = [
                ...lines.slice(0, endIndex + 1),
                insertContent,
                ...lines.slice(endIndex + 1)
            ];
            break;
        default:
            modifiedLines = lines;
    }

    return modifiedLines.join('\n');
}

function showExportDialog(modifiedCode) {
    state.modifiedContent = modifiedCode;
    
    // Detectar tipo de archivo para nombre inteligente
    const fileType = FileTypeDetector.detectType(state.originalContent, state.currentFiles.original.name);
    const smartFilename = FileTypeDetector.getDefaultFilename(fileType, state.currentFiles.original.name);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Confirmar Cambios</h3>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-content">
                <p>Revisa los cambios antes de descargar:</p>
                
                <div class="code-comparison">
                    <div class="code-block">
                        <div class="code-block-header">Original (${state.currentFiles.original.name})</div>
                        <div class="code-block-content">${state.originalContent.substring(0, 500)}${state.originalContent.length > 500 ? '...' : ''}</div>
                    </div>
                    <div class="code-block">
                        <div class="code-block-header">Modificado</div>
                        <div class="code-block-content">${modifiedCode.substring(0, 500)}${modifiedCode.length > 500 ? '...' : ''}</div>
                    </div>
                </div>

                <div class="export-options">
                    <label>
                        Nombre de archivo:
                        <input type="text" class="filename-input" id="exportFilename" 
                               value="${smartFilename}">
                    </label>
                    <div class="action-buttons">
                        <button class="btn success" onclick="confirmExport()">💾 Descargar</button>
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function confirmExport() {
    const filenameInput = document.getElementById('exportFilename');
    const filename = filenameInput.value;
    
    downloadText(state.modifiedContent, filename);
    
    document.querySelector('.modal-overlay').remove();
    showNotification(`Archivo "${filename}" descargado correctamente`, 'success');
}

function downloadText(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========== FUNCIONES AUXILIARES MEJORADAS ==========
function loadExample(type) {
    const fileType = type === 'original' ? 
        FileTypeDetector.detectType(originalEl.value) : 
        FileTypeDetector.detectType(insertEl.value);
    
    const examples = codeExamples[fileType] || codeExamples.css;
    
    if (type === 'original') {
        originalEl.value = examples.original;
        state.currentFiles.original.name = `ejemplo.${fileType}`;
        updateFileDisplay('original', `ejemplo.${fileType}`, examples.original.length);
    } else {
        insertEl.value = examples.insert;
        state.currentFiles.insert.name = `fragmento.${fileType}`;
        updateFileDisplay('insert', `fragmento.${fileType}`, examples.insert.length);
    }
    
    showNotification(`Ejemplo ${fileType} cargado`, 'success');
}

function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const fileType = FileTypeDetector.detectType(content, file.name);
        
        if (type === 'original') {
            originalEl.value = content;
            state.originalContent = content;
            state.currentFiles.original = {
                name: file.name,
                size: file.size
            };
            updateFileDisplay('original', file.name, file.size);
        } else {
            insertEl.value = content;
            state.currentFiles.insert = {
                name: file.name,
                size: file.size
            };
            updateFileDisplay('insert', file.name, file.size);
        }
        
        showNotification(`Archivo ${file.name} (${fileType}) cargado`, 'success');
    };
    reader.readAsText(file);
}

function updateFileDisplay(type, filename, size) {
    const sizeText = size > 1024 ? `${(size/1024).toFixed(1)}KB` : `${size}B`;
    const fileNameEl = document.getElementById(`${type}FileName`);
    const fileSizeEl = document.getElementById(`${type}FileSize`);
    
    fileNameEl.textContent = filename;
    fileSizeEl.textContent = sizeText;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
            <span class="message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ========== FUNCIONES BÁSICAS ==========
function clearOriginal() {
    originalEl.value = '';
    state.currentFiles.original = { name: 'ninguno', size: 0 };
    updateFileDisplay('original', 'ninguno', 0);
    showNotification('Ventana original limpiada', 'info');
}

function clearInsert() {
    insertEl.value = '';
    state.currentFiles.insert = { name: 'ninguno', size: 0 };
    updateFileDisplay('insert', 'ninguno', 0);
    showNotification('Ventana de inserción limpiada', 'info');
}

function clearAnalysis() {
    state.suggestions = [];
    state.chosen = null;
    suggestionList.innerHTML = '';
    suggestionList.style.display = 'none';
    stickyActions.style.display = 'none';
    
    const placeholder = document.createElement('p');
    placeholder.className = 'placeholder-text';
    placeholder.textContent = 'Los resultados del análisis aparecerán aquí...';
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(placeholder);
    
    matchPercentage.textContent = 'Coincidencia: 0%';
    analysisStats.textContent = 'Sin análisis';
    
    replaceBtn.disabled = true;
    aboveBtn.disabled = true;
    belowBtn.disabled = true;
    
    showNotification('Análisis limpiado', 'info');
}

function selectSuggestion(index) {
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('.suggestion-item')[index].classList.add('selected');
    state.chosen = state.suggestions[index];
}

function runDiagnostics() {
    showNotification('Sistema de diagnóstico ejecutado', 'success');
    // Aquí se pueden agregar pruebas más específicas
}

function showAIAnalysis() {
    showNotification('Análisis IA no disponible en esta versión', 'warning');
}

function exportAnalysis() {
    if (!state.suggestions.length) {
        showNotification('No hay análisis para exportar', 'warning');
        return;
    }
    
    const analysisData = {
        timestamp: new Date().toISOString(),
        originalFile: state.currentFiles.original.name,
        suggestions: state.suggestions,
        chosen: state.chosen
    };
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Análisis exportado correctamente', 'success');
}

function showHelp() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Ayuda - CodeInsertor v1.6</h3>
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-content">
                <h4>¿Cómo usar CodeInsertor?</h4>
                <ol>
                    <li><strong>Ventana 1:</strong> Pega tu código original o carga un archivo</li>
                    <li><strong>Ventana 2:</strong> Pega el fragmento que quieres insertar</li>
                    <li><strong>Haz clic en "Analizar Coincidencias"</strong></li>
                    <li><strong>Selecciona una sugerencia</strong> de la lista de resultados</li>
                    <li><strong>Elige una acción:</strong> Reemplazar, Insertar Arriba o Insertar Debajo</li>
                    <li><strong>Revisa y descarga</strong> el archivo modificado</li>
                </ol>
                
                <h4>Características:</h4>
                <ul>
                    <li>✅ Detección automática de tipo de archivo</li>
                    <li>✅ Análisis inteligente de coincidencias</li>
                    <li>✅ Nombres de archivo sugeridos automáticamente</li>
                    <li>✅ Vista previa de cambios antes de descargar</li>
                    <li>✅ Soporte para múltiples lenguajes de programación</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    showNotification('CodeInsertor v1.6 - Sistema de detección mejorado cargado!', 'success');
    
    // Inicializar estado de botones
    replaceBtn.disabled = true;
    aboveBtn.disabled = true;
    belowBtn.disabled = true;
});
