# 🎨 Plugin de Figma: Design Tokens to GitHub

Plugin de Figma que exporta automáticamente tus variables de diseño y las sube directamente a tu repositorio de GitHub.

## ✨ Características

- 📥 **Extracción automática** de todas las variables locales de Figma
- 🔄 **Conversión** al formato de tokens compatible con Style Dictionary
- 🚀 **Subida directa** a GitHub (sin exportar archivos manualmente)
- 🔐 **Seguro**: Usa GitHub Personal Access Tokens
- 💾 **Guarda configuración**: No necesitas volver a configurar
- 📊 **Estadísticas**: Ve cuántos tokens se exportaron
- 🎯 **Pull Requests**: Opción para crear PRs automáticamente

## 🚀 Instalación

### Opción 1: Desarrollo Local (Recomendado para empezar)

1. **Abre Figma Desktop**
2. Ve a **Plugins** → **Development** → **Import plugin from manifest**
3. Selecciona el archivo: `figma-plugin/manifest.json`
4. ¡Listo! El plugin aparecerá en tu menú de plugins

### Opción 2: Publicar en Figma Community (Opcional)

Para compartir con tu equipo:
1. En Figma, ve a **Plugins** → **Development** → **Publish plugin**
2. Sigue las instrucciones de Figma
3. Tu equipo podrá instalarlo desde la comunidad

## 🔑 Configuración de GitHub

### Paso 1: Crear Personal Access Token

1. Ve a: https://github.com/settings/tokens/new
2. **Note**: `Figma Design Tokens Plugin`
3. **Expiration**: 90 days (o lo que prefieras)
4. **Scopes**: Marca solo `repo` (acceso completo a repositorios)
5. Click en **Generate token**
6. **¡IMPORTANTE!** Copia el token (empieza con `ghp_...`)

### Paso 2: Configurar el Plugin

1. Abre el plugin en Figma
2. Pega tu token en el campo **GitHub Personal Access Token**
3. Configura:
   - **Usuario/Organización**: `pablorcgjn`
   - **Repositorio**: `figma-to-style-dictionary`
   - **Rama**: `main`
   - **Ruta del archivo**: `source-tokens/tokens.json`
4. Marca **Guardar configuración** para no tener que volver a configurar

## 📖 Cómo Usar

### Workflow Completo (3 pasos)

```
1. Diseña en Figma → Crea variables
2. Abre el plugin → Click "Extraer Variables"
3. Click "Subir a GitHub" → ¡Listo!
```

### Paso a Paso Detallado

#### 1️⃣ Extraer Tokens
- Abre el plugin: **Plugins** → **Design Tokens to GitHub**
- Click en **📥 Extraer Variables**
- El plugin escaneará todas tus colecciones de variables
- Verás estadísticas de cuántos tokens se encontraron

#### 2️⃣ Configurar GitHub (solo primera vez)
- Ingresa tu **GitHub Token**
- Configura el repositorio destino
- El plugin guardará la configuración

#### 3️⃣ Subir a GitHub
- Click en **🚀 Subir a GitHub**
- El plugin:
  - Crea/actualiza el archivo en tu repositorio
  - Hace commit automáticamente
  - (Opcional) Crea un Pull Request

## 🎯 Ejemplo de Uso

### Antes (Manual):
```
1. Exportar JSON desde Figma
2. Abrir la web app
3. Convertir tokens
4. Descargar archivos
5. Copiar a carpeta del proyecto
6. Git add, commit, push
```

### Ahora (Automático):
```
1. Click "Extraer Variables"
2. Click "Subir a GitHub"
✅ ¡Listo!
```

## 📁 Estructura de Archivos

```
figma-plugin/
├── manifest.json    # Configuración del plugin
├── code.js          # Lógica de extracción de tokens
├── ui.html          # Interfaz del plugin
└── README.md        # Esta documentación
```

## 🔧 Desarrollo

### Modificar el Plugin

1. Edita los archivos en `figma-plugin/`
2. En Figma: **Plugins** → **Development** → **Reload plugin**
3. Prueba los cambios

### Debugging

- Abre **Developer Tools** en Figma: `Cmd/Ctrl + Option/Alt + I`
- Los `console.log()` aparecerán ahí
- Los errores de la UI aparecerán en la consola del navegador

## 🔐 Seguridad

- ✅ El token se guarda **solo localmente** en tu navegador
- ✅ No se envía a ningún servidor externo
- ✅ Solo se usa para comunicarse con GitHub API
- ⚠️ **Nunca compartas tu token** con nadie
- ⚠️ Si el token se compromete, revócalo en GitHub

## 🎨 Formato de Tokens

El plugin exporta en el formato estándar de Design Tokens:

```json
{
  "ModeName": {
    "TokenName": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 0, 0],
        "alpha": 1,
        "hex": "#FF0000"
      },
      "$extensions": {
        "com.figma.variableId": "...",
        "com.figma.scopes": ["..."]
      }
    }
  }
}
```

## 🔄 Workflow Recomendado

### Para Diseñadores:
1. Actualiza variables en Figma
2. Ejecuta el plugin
3. Sube a GitHub
4. ¡Listo! Los desarrolladores ya tienen los nuevos tokens

### Para Desarrolladores:
1. Recibe notificación de GitHub (commit o PR)
2. Revisa los cambios
3. Merge (si es PR)
4. Los tokens actualizados están en `source-tokens/`

## 🆘 Solución de Problemas

### Error: "Failed to upload to GitHub"
- Verifica que el token sea válido
- Verifica que tengas permisos en el repositorio
- Verifica que la rama exista

### Error: "No variables found"
- Asegúrate de tener variables locales en tu archivo de Figma
- Las variables deben estar en colecciones

### El plugin no aparece
- Verifica que importaste el `manifest.json` correcto
- Reinicia Figma Desktop
- Verifica que estés en Figma Desktop (no funciona en browser)

## 📊 Estadísticas

El plugin muestra:
- **Tokens**: Número total de tokens extraídos
- **Colecciones**: Número de colecciones de variables
- **Preview**: Vista previa del JSON generado

## 🚀 Próximas Mejoras

- [ ] Soporte para múltiples repositorios
- [ ] Crear PRs automáticamente
- [ ] Notificaciones en Slack/Discord
- [ ] Historial de exportaciones
- [ ] Comparación de cambios
- [ ] Exportar solo tokens modificados

## 📞 Soporte

Si tienes problemas o sugerencias:
1. Abre un issue en GitHub
2. Describe el problema
3. Incluye capturas de pantalla si es posible

## 📄 Licencia

MIT License - Mismo que el proyecto principal

---

## 🎉 ¡Disfruta del Workflow Automatizado!

Ahora tus tokens de diseño se sincronizan automáticamente con GitHub. 
¡No más exportaciones manuales! 🚀
