# 📦 Guía de Instalación en Nuevo Proyecto

Esta guía te permite instalar el sistema completo de Design Tokens en cualquier repositorio nuevo.

---

## 🎯 **Lo que Obtendrás**

- ✅ Plugin de Figma para exportar variables
- ✅ Subida automática a GitHub
- ✅ Style Dictionary configurado
- ✅ GitHub Actions que genera código automáticamente
- ✅ 7 formatos de salida (CSS, SCSS, iOS, Android, etc.)

---

## 📋 **Requisitos Previos**

- Node.js 18+ instalado
- Cuenta de GitHub
- Figma Desktop
- Git configurado

---

## 🚀 **Instalación Paso a Paso**

### **Paso 1: Crear Nuevo Repositorio en GitHub**

1. Ve a: https://github.com/new
2. Nombre: `mi-design-tokens` (o el que prefieras)
3. Descripción: "Sistema de Design Tokens con Figma + Style Dictionary"
4. Público o Privado (tu elección)
5. ✅ Marca "Add a README file"
6. Click **"Create repository"**

---

### **Paso 2: Clonar y Configurar Localmente**

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/mi-design-tokens.git
cd mi-design-tokens

# Inicializar npm
npm init -y

# Instalar Style Dictionary
npm install --save-dev style-dictionary

# Actualizar package.json con type: module
```

Edita `package.json` y añade:
```json
{
  "type": "module",
  "scripts": {
    "build": "node build-tokens.js"
  }
}
```

---

### **Paso 3: Copiar Archivos del Sistema**

Copia estos archivos desde `figma-to-style-dictionary`:

#### **A. Estructura de Carpetas**
```bash
mkdir -p source-tokens
mkdir -p config
mkdir -p dist/{css,scss,less,json,js,ios,android}
mkdir -p .github/workflows
mkdir -p figma-plugin
```

#### **B. Archivos de Configuración**

**`config/style-dictionary.config.js`**
```javascript
export default {
  source: ['source-tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true }
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: 'tokens.scss',
        format: 'scss/variables',
        options: { outputReferences: true }
      }]
    },
    less: {
      transformGroup: 'less',
      buildPath: 'dist/less/',
      files: [{
        destination: 'tokens.less',
        format: 'less/variables',
        options: { outputReferences: true }
      }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    ios: {
      transformGroup: 'ios',
      buildPath: 'dist/ios/',
      files: [{
        destination: 'Colors.swift',
        format: 'ios-swift/class.swift',
        className: 'DesignTokens',
        options: { outputReferences: false }
      }]
    },
    android: {
      transformGroup: 'android',
      buildPath: 'dist/android/',
      files: [{
        destination: 'colors.xml',
        format: 'android/resources',
        resourceType: 'color'
      }]
    }
  }
};
```

**`build-tokens.js`**
```javascript
#!/usr/bin/env node

import StyleDictionary from 'style-dictionary';
import config from './config/style-dictionary.config.js';

console.log('🎨 Building design tokens with Style Dictionary...\n');

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('\n✅ Build complete!');
console.log('\n📁 Generated files:');
console.log('   - dist/css/tokens.css');
console.log('   - dist/scss/tokens.scss');
console.log('   - dist/less/tokens.less');
console.log('   - dist/json/tokens.json');
console.log('   - dist/js/tokens.js');
console.log('   - dist/ios/Colors.swift');
console.log('   - dist/android/colors.xml');
```

```bash
chmod +x build-tokens.js
```

**`.github/workflows/build-tokens.yml`**
```yaml
name: Build Design Tokens

on:
  push:
    branches: [ main ]
    paths:
      - 'source-tokens/**'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-tokens:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🎨 Build design tokens
        run: npm run build

      - name: 📊 Show generated files
        run: |
          echo "Generated files:"
          ls -lah dist/

      - name: 💾 Commit and push generated files
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add dist/
          git diff --staged --quiet || git commit -m "chore: Update generated design tokens [skip ci]"
          git push
```

**`.gitignore`**
```
# OS Files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp

# Logs
*.log

# Node
node_modules/
```

---

### **Paso 4: Plugin de Figma**

Copia la carpeta completa `figma-plugin/` con estos archivos:

- `figma-plugin/manifest.json`
- `figma-plugin/code.js`
- `figma-plugin/ui.html`
- `figma-plugin/README.md`

**IMPORTANTE**: Edita `figma-plugin/ui.html` y cambia los valores por defecto:

```javascript
// Línea ~256-260
document.getElementById('repoOwner').value = 'TU_USUARIO';
document.getElementById('repoName').value = 'mi-design-tokens';
```

---

### **Paso 5: Commit Inicial**

```bash
# Añadir archivos
git add .

