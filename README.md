# 🎨 Figma to Style Dictionary Converter

> Convierte tus variables de Figma a tokens de diseño en múltiples formatos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)

---

## 📋 Descripción

**Figma to Style Dictionary** es una herramienta completa que te permite:

✅ Exportar variables de Figma como tokens de diseño  
✅ Convertir a múltiples formatos (CSS, SCSS, LESS, JSON, JS)  
✅ Generar código para plataformas móviles (iOS, Android, Flutter)  
✅ Automatizar el flujo de trabajo con GitHub Actions  
✅ Mantener sincronizados diseño y código  

---

## 🚀 Inicio Rápido

### **Opción 1: Instalación Automática** (Recomendado)

```bash
# Clonar el repositorio
git clone <tu-repo>
cd figma-to-style-dictionary

# Ejecutar instalación automática
chmod +x install.sh
./install.sh
```

### **Opción 2: Instalación Manual**

```bash
# Instalar dependencias
npm install

# Abrir la aplicación web
open index.html
```

---

## 📖 Documentación

### **Guías Principales**

- 📘 **[START_HERE.md](./START_HERE.md)** - Comienza aquí si es tu primera vez
- ⚡ **[QUICKSTART.md](./QUICKSTART.md)** - Guía rápida de 5 minutos
- 🔧 **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - Instalación detallada

### **Configuración**

- 🎨 **[FIGMA_PLUGIN_GUIDE.md](./FIGMA_PLUGIN_GUIDE.md)** - Exportar desde Figma
- 🐙 **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** - Configurar GitHub Actions
- 🔄 **[UPDATE_TOKENS.md](./UPDATE_TOKENS.md)** - Actualizar tokens automáticamente

### **Referencia**

- 📝 **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios
- 📄 **[LICENSE](./LICENSE)** - Licencia MIT

---

## 🎯 Características

### **Formatos de Salida**

| Formato | Descripción | Archivo |
|---------|-------------|---------|
| **CSS** | Variables CSS nativas | `tokens.css` |
| **SCSS** | Variables Sass | `tokens.scss` |
| **LESS** | Variables LESS | `tokens.less` |
| **JSON** | Formato JSON estándar | `tokens.json` |
| **JavaScript** | Módulos ES6 | `tokens.js` |
| **iOS** | Swift (UIColor) | `tokens.swift` |
| **Android** | XML (colors.xml) | `colors.xml` |
| **Flutter** | Dart (Color) | `tokens.dart` |

### **Tipos de Tokens Soportados**

- 🎨 **Colores** - Sólidos, gradientes, opacidad
- 📝 **Tipografía** - Familias, tamaños, pesos, line-height
- 📏 **Espaciado** - Padding, margin, gap
- 🔲 **Bordes** - Width, radius, style
- 🌑 **Sombras** - Box-shadow, drop-shadow
- 📐 **Tamaños** - Width, height, dimensiones

### **Opciones de Conversión**

- ✅ Prefijo personalizable (`--sds-`, `$theme-`, etc.)
- ✅ Comentarios descriptivos
- ✅ Formato embellecido (prettify)
- ✅ Agrupación por categorías
- ✅ Filtrado por tipo de token

---

## 💻 Uso

### **1. Exportar desde Figma**

```bash
# Opción A: Usar el plugin de Figma
1. Abre tu archivo de Figma
2. Plugins → Variables Export → Export as JSON
3. Guarda el archivo JSON

# Opción B: Usar la API de Figma
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/variables/local" \
  > figma-variables.json
```

Ver **[FIGMA_PLUGIN_GUIDE.md](./FIGMA_PLUGIN_GUIDE.md)** para más detalles.

### **2. Convertir Tokens**

#### **Interfaz Web** (Recomendado)

```bash
# Abrir la aplicación
open index.html

# O usar un servidor local
npx http-server -p 8080
```

1. Arrastra tu archivo JSON de Figma
2. Selecciona los formatos de salida
3. Configura opciones (prefijo, comentarios, etc.)
4. Haz clic en "Convertir"
5. Descarga los archivos generados

#### **Línea de Comandos**

```bash
# Convertir a CSS
node converter.js figma-variables.json --format css --output tokens.css

# Convertir a múltiples formatos
node converter.js figma-variables.json --format css,scss,json
```

### **3. Integrar en tu Proyecto**

```css
/* CSS */
@import './tokens.css';

.button-primary {
  background: var(--color-brand-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
}
```

```scss
/* SCSS */
@import './tokens.scss';

.button-primary {
  background: $color-brand-primary;
  padding: $spacing-md;
  border-radius: $radius-sm;
}
```

```javascript
/* JavaScript */
import tokens from './tokens.js';

const Button = styled.button`
  background: ${tokens.colors.brand.primary};
  padding: ${tokens.spacing.md};
`;
```

---

## 🔄 Automatización con GitHub Actions

### **Configuración**

