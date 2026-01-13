# 🔧 Solución de Problemas - Figma Dev Mode MCP

## Error: "context deadline exceeded"

Este error ocurre cuando el servidor MCP de Figma no responde a tiempo.

---

## ✅ Soluciones (en orden de efectividad)

### **1. Reiniciar Figma Desktop** ⭐ (Más efectivo)

```bash
# 1. Cierra completamente Figma Desktop
# 2. Cierra tu IDE/Editor (VSCode, Cursor, etc.)
# 3. Abre Figma Desktop primero
# 4. Abre tu IDE/Editor después
```

**Por qué funciona**: El servidor MCP se ejecuta dentro de Figma Desktop y puede "congelarse" después de estar activo mucho tiempo.

---

### **2. Limpiar Caché de Figma**

#### En macOS:
```bash
# Opción 1: Desde Figma
# Figma → Preferences → Clear Cache

# Opción 2: Manual
rm -rf ~/Library/Application\ Support/Figma/Cache
rm -rf ~/Library/Application\ Support/Figma/Code\ Cache
```

#### Después de limpiar:
1. Reinicia Figma Desktop
2. Reinicia tu IDE

---

### **3. Verificar que Figma Desktop esté Ejecutándose**

⚠️ **IMPORTANTE**: El servidor MCP **SOLO** funciona con Figma Desktop, NO con el navegador.

```bash
# Verifica que Figma Desktop esté corriendo
ps aux | grep -i figma
```

Si no ves el proceso:
1. Abre Figma Desktop
2. Espera 10-15 segundos para que el servidor MCP se inicie
3. Intenta de nuevo

---

### **4. Actualizar Figma Desktop**

```bash
# 1. Abre Figma Desktop
# 2. Menú → Help → Check for Updates
# 3. Si hay actualización, instálala
# 4. Reinicia Figma
```

---

### **5. Verificar Configuración MCP en tu IDE**

Si estás usando un IDE con soporte MCP (como Cursor, Windsurf, etc.):

1. Verifica que la configuración MCP esté habilitada
2. Asegúrate de que apunte al servidor local de Figma
3. Revisa que no haya errores en los logs del MCP

---

### **6. Trabajar con Selecciones Pequeñas**

Si el error ocurre al inspeccionar páginas completas:

```
❌ No hagas: Inspeccionar toda la página
✅ Haz: Selecciona un frame o componente específico
```

**Razón**: Figma carga contenido dinámicamente. Páginas grandes pueden causar timeouts.

---

### **7. Verificar Permisos de Dev Mode**

El MCP de Figma requiere acceso a Dev Mode:

- ✅ Plan: Professional, Organization, o Enterprise
- ✅ Seat: "Full" o "Dev" (NO "Viewer")

Verifica en: `Figma → Settings → Account`

---

### **8. Verificar Estado de Figma**

```bash
# Abre en navegador
open https://status.figma.com
```

Si hay incidentes activos, espera a que Figma los resuelva.

---

## 🔄 Workflow de Reinicio Completo

Si nada funciona, haz un reinicio completo:

```bash
# 1. Cierra TODO
killall Figma 2>/dev/null
# Cierra tu IDE manualmente

# 2. Limpia caché
rm -rf ~/Library/Application\ Support/Figma/Cache
rm -rf ~/Library/Application\ Support/Figma/Code\ Cache

# 3. Reinicia en orden
# a. Abre Figma Desktop primero
# b. Espera 15 segundos
# c. Abre tu IDE
# d. Espera 10 segundos
# e. Intenta usar MCP de nuevo
```

---

## 🆘 Si Nada Funciona

### Opción 1: Usar el Plugin de Figma (Alternativa)

En lugar del MCP, usa el plugin que ya tienes instalado:

```
1. Abre Figma Desktop
2. Plugins → Development → Design Tokens to GitHub
3. Extrae y sube tokens manualmente
```

**Ventaja**: No depende del servidor MCP

---

### Opción 2: Exportar JSON Manualmente

```
1. En Figma: Variables panel → ⋮ → Export variables
2. Guarda el JSON
3. Cópialo a source-tokens/tokens.json
4. Haz commit y push
```

---

### Opción 3: Contactar Soporte de Figma

Si el MCP sigue sin funcionar:

1. Ve a: https://help.figma.com/hc/en-us/requests/new
2. Incluye:
   - Link al archivo de Figma
   - Screenshot del error
   - Versión de Figma Desktop
   - Sistema operativo

---

## 📊 Diferencias: Plugin vs MCP

| Característica | Plugin de Figma | Figma Dev Mode MCP |
|----------------|-----------------|---------------------|
| **Ubicación** | Dentro de Figma | Servidor local |
| **Uso** | Manual (click en UI) | Automático (IA) |
| **Requiere** | Figma Desktop | Figma Desktop + IDE con MCP |
| **Estabilidad** | ✅ Muy estable | ⚠️ Puede tener timeouts |
| **Configuración** | Una vez | Automática |

---

## 💡 Recomendación

Para tu caso de uso (extraer design tokens), te recomiendo:

**Usar el Plugin de Figma** que ya tienes instalado porque:
- ✅ Es más estable
- ✅ Ya está configurado
- ✅ No depende de servidores externos
- ✅ Funciona siempre

El MCP es útil para:
- Integración con IA en tiempo real
- Inspección automática de componentes
- Workflows avanzados con LLMs

---

## 🎯 Siguiente Paso

¿Qué prefieres?

1. **Intentar arreglar el MCP** (seguir troubleshooting)
2. **Usar el Plugin** (solución inmediata)
3. **Exportar manualmente** (más control)

¡Dime cuál prefieres y te ayudo! 🚀
