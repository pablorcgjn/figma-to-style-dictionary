# 🔄 Guía de Actualización de Tokens de Diseño

## 📋 Workflow Recomendado

### Opción 1: Actualización Manual Completa

#### Paso 1: Exportar desde Figma
1. En Figma, exporta tus tokens actualizados como JSON
2. Guarda el archivo (ej: `BrandB.Dark.tokens.json`)

#### Paso 2: Convertir con la herramienta
1. Abre `index.html` en tu navegador
2. Arrastra el nuevo archivo JSON
3. Selecciona los formatos que necesitas
4. Click en "Convertir JSON"
5. Click en "Descargar todos los formatos"

#### Paso 3: Organizar los archivos descargados
```bash
# Crear estructura de carpetas (primera vez)
mkdir -p tokens/css tokens/scss tokens/json tokens/ios tokens/android tokens/flutter

# Mover los archivos descargados a sus carpetas
mv ~/Downloads/tokens.css tokens/css/
mv ~/Downloads/tokens.scss tokens/scss/
mv ~/Downloads/tokens.json tokens/json/
mv ~/Downloads/tokens.swift tokens/ios/
mv ~/Downloads/tokens.xml tokens/android/
mv ~/Downloads/tokens.dart tokens/flutter/
```

#### Paso 4: Commit y Push a GitHub
```bash
# Añadir los cambios
git add tokens/

# Commit con mensaje descriptivo
git commit -m "chore: Update design tokens - [fecha o versión]

- Updated color palette
- New typography scales
- Updated spacing values"

# Subir a GitHub
git push
```

---

## 🚀 Opción 2: Script de Automatización

Voy a crear un script que automatice todo el proceso.

### Uso del Script Automático:
```bash
# 1. Coloca tu nuevo JSON en la carpeta del proyecto
cp ~/Downloads/BrandB.Dark.tokens.json ./source-tokens/

# 2. Ejecuta el script de actualización
./update-tokens.sh

# 3. El script automáticamente:
#    - Convierte los tokens a todos los formatos
#    - Los organiza en carpetas
#    - Hace commit
#    - Hace push a GitHub
```

---

## 📁 Estructura de Carpetas Recomendada

```
figma-to-style-dictionary/
├── source-tokens/              # 📥 JSONs originales de Figma
│   ├── BrandB.Dark.tokens.json
│   └── BrandB.Light.tokens.json
├── tokens/                     # 📤 Tokens convertidos
│   ├── css/
│   │   └── tokens.css
│   ├── scss/
│   │   └── tokens.scss
│   ├── json/
│   │   └── tokens.json
│   ├── ios/
│   │   └── tokens.swift
│   ├── android/
│   │   └── tokens.xml
│   └── flutter/
│       └── tokens.dart
├── index.html
├── converter.js
└── app.js
```

---

## 🔄 Versionado de Tokens

### Opción A: Por Fecha
```bash
git commit -m "chore: Update tokens - 2026-01-11"
git tag -a v1.1.0 -m "Design tokens update - January 2026"
git push --tags
```

### Opción B: Semantic Versioning
```bash
# Cambios menores (ajustes de colores)
git commit -m "chore(tokens): Minor color adjustments"
git tag -a v1.0.1 -m "Patch: Color adjustments"

# Nuevos tokens (nuevas variables)
git commit -m "feat(tokens): Add new spacing scale"
git tag -a v1.1.0 -m "Minor: New spacing tokens"

# Cambios importantes (breaking changes)
git commit -m "feat(tokens)!: Restructure color system"
git tag -a v2.0.0 -m "Major: Color system overhaul"

git push --tags
```

---

## 📝 Plantilla de Commit Message

```bash
git commit -m "chore(tokens): [Descripción breve]

Changes:
- [Cambio 1]
- [Cambio 2]
- [Cambio 3]

Affected platforms:
- CSS
- SCSS
- iOS
- Android

Figma file: [Link al archivo de Figma]
Date: $(date +%Y-%m-%d)"
```

---

## 🔔 Notificaciones de Cambios

### Crear un CHANGELOG.md
```markdown
# Changelog

## [1.1.0] - 2026-01-11

### Added
- New primary color variants
- Extended spacing scale

### Changed
- Updated typography line heights
- Refined border radius values

### Removed
- Deprecated legacy color tokens
```

---

## 🤖 Automatización Avanzada (Opcional)

### GitHub Actions para CI/CD
Puedo crear un workflow que:
1. Detecta cuando subes un nuevo JSON
2. Automáticamente convierte a todos los formatos
3. Crea un Pull Request con los cambios
4. Publica en GitHub Pages

¿Te interesa esta opción?

---

## ✅ Checklist de Actualización

- [ ] Exportar tokens desde Figma
- [ ] Convertir con la herramienta web
- [ ] Organizar archivos en carpetas
- [ ] Revisar cambios con `git diff`
- [ ] Hacer commit con mensaje descriptivo
- [ ] Crear tag de versión (opcional)
- [ ] Push a GitHub
- [ ] Actualizar CHANGELOG.md
- [ ] Notificar al equipo (si aplica)

---

## 🆘 Comandos Útiles

```bash
# Ver qué archivos cambiaron
git status

# Ver diferencias específicas
git diff tokens/css/tokens.css

# Deshacer cambios locales (antes de commit)
git checkout -- tokens/

# Ver historial de cambios en tokens
git log --oneline -- tokens/

# Comparar con versión anterior
git diff HEAD~1 tokens/css/tokens.css
```

---

¿Quieres que cree el script de automatización completo? 🚀
