// Figma to Style Dictionary Converter
class FigmaToStyleDictionaryConverter {
    constructor() {
        this.figmaData = null;
        this.convertedTokens = {};
    }

    // Parse Figma JSON
    parseFigmaJSON(jsonData) {
        this.figmaData = jsonData;
        return this.extractTokens(jsonData);
    }

    // Extract tokens from Figma JSON
    extractTokens(data, path = []) {
        const tokens = {
            colors: {},
            typography: {},
            spacing: {},
            borders: {},
            shadows: {},
            sizes: {}
        };

        const processValue = (key, value, currentPath) => {
            const fullPath = [...currentPath, key].join('.');
            
            if (value && typeof value === 'object') {
                // Check if it's a token definition
                if (value.$type && value.$value !== undefined) {
                    const token = {
                        value: value.$value,
                        type: value.$type,
                        path: fullPath,
                        extensions: value.$extensions || {}
                    };

                    // Categorize by type
                    switch (value.$type) {
                        case 'color':
                            tokens.colors[fullPath] = this.processColorToken(token);
                            break;
                        case 'string':
                        case 'number':
                            // Check if it's typography related
                            if (fullPath.toLowerCase().includes('font') || 
                                fullPath.toLowerCase().includes('title') ||
                                fullPath.toLowerCase().includes('body') ||
                                fullPath.toLowerCase().includes('heading')) {
                                tokens.typography[fullPath] = token;
                            }
                            break;
                        default:
                            // Try to categorize by path
                            if (fullPath.toLowerCase().includes('spacing') || fullPath.toLowerCase().includes('space')) {
                                tokens.spacing[fullPath] = token;
                            } else if (fullPath.toLowerCase().includes('border')) {
                                tokens.borders[fullPath] = token;
                            } else if (fullPath.toLowerCase().includes('shadow')) {
                                tokens.shadows[fullPath] = token;
                            } else if (fullPath.toLowerCase().includes('size')) {
                                tokens.sizes[fullPath] = token;
                            }
                    }
                } else {
                    // Recurse into nested objects
                    const nestedTokens = this.extractTokens(value, [...currentPath, key]);
                    
                    // Merge nested tokens
                    Object.keys(nestedTokens).forEach(category => {
                        tokens[category] = { ...tokens[category], ...nestedTokens[category] };
                    });
                }
            }
        };

        Object.keys(data).forEach(key => {
            if (key.startsWith('$')) return; // Skip meta properties
            processValue(key, data[key], path);
        });

        return tokens;
    }

    // Process color token
    processColorToken(token) {
        const value = token.value;
        
        if (typeof value === 'string') {
            return { ...token, cssValue: value };
        }
        
        if (value.hex) {
            let cssValue = value.hex;
            if (value.alpha !== undefined && value.alpha < 1) {
                // Convert to rgba
                const r = parseInt(value.hex.slice(1, 3), 16);
                const g = parseInt(value.hex.slice(3, 5), 16);
                const b = parseInt(value.hex.slice(5, 7), 16);
                cssValue = `rgba(${r}, ${g}, ${b}, ${value.alpha})`;
            }
            return { ...token, cssValue };
        }
        
        if (value.components && Array.isArray(value.components)) {
            const [r, g, b] = value.components.map(c => Math.round(c * 255));
            const alpha = value.alpha !== undefined ? value.alpha : 1;
            const cssValue = alpha < 1 
                ? `rgba(${r}, ${g}, ${b}, ${alpha})`
                : `rgb(${r}, ${g}, ${b})`;
            return { ...token, cssValue };
        }
        
        return token;
    }