# Commit
git commit -m "feat: Initial setup with Figma plugin and Style Dictionary

- Added Style Dictionary configuration
- Added GitHub Actions workflow
- Added Figma plugin
- Ready for design token automation"

# Push
git push origin main
```

---

### **Paso 6: Instalar Plugin en Figma**

1. Abre **Figma Desktop**
2. **Plugins** → **Development** → **Import plugin from manifest...**
3. Navega a: `mi-design-tokens/figma-plugin/manifest.json`
4. Selecciona el archivo
5. ¡Listo!

---

### **Paso 7: Crear GitHub Token**

1. Ve a: https://github.com/settings/tokens/new
2. **Note**: `Figma Design Tokens Plugin`
3. **Expiration**: 90 days (o lo que prefieras)
4. **Scopes**: Marca solo `repo`
5. Click **Generate token**
6. **Copia el token** (empieza con `ghp_...`)

---

### **Paso 8: Probar el Sistema**

#### **A. Crear Variable de Prueba en Figma**

1. Abre cualquier archivo de Figma
2. Panel de **Variables** (💎)
3. Crea una colección: "Test"
4. Crea una variable: "Primary Color"
5. Tipo: Color
6. Valor: `#FF0000`

#### **B. Ejecutar Plugin**

1. **Plugins** → **Development** → **Design Tokens to GitHub**
2. Click **"📥 Extraer Variables"**
3. Deberías ver: "1 tokens extraídos"

#### **C. Configurar GitHub**

1. Pega tu **GitHub Token**
2. Usuario: `TU_USUARIO`
3. Repo: `mi-design-tokens`
4. Rama: `main`
5. Archivo: `source-tokens/tokens.json`
6. ✅ Marca "Guardar configuración"

#### **D. Subir a GitHub**

1. Click **"🚀 Subir a GitHub"**
2. Espera el mensaje: "✅ Tokens subidos exitosamente"

#### **E. Verificar GitHub Actions**

1. Ve a: `https://github.com/TU_USUARIO/mi-design-tokens/actions`
2. Deberías ver el workflow ejecutándose
3. Espera ~30-60 segundos
4. ✅ Workflow completo

#### **F. Verificar Archivos Generados**

1. Ve a tu repositorio
2. Navega a `dist/css/tokens.css`
3. Deberías ver tu color generado:
```css
:root {
  --test-primary-color: #FF0000;
}
```

---

## ✅ **Verificación Final**

Si todo funciona, deberías tener:

- ✅ Plugin instalado en Figma
- ✅ Tokens extraídos correctamente
- ✅ Archivo subido a `source-tokens/tokens.json`
- ✅ GitHub Actions ejecutado exitosamente
- ✅ Archivos generados en `dist/`
- ✅ Commit automático de GitHub Actions

---

## 🎯 **Workflow Diario**

Una vez instalado, el workflow es:

```
1. Diseñador actualiza variables en Figma
2. Abre plugin → Click "Extraer" → Click "Subir"
3. GitHub Actions genera código automáticamente
4. Desarrolladores hacen git pull
5. ¡Código listo para usar!
```

---

## 📚 **Archivos Opcionales**

Puedes copiar también:
- `README.md` - Documentación principal
- `QUICKSTART.md` - Guía rápida
- `UPDATE_TOKENS.md` - Guía de actualización
- Aplicación web (`index.html`, `converter.js`, etc.) - Para conversión manual

---

## 🆘 **Solución de Problemas**

### **Error: "Dependencies lock file is not found"**
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### **Error: "403 Permission denied" en GitHub Actions**
- Verifica que el workflow tenga `permissions: contents: write`
- Verifica que GitHub Actions esté habilitado en el repo

### **Plugin no encuentra variables**
- Asegúrate de tener variables locales (no de librería)
- Las variables deben tener valores asignados
- Usa Figma Desktop (no browser)

---

## 💡 **Tips**

1. **Personaliza los formatos** en `config/style-dictionary.config.js`
2. **Añade más plataformas** según necesites
3. **Documenta tu sistema** para tu equipo
4. **Crea tags** para versionar cambios importantes

---

## 🎉 **¡Listo!**

Ahora tienes el sistema completo instalado en tu nuevo proyecto.

**Tiempo de instalación**: ~15-20 minutos  
**Tiempo de uso diario**: ~30 segundos  

¡Disfruta de tu workflow automatizado! 🚀
