// Main Application Logic
class App {
    constructor() {
        this.converter = new FigmaToStyleDictionaryConverter();
        this.currentFile = null;
        this.tokens = null;
        this.convertedOutputs = {};
        this.currentPreviewFormat = 'css';

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Upload elements
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.fileSize = document.getElementById('fileSize');
        this.changeFileBtn = document.getElementById('changeFileBtn');

        // Options elements
        this.optionsSection = document.getElementById('optionsSection');
        this.convertBtn = document.getElementById('convertBtn');
        this.formatCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]:not(.token-type)');
        this.tokenTypeCheckboxes = document.querySelectorAll('.token-type');
        this.customPrefix = document.getElementById('customPrefix');
        this.includePrefix = document.getElementById('includePrefix');
        this.includeComments = document.getElementById('includeComments');
        this.prettifyOutput = document.getElementById('prettifyOutput');
        this.groupByCategory = document.getElementById('groupByCategory');

        // Preview elements
        this.previewSection = document.getElementById('previewSection');
        this.previewTabs = document.getElementById('previewTabs');
        this.previewStats = document.getElementById('previewStats');
        this.previewCode = document.getElementById('previewCode');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');

        // Tokens preview
        this.tokensPreviewSection = document.getElementById('tokensPreviewSection');
        this.tokensGrid = document.getElementById('tokensGrid');

