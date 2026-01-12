// Figma Plugin - Design Tokens to GitHub
// Este plugin exporta variables de Figma y las sube automáticamente a GitHub

// Mostrar la UI
figma.showUI(__html__, { width: 400, height: 600 });

// Función para extraer todas las variables locales
async function extractLocalVariables() {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const tokens = {};

    for (const collection of collections) {
        const variables = await Promise.all(
            collection.variableIds.map(id => figma.variables.getVariableByIdAsync(id))
        );

        const modes = collection.modes;

        for (const mode of modes) {
            const modeName = mode.name;
            tokens[modeName] = tokens[modeName] || {};

            for (const variable of variables) {
                if (!variable) continue;

                const value = variable.valuesByMode[mode.modeId];
                const tokenPath = variable.name.split('/').join('.');

                // Crear estructura de token
                const token = {
                    $type: getTokenType(variable.resolvedType),
                    $value: await resolveValue(value, variable.resolvedType),
                    $extensions: {
                        'com.figma.variableId': variable.id,
                        'com.figma.scopes': variable.scopes,
                        'com.figma.codeSyntax': variable.codeSyntax
                    }
                };

                // Añadir información de alias si existe
                if (typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
                    const aliasVariable = await figma.variables.getVariableByIdAsync(value.id);
                    if (aliasVariable) {
                        token.$extensions['com.figma.aliasData'] = {
                            targetVariableId: aliasVariable.id,
                            targetVariableName: aliasVariable.name,
                            targetVariableSetId: collection.id,
                            targetVariableSetName: collection.name
                        };
                    }
                }

                setNestedProperty(tokens[modeName], tokenPath, token);
            }
        }
    }

    return tokens;
}

// Función para determinar el tipo de token
function getTokenType(resolvedType) {
    const typeMap = {
        'COLOR': 'color',
        'FLOAT': 'number',
        'STRING': 'string',
        'BOOLEAN': 'boolean'
    };
    return typeMap[resolvedType] || 'string';
}

// Función para resolver valores
async function resolveValue(value, type) {
    if (typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
        const aliasVariable = await figma.variables.getVariableByIdAsync(value.id);
        if (aliasVariable) {
            const aliasMode = Object.keys(aliasVariable.valuesByMode)[0];
            return await resolveValue(aliasVariable.valuesByMode[aliasMode], aliasVariable.resolvedType);
        }
    }

    if (type === 'COLOR' && typeof value === 'object') {
        return {
            colorSpace: 'srgb',
            components: [value.r, value.g, value.b],
            alpha: value.a,
            hex: rgbToHex(value)
        };
    }

    return value;
}

// Convertir RGB a HEX
function rgbToHex(color) {
    const toHex = (n) => {
        const hex = Math.round(n * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

// Función para establecer propiedades anidadas
function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
            current[key] = {};
        }
        current = current[key];
    }

    current[keys[keys.length - 1]] = value;
}

// Escuchar mensajes de la UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'extract-tokens') {
        try {
            figma.notify('Extrayendo tokens...', { timeout: 2000 });
            const tokens = await extractLocalVariables();

            figma.ui.postMessage({
                type: 'tokens-extracted',
                tokens: tokens
            });

            figma.notify('✅ Tokens extraídos correctamente', { timeout: 3000 });
        } catch (error) {
            figma.notify('❌ Error al extraer tokens: ' + error.message, { timeout: 5000 });
            figma.ui.postMessage({
                type: 'error',
                message: error.message
            });
        }
    }

    if (msg.type === 'upload-to-github') {
        try {
            figma.notify('Subiendo a GitHub...', { timeout: 2000 });

            // La UI se encargará de la llamada a GitHub API
            // ya que Figma plugins no pueden hacer llamadas HTTP directamente

        } catch (error) {
            figma.notify('❌ Error: ' + error.message, { timeout: 5000 });
        }
    }

    if (msg.type === 'close') {
        figma.closePlugin();
    }

    if (msg.type === 'notify') {
        figma.notify(msg.message, { timeout: msg.timeout || 3000 });
    }
};
