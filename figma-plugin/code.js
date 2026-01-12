// Figma Plugin - Design Tokens to GitHub
// Este plugin exporta variables de Figma y las sube automáticamente a GitHub

// Mostrar la UI
figma.showUI(__html__, { width: 400, height: 600 });

// Función para extraer todas las variables locales
async function extractLocalVariables() {
    try {
        console.log('🔍 Iniciando extracción de variables...');

        // Obtener todas las colecciones de variables
        const collections = await figma.variables.getLocalVariableCollectionsAsync();
        console.log(`📚 Colecciones encontradas: ${collections.length}`);

        if (collections.length === 0) {
            throw new Error('No se encontraron colecciones de variables en este archivo');
        }

        const tokens = {};
        let totalVariables = 0;

        for (const collection of collections) {
            console.log(`📁 Procesando colección: ${collection.name}`);
            console.log(`   Variables en colección: ${collection.variableIds.length}`);

            // Obtener todas las variables de esta colección
            const variables = [];
            for (const varId of collection.variableIds) {
                const variable = await figma.variables.getVariableByIdAsync(varId);
                if (variable) {
                    variables.push(variable);
                }
            }

            console.log(`   Variables cargadas: ${variables.length}`);

            // Procesar cada modo
            for (const mode of collection.modes) {
                const modeName = mode.name;
                console.log(`   🎨 Procesando modo: ${modeName}`);

                if (!tokens[modeName]) {
                    tokens[modeName] = {};
                }

                // Procesar cada variable
                for (const variable of variables) {
                    try {
                        const value = variable.valuesByMode[mode.modeId];

                        // Si no hay valor para este modo, continuar
                        if (value === undefined) {
                            console.log(`      ⚠️ Sin valor para ${variable.name} en modo ${modeName}`);
                            continue;
                        }

                        const tokenPath = variable.name.replace(/\//g, '.');
                        console.log(`      ✓ Procesando: ${tokenPath}`);

                        // Crear estructura de token
                        const token = {
                            $type: getTokenType(variable.resolvedType),
                            $value: await resolveValue(value, variable.resolvedType, mode.modeId),
                            $extensions: {
                                'com.figma.variableId': variable.id,
                                'com.figma.scopes': variable.scopes || [],
                                'com.figma.codeSyntax': variable.codeSyntax || {}
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
                        totalVariables++;

                    } catch (varError) {
                        console.error(`      ❌ Error procesando ${variable.name}:`, varError);
                    }
                }
            }
        }

        console.log(`✅ Extracción completada: ${totalVariables} variables procesadas`);
        console.log('📦 Tokens extraídos:', tokens);

        if (totalVariables === 0) {
            throw new Error('No se pudieron extraer variables. Verifica que tengas variables con valores asignados.');
        }

        return tokens;

    } catch (error) {
        console.error('❌ Error en extractLocalVariables:', error);
        throw error;
    }
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
async function resolveValue(value, type, modeId) {
    console.log(`         Resolviendo valor tipo: ${type}`, value);

    // Manejar alias de variables
    if (typeof value === 'object' && value !== null && value.type === 'VARIABLE_ALIAS') {
        console.log(`         Es un alias, resolviendo...`);
        const aliasVariable = await figma.variables.getVariableByIdAsync(value.id);
        if (aliasVariable) {
            // Obtener el valor del alias en el mismo modo
            const aliasValue = aliasVariable.valuesByMode[modeId] ||
                aliasVariable.valuesByMode[Object.keys(aliasVariable.valuesByMode)[0]];
            return await resolveValue(aliasValue, aliasVariable.resolvedType, modeId);
        }
    }

    // Manejar colores
    if (type === 'COLOR') {
        if (typeof value === 'object' && value !== null && 'r' in value) {
            const result = {
                colorSpace: 'srgb',
                components: [value.r, value.g, value.b],
                alpha: value.a !== undefined ? value.a : 1,
                hex: rgbToHex(value)
            };
            console.log(`         Color resuelto:`, result.hex);
            return result;
        }
    }

    // Manejar números
    if (type === 'FLOAT') {
        console.log(`         Número resuelto:`, value);
        return value;
    }

    // Manejar strings
    if (type === 'STRING') {
        console.log(`         String resuelto:`, value);
        return value;
    }

    // Manejar booleanos
    if (type === 'BOOLEAN') {
        console.log(`         Boolean resuelto:`, value);
        return value;
    }

    // Valor por defecto
    console.log(`         Valor directo:`, value);
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

    if (msg.type === 'save-config') {
        try {
            // Guardar configuración usando clientStorage de Figma
            await figma.clientStorage.setAsync('github-config', msg.config);
            console.log('✅ Configuración guardada');
        } catch (error) {
            console.error('❌ Error guardando configuración:', error);
        }
    }

    if (msg.type === 'load-config') {
        try {
            // Cargar configuración desde clientStorage
            const config = await figma.clientStorage.getAsync('github-config');
            if (config) {
                figma.ui.postMessage({
                    type: 'config-loaded',
                    config: config
                });
                console.log('✅ Configuración cargada');
            }
        } catch (error) {
            console.error('❌ Error cargando configuración:', error);
        }
    }

    if (msg.type === 'close') {
        figma.closePlugin();
    }

    if (msg.type === 'notify') {
        figma.notify(msg.message, { timeout: msg.timeout || 3000 });
    }
};