        // Toast
        this.toast = document.getElementById('toast');
    }

    attachEventListeners() {
        // Upload events
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.changeFileBtn.addEventListener('click', () => this.fileInput.click());

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

        // Convert button
        this.convertBtn.addEventListener('click', () => this.convertTokens());

        // Preview actions
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.downloadBtn.addEventListener('click', () => this.downloadAllFormats());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        if (!file.name.endsWith('.json')) {
            this.showToast('Por favor selecciona un archivo JSON válido', 'error');
            return;
        }

        this.currentFile = file;

        // Update UI
        this.fileName.textContent = file.name;
        this.fileSize.textContent = this.formatFileSize(file.size);
        this.uploadArea.style.display = 'none';
        this.fileInfo.style.display = 'flex';
        this.optionsSection.style.display = 'block';

        // Read and parse file
        try {
            const text = await file.text();
            const jsonData = JSON.parse(text);
            this.tokens = this.converter.parseFigmaJSON(jsonData);

            this.showToast('Archivo cargado correctamente', 'success');
            this.displayTokensPreview();
        } catch (error) {
            this.showToast('Error al procesar el archivo JSON', 'error');
            console.error(error);
        }
    }

    displayTokensPreview() {
        if (!this.tokens) return;

        this.tokensPreviewSection.style.display = 'block';
        this.tokensGrid.innerHTML = '';

        // Display color tokens
        const colorTokens = Object.entries(this.tokens.colors).slice(0, 12);
        colorTokens.forEach(([path, token]) => {
            const card = document.createElement('div');
            card.className = 'token-card';

            const colorPreview = document.createElement('div');
            colorPreview.className = 'color-preview';
            colorPreview.style.background = token.cssValue;

            const name = document.createElement('div');
            name.className = 'token-name';
            name.textContent = path.split('.').pop();

            const value = document.createElement('div');
            value.className = 'token-value';
            value.textContent = token.cssValue;

            card.appendChild(colorPreview);
            card.appendChild(name);
            card.appendChild(value);
            this.tokensGrid.appendChild(card);
        });

        // Add more indicator if there are more tokens
        const stats = this.converter.getStats(this.tokens);
        if (stats.colors > 12) {
            const moreCard = document.createElement('div');
            moreCard.className = 'token-card';
            moreCard.innerHTML = `
                <div class="token-name">+${stats.colors - 12} más</div>
                <div class="token-value">Convierte para ver todos</div>
            `;
            this.tokensGrid.appendChild(moreCard);
        }
    }

    convertTokens() {
        if (!this.tokens) {
            this.showToast('Por favor carga un archivo primero', 'error');
            return;
        }

        // Get selected formats
        const selectedFormats = Array.from(this.formatCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selectedFormats.length === 0) {
            this.showToast('Por favor selecciona al menos un formato', 'error');
            return;
        }

        // Get options
        const options = {
            prefix: this.customPrefix.value || 'sds',
            includeComments: this.includeComments.checked,
            prettify: this.prettifyOutput.checked,
            groupByCategory: this.groupByCategory.checked
        };

        // Filter tokens by selected types
        const selectedTypes = Array.from(this.tokenTypeCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const filteredTokens = this.filterTokensByType(this.tokens, selectedTypes);

        // Convert to all selected formats
        this.convertedOutputs = {};
        selectedFormats.forEach(format => {
            try {
                switch (format) {
                    case 'css':
                        this.convertedOutputs.css = this.converter.toCSS(filteredTokens, options);
                        break;
                    case 'scss':
                        this.convertedOutputs.scss = this.converter.toSCSS(filteredTokens, options);
                        break;
                    case 'less':
                        this.convertedOutputs.less = this.converter.toLESS(filteredTokens, options);
                        break;
                    case 'json':
                        this.convertedOutputs.json = this.converter.toJS(filteredTokens, { format: 'json' });
                        break;
                    case 'js':
                        this.convertedOutputs.js = this.converter.toJS(filteredTokens, { format: 'esm' });
                        break;
                    case 'ios':
                        this.convertedOutputs.ios = this.converter.toIOS(filteredTokens, options);
                        break;
                    case 'android':
                        this.convertedOutputs.android = this.converter.toAndroid(filteredTokens, options);
                        break;
                    case 'flutter':
                        this.convertedOutputs.flutter = this.converter.toFlutter(filteredTokens, options);
                        break;
                }
            } catch (error) {
                console.error(`Error converting to ${format}:`, error);
            }
        });

        // Show preview
        this.displayPreview(filteredTokens);
        this.showToast('Conversión completada exitosamente', 'success');
    }

    filterTokensByType(tokens, selectedTypes) {
        const filtered = {
            colors: {},
            typography: {},
            spacing: {},
            borders: {},
            shadows: {},
            sizes: {}
        };

        selectedTypes.forEach(type => {
            switch (type) {
                case 'color':
                    filtered.colors = tokens.colors;
                    break;
                case 'typography':
                    filtered.typography = tokens.typography;
                    break;
                case 'spacing':
                    filtered.spacing = tokens.spacing;
                    break;
                case 'border':
                    filtered.borders = tokens.borders;
                    break;
                case 'shadow':
                    filtered.shadows = tokens.shadows;
                    break;
                case 'size':
                    filtered.sizes = tokens.sizes;
                    break;
            }
        });

        return filtered;
    }

    displayPreview(tokens) {
        this.previewSection.style.display = 'block';
        this.previewSection.scrollIntoView({ behavior: 'smooth' });

        // Create tabs
        this.previewTabs.innerHTML = '';
        Object.keys(this.convertedOutputs).forEach(format => {
            const tab = document.createElement('button');
            tab.className = 'preview-tab';
            tab.textContent = format.toUpperCase();
            tab.addEventListener('click', () => this.switchPreviewTab(format));
            this.previewTabs.appendChild(tab);
        });

        // Display stats
        const stats = this.converter.getStats(tokens);
        this.previewStats.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">Total Tokens</span>
                <span class="stat-value">${stats.totalTokens}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Colores</span>
                <span class="stat-value">${stats.colors}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Tipografía</span>
                <span class="stat-value">${stats.typography}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Formatos</span>
                <span class="stat-value">${Object.keys(this.convertedOutputs).length}</span>
            </div>
        `;

        // Show first format
        const firstFormat = Object.keys(this.convertedOutputs)[0];
        this.switchPreviewTab(firstFormat);
    }

    switchPreviewTab(format) {
        this.currentPreviewFormat = format;

        // Update active tab
        const tabs = this.previewTabs.querySelectorAll('.preview-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.textContent.toLowerCase() === format);
        });

        // Update code preview
        this.previewCode.textContent = this.convertedOutputs[format];
        this.highlightCode();
    }

    highlightCode() {
        // Simple syntax highlighting
        const code = this.previewCode.textContent;
        const format = this.currentPreviewFormat;

        let highlighted = code;

        // Basic highlighting based on format
        if (format === 'css' || format === 'scss' || format === 'less') {
            highlighted = code
                .replace(/(--[\w-]+|@[\w-]+|\$[\w-]+):/g, '<span style="color: #9cdcfe">$1</span>:')
                .replace(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/g, '<span style="color: #ce9178">$1</span>')
                .replace(/\/\*.*?\*\//g, '<span style="color: #6a9955">$&</span>');
        } else if (format === 'json' || format === 'js') {
            highlighted = code
                .replace(/"([^"]+)":/g, '<span style="color: #9cdcfe">"$1"</span>:')
                .replace(/:\s*"([^"]+)"/g, ': <span style="color: #ce9178">"$1"</span>')
                .replace(/:\s*(\d+)/g, ': <span style="color: #b5cea8">$1</span>');
        }

        this.previewCode.innerHTML = highlighted;
    }

    async copyToClipboard() {
        const code = this.convertedOutputs[this.currentPreviewFormat];
        try {
            await navigator.clipboard.writeText(code);
            this.showToast('Código copiado al portapapeles', 'success');
        } catch (error) {
            this.showToast('Error al copiar al portapapeles', 'error');
        }
    }

    downloadAllFormats() {
        Object.entries(this.convertedOutputs).forEach(([format, content]) => {
            this.downloadFile(content, `tokens.${this.getFileExtension(format)}`, format);
        });
        this.showToast(`${Object.keys(this.convertedOutputs).length} archivos descargados`, 'success');
    }

    downloadFile(content, filename, format) {
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

    getFileExtension(format) {
        const extensions = {
            css: 'css',
            scss: 'scss',
            less: 'less',
            json: 'json',
            js: 'js',
            ios: 'swift',
            android: 'xml',
            flutter: 'dart'
        };
        return extensions[format] || 'txt';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type} show`;

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