    // Convert to CSS Variables
    toCSS(tokens, options = {}) {
        const { prefix = 'sds', includeComments = false, prettify = true } = options;
        let css = ':root {\n';
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const varName = this.pathToVarName(path, prefix);
            if (includeComments && token.extensions) {
                css += `  /* ${path} */\n`;
            }
            css += `  ${varName}: ${token.cssValue};\n`;
        });
        
        Object.entries(tokens.typography).forEach(([path, token]) => {
            const varName = this.pathToVarName(path, prefix);
            if (includeComments) {
                css += `  /* ${path} */\n`;
            }
            css += `  ${varName}: ${token.value}${this.getUnit(token)};\n`;
        });
        
        css += '}';
        return prettify ? css : css.replace(/\s+/g, ' ');
    }

    // Convert to SCSS Variables
    toSCSS(tokens, options = {}) {
        const { prefix = 'sds', includeComments = false } = options;
        let scss = '';
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const varName = this.pathToScssVar(path, prefix);
            if (includeComments) {
                scss += `// ${path}\n`;
            }
            scss += `${varName}: ${token.cssValue};\n`;
        });
        
        Object.entries(tokens.typography).forEach(([path, token]) => {
            const varName = this.pathToScssVar(path, prefix);
            if (includeComments) {
                scss += `// ${path}\n`;
            }
            scss += `${varName}: ${token.value}${this.getUnit(token)};\n`;
        });
        
        return scss;
    }

    // Convert to LESS Variables
    toLESS(tokens, options = {}) {
        const { prefix = 'sds', includeComments = false } = options;
        let less = '';
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const varName = this.pathToLessVar(path, prefix);
            if (includeComments) {
                less += `// ${path}\n`;
            }
            less += `${varName}: ${token.cssValue};\n`;
        });
        
        Object.entries(tokens.typography).forEach(([path, token]) => {
            const varName = this.pathToLessVar(path, prefix);
            if (includeComments) {
                less += `// ${path}\n`;
            }
            less += `${varName}: ${token.value}${this.getUnit(token)};\n`;
        });
        
        return less;
    }

    // Convert to JavaScript/JSON
    toJS(tokens, options = {}) {
        const { format = 'esm' } = options;
        const obj = this.tokensToObject(tokens);
        
        if (format === 'esm') {
            return `export const tokens = ${JSON.stringify(obj, null, 2)};`;
        } else if (format === 'cjs') {
            return `module.exports = ${JSON.stringify(obj, null, 2)};`;
        }
        return JSON.stringify(obj, null, 2);
    }

    // Convert to iOS (Swift)
    toIOS(tokens, options = {}) {
        const { prefix = 'Design' } = options;
        let swift = `import UIKit\n\n`;
        swift += `extension UIColor {\n`;
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const name = this.pathToSwiftName(path);
            const value = token.value;
            
            if (value.components) {
                const [r, g, b] = value.components;
                const a = value.alpha || 1;
                swift += `    static let ${name} = UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})\n`;
            }
        });
        
        swift += `}\n`;
        return swift;
    }

    // Convert to Android (XML)
    toAndroid(tokens, options = {}) {
        let xml = `<?xml version="1.0" encoding="utf-8"?>\n`;
        xml += `<resources>\n`;
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const name = this.pathToAndroidName(path);
            const hex = token.value.hex || this.rgbToHex(token.value.components);
            xml += `    <color name="${name}">${hex}</color>\n`;
        });
        
        xml += `</resources>`;
        return xml;
    }

    // Convert to Flutter (Dart)
    toFlutter(tokens, options = {}) {
        const { prefix = 'Design' } = options;
        let dart = `import 'package:flutter/material.dart';\n\n`;
        dart += `class ${prefix}Colors {\n`;
        
        Object.entries(tokens.colors).forEach(([path, token]) => {
            const name = this.pathToDartName(path);
            const value = token.value;
            
            if (value.hex) {
                const hex = value.hex.replace('#', '0xFF');
                dart += `  static const Color ${name} = Color(${hex});\n`;
            } else if (value.components) {
                const [r, g, b] = value.components.map(c => Math.round(c * 255));
                const a = Math.round((value.alpha || 1) * 255);
                dart += `  static const Color ${name} = Color.fromARGB(${a}, ${r}, ${g}, ${b});\n`;
            }
        });
        
        dart += `}\n`;
        return dart;
    }

    // Helper methods
    pathToVarName(path, prefix) {
        return `--${prefix}-${path.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-')}`;
    }

    pathToScssVar(path, prefix) {
        return `$${prefix}-${path.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-')}`;
    }

    pathToLessVar(path, prefix) {
        return `@${prefix}-${path.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-')}`;
    }

    pathToSwiftName(path) {
        return path.split('.').map((part, i) => 
            i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('').replace(/\s+/g, '');
    }

    pathToAndroidName(path) {
        return path.toLowerCase().replace(/\./g, '_').replace(/\s+/g, '_');
    }

    pathToDartName(path) {
        return path.split('.').map((part, i) => 
            i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('').replace(/\s+/g, '');
    }

    tokensToObject(tokens) {
        const obj = {};
        Object.entries(tokens).forEach(([category, categoryTokens]) => {
            obj[category] = {};
            Object.entries(categoryTokens).forEach(([path, token]) => {
                const parts = path.split('.');
                let current = obj[category];
                
                parts.forEach((part, i) => {
                    if (i === parts.length - 1) {
                        current[part] = token.cssValue || token.value;
                    } else {
                        current[part] = current[part] || {};
                        current = current[part];
                    }
                });
            });
        });
        return obj;
    }

    getUnit(token) {
        if (token.type === 'number') {
            const path = token.path.toLowerCase();
            if (path.includes('size') || path.includes('spacing') || path.includes('height')) {
                return 'px';
            }
        }
        return '';
    }

    rgbToHex(components) {
        if (!components) return '#000000';
        const [r, g, b] = components.map(c => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        });
        return `#${r}${g}${b}`;
    }

    // Get statistics
    getStats(tokens) {
        return {
            totalTokens: Object.values(tokens).reduce((sum, cat) => sum + Object.keys(cat).length, 0),
            colors: Object.keys(tokens.colors).length,
            typography: Object.keys(tokens.typography).length,
            spacing: Object.keys(tokens.spacing).length,
            borders: Object.keys(tokens.borders).length,
            shadows: Object.keys(tokens.shadows).length,
            sizes: Object.keys(tokens.sizes).length
        };
    }
}

// Export for use in app.js
window.FigmaToStyleDictionaryConverter = FigmaToStyleDictionaryConverter;
