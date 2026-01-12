# 🔧 Debugging del Plugin de Figma

## 🐛 Problema: "No me exporta las variables"

### ✅ Solución Actualizada

He actualizado el plugin con:
- ✅ Mejor manejo de errores
- ✅ Logging detallado en consola
- ✅ Validación de valores
- ✅ Soporte para todos los tipos de variables

### 📋 Pasos para Debuggear

#### 1. Abrir Developer Tools en Figma

**Mac**: `Cmd + Option + I`  
**Windows**: `Ctrl + Alt + I`

Esto abrirá la consola de desarrollador donde verás todos los logs.

#### 2. Recargar el Plugin

1. En Figma: **Plugins** → **Development** → **figma-to-style-dictionary**
2. Click derecho → **Reload plugin**

#### 3. Ejecutar y Ver Logs

Cuando hagas click en "Extraer Variables", verás en la consola:

```
🔍 Iniciando extracción de variables...
📚 Colecciones encontradas: 1
📁 Procesando colección: Nombre de tu colección
   Variables en colección: 1
   Variables cargadas: 1
   🎨 Procesando modo: Mode 1
      ✓ Procesando: nombre-de-tu-variable
         Resolviendo valor tipo: COLOR
         Color resuelto: #FF0000
✅ Extracción completada: 1 variables procesadas
```

### 🔍 Verificaciones

#### ¿Tienes Variables Locales?

1. En Figma, ve al panel de **Variables** (icono de diamante en la barra lateral)
2. Verifica que tengas al menos una colección
3. Verifica que la variable tenga un **valor asignado**

#### ¿La Variable tiene Valor?

Las variables deben tener un valor asignado en al menos un modo:

```
✅ Correcto:
   Color/Primary = #FF0000

❌ Incorrecto:
   Color/Primary = (sin valor)
```

### 🎯 Casos Comunes

#### Caso 1: Variable sin Valor
**Síntoma**: El plugin dice "0 variables procesadas"  
**Solución**: Asigna un valor a tu variable en Figma

#### Caso 2: Variables en Archivo Compartido
**Síntoma**: No detecta variables  
**Solución**: El plugin solo detecta variables **locales**. Si las variables vienen de una librería compartida, no las verá.

#### Caso 3: Error de Permisos
**Síntoma**: Error al extraer  
**Solución**: Asegúrate de que el archivo no esté en modo "View only"

### 📊 Ejemplo de Output Esperado

Cuando funciona correctamente, deberías ver en la consola:

```javascript
📦 Tokens extraídos: {
  "Mode 1": {
    "Color": {
      "Primary": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 0],
          "alpha": 1,
          "hex": "#FF0000"
        },
        "$extensions": {
          "com.figma.variableId": "...",
          "com.figma.scopes": ["ALL_SCOPES"]
        }
      }
    }
  }
}
```

### 🆘 Si Aún No Funciona

#### Opción 1: Compartir los Logs

1. Abre Developer Tools (`Cmd/Ctrl + Option/Alt + I`)
2. Ejecuta el plugin
3. Copia TODO el output de la consola
4. Compártelo para que pueda ver qué está pasando

#### Opción 2: Verificar Estructura

Ejecuta este código en la consola de Figma:

```javascript
// Pega esto en la consola de Developer Tools
(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  console.log('Colecciones:', collections.length);
  
  for (const col of collections) {
    console.log(`Colección: ${col.name}`);
    console.log(`  Variables: ${col.variableIds.length}`);
    console.log(`  Modos: ${col.modes.map(m => m.name).join(', ')}`);
    
    for (const varId of col.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(varId);
      console.log(`  Variable: ${v.name}`);
      console.log(`    Tipo: ${v.resolvedType}`);
      console.log(`    Valores:`, v.valuesByMode);
    }
  }
})();
```

Esto te mostrará exactamente qué variables tienes y sus valores.

### 📝 Checklist de Verificación

- [ ] Figma Desktop (no browser)
- [ ] Plugin recargado después de actualizar
- [ ] Developer Tools abierto
- [ ] Al menos 1 colección de variables
- [ ] Al menos 1 variable con valor asignado
- [ ] Variables son locales (no de librería)
- [ ] Archivo no está en "View only"

### 🔄 Actualizar el Plugin

Si acabas de actualizar el código:

1. **Cerrar** el plugin si está abierto
2. En Figma: **Plugins** → **Development** → **figma-to-style-dictionary**
3. Click derecho → **Reload plugin**
4. Abrir el plugin de nuevo
5. Abrir Developer Tools
6. Intentar extraer variables

### 💡 Tips

- Los logs en consola te dirán exactamente qué está pasando
- Si ves "0 colecciones encontradas", necesitas crear variables
- Si ves "0 variables procesadas", las variables no tienen valores
- Cada paso del proceso está loggeado para debugging

---

## 🎯 Próximos Pasos

Una vez que veas los tokens en la consola:

1. ✅ Configura tu GitHub token
2. ✅ Click en "Subir a GitHub"
3. ✅ Verifica en GitHub que se creó el archivo

¿Necesitas más ayuda? Comparte los logs de la consola! 🚀