1. Sigue la guía **[GITHUB_SETUP.md](./GITHUB_SETUP.md)**
2. Configura los secretos de GitHub:
   - `FIGMA_TOKEN` - Tu token personal de Figma
   - `FIGMA_FILE_KEY` - ID de tu archivo de Figma

### **Workflow Automático**

```yaml
# .github/workflows/update-tokens.yml
name: Update Design Tokens

on:
  schedule:
    - cron: '0 0 * * *'  # Diariamente a medianoche
  workflow_dispatch:      # Manual

jobs:
  update-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update tokens
        run: ./update-tokens.sh
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git add tokens/
          git commit -m "chore: update design tokens"
          git push
```

Ver **[UPDATE_TOKENS.md](./UPDATE_TOKENS.md)** para más detalles.

---

## � Estructura del Proyecto

```
figma-to-style-dictionary/
├── 📄 index.html              # Interfaz web principal
├── 📄 app.js                  # Lógica de la aplicación
├── 📄 converter.js            # Motor de conversión
├── 📄 styles.css              # Estilos de la interfaz
├── 📄 build-tokens.js         # Script de construcción
├── 📁 config/                 # Configuración Style Dictionary
├── 📁 source-tokens/          # Tokens fuente de Figma
├── 📁 tokens/                 # Tokens generados
├── 📁 dist/                   # Archivos compilados
├── 📁 figma-plugin/           # Plugin de Figma
├── 📜 install.sh              # Script de instalación
├── 📜 update-tokens.sh        # Script de actualización
├── 📜 publish-to-github.sh    # Script de publicación
└── 📚 docs/                   # Documentación
```

---

## �️ Desarrollo

### **Requisitos**

- Node.js >= 14.0.0
- npm >= 6.0.0

### **Instalación para Desarrollo**

```bash
# Clonar repositorio
git clone <tu-repo>
cd figma-to-style-dictionary

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### **Scripts Disponibles**

```bash
npm run build        # Construir tokens
npm run watch        # Modo watch
npm run clean        # Limpiar archivos generados
npm test             # Ejecutar tests
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Ejemplos

### **Ejemplo 1: Colores de Marca**

```json
// Figma Variables
{
  "Brand/Primary": "#6366F1",
  "Brand/Secondary": "#8B5CF6",
  "Brand/Accent": "#EC4899"
}
```

```css
/* Salida CSS */
:root {
  --color-brand-primary: #6366F1;
  --color-brand-secondary: #8B5CF6;
  --color-brand-accent: #EC4899;
}
```

### **Ejemplo 2: Sistema de Espaciado**

```json
// Figma Variables
{
  "Spacing/XS": "4px",
  "Spacing/SM": "8px",
  "Spacing/MD": "16px",
  "Spacing/LG": "24px",
  "Spacing/XL": "32px"
}
```

```scss
/* Salida SCSS */
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

---

## � Solución de Problemas

### **Error: "No se pudo leer el archivo JSON"**

- Verifica que el archivo sea un JSON válido
- Asegúrate de que fue exportado desde Figma Variables

### **Error: "Token no reconocido"**

- Verifica que las variables de Figma sigan la convención de nombres
- Ejemplo: `Color/Brand/Primary` o `Spacing/MD`

### **Los tokens no se actualizan**

```bash
# Limpiar caché y reconstruir
npm run clean
npm run build
```

---

## 📚 Recursos

### **Documentación Oficial**

- [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Design Tokens](https://www.designtokens.org/)

### **Tutoriales**

- [Cómo crear variables en Figma](https://www.figma.com/best-practices/creating-and-organizing-variables/)
- [Guía de Design Tokens](https://www.designtokens.org/glossary/)

---

## � Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## � Agradecimientos

- **Figma** - Por la API de Variables
- **Style Dictionary** - Por el framework de tokens
- **Comunidad de Design Systems** - Por las mejores prácticas

---

## 📞 Soporte

¿Tienes preguntas o problemas?

- 📖 Lee la [documentación completa](./START_HERE.md)
- 🐛 Reporta un [issue](https://github.com/tu-usuario/figma-to-style-dictionary/issues)
- 💬 Únete a las [discusiones](https://github.com/tu-usuario/figma-to-style-dictionary/discussions)

---

## 🗺️ Roadmap

- [ ] Soporte para más formatos (Tailwind, Chakra UI)
- [ ] Exportación de componentes
- [ ] Validación de tokens
- [ ] CLI mejorado
- [ ] Integración con Storybook
- [ ] Temas dinámicos (light/dark)

---

## 🆕 Proyecto Adicional: AI Code Generation

Este repositorio también incluye una demostración de **generación de código con IA usando metadatos estructurados**.

Ver **[AI_README.md](./AI_README.md)** para más información sobre este proyecto complementario.

---

**Creado con ❤️ para la comunidad de Design Systems**

*Última actualización: 2026-01-12*
