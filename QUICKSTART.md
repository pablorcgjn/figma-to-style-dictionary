# 🚀 Quick Start: Actualizar Tokens

## Método Rápido (3 pasos)

### 1️⃣ Exporta desde Figma
Guarda tu JSON actualizado en `source-tokens/`

```bash
# Copia tu archivo desde Downloads
cp ~/Downloads/BrandB.Dark.tokens.json source-tokens/
```

### 2️⃣ Convierte los tokens
1. Abre `index.html` en tu navegador
2. Arrastra el archivo JSON
3. Selecciona formatos (CSS, SCSS, iOS, etc.)
4. Click "Convertir JSON"
5. Click "Descargar todos los formatos"

### 3️⃣ Ejecuta el script de actualización
```bash
./update-tokens.sh
```

El script automáticamente:
- ✅ Mueve los archivos descargados a sus carpetas
- ✅ Te pregunta si quieres hacer commit
- ✅ Te pregunta si quieres hacer push
- ✅ Te pregunta si quieres crear un tag de versión

---

## Método Manual Detallado

### Paso 1: Preparar archivos
```bash
# Copiar JSON de Figma
cp ~/Downloads/BrandB.Dark.tokens.json source-tokens/

# Convertir usando la web app (index.html)
# Descargar todos los formatos
```

### Paso 2: Organizar archivos convertidos
```bash
# Mover archivos a sus carpetas
mv ~/Downloads/tokens.css tokens/css/
mv ~/Downloads/tokens.scss tokens/scss/
mv ~/Downloads/tokens.json tokens/json/
mv ~/Downloads/tokens.swift tokens/ios/
mv ~/Downloads/tokens.xml tokens/android/
mv ~/Downloads/tokens.dart tokens/flutter/
```

### Paso 3: Git workflow
```bash
# Ver cambios
git status
git diff tokens/css/tokens.css

# Añadir cambios
git add tokens/ source-tokens/

# Commit
git commit -m "chore(tokens): Update design tokens - $(date +%Y-%m-%d)

- Updated color palette
- New typography values
- Refined spacing scale"

# Push
git push

# (Opcional) Crear tag de versión
git tag -a v1.1.0 -m "Design tokens update - January 2026"
git push --tags
```

### Paso 4: Actualizar CHANGELOG
Edita `CHANGELOG.md` y añade:

```markdown
## [1.1.0] - 2026-01-11

### Changed
- Updated primary color palette
- Refined typography line heights

### Added
- New spacing tokens for mobile
```

---

## 📋 Checklist

- [ ] Exportar JSON desde Figma
- [ ] Copiar a `source-tokens/`
- [ ] Convertir con la web app
- [ ] Descargar todos los formatos
- [ ] Ejecutar `./update-tokens.sh` (o mover manualmente)
- [ ] Revisar cambios con `git diff`
- [ ] Commit y push
- [ ] Actualizar CHANGELOG.md
- [ ] (Opcional) Crear tag de versión
- [ ] (Opcional) Notificar al equipo

---

## 🎯 Ejemplo Completo

```bash
# 1. Copiar nuevo JSON
cp ~/Downloads/BrandB.Dark.tokens.json source-tokens/

# 2. Abrir la app y convertir
open index.html
# (Convertir y descargar en la interfaz)

# 3. Ejecutar script automático
./update-tokens.sh

# El script te guiará paso a paso:
# - ¿Hacer commit? (y/n)
# - ¿Hacer push? (y/n)
# - ¿Crear tag? (y/n)
```

---

## 💡 Tips

- **Usa el script**: `./update-tokens.sh` automatiza todo
- **Revisa cambios**: Siempre haz `git diff` antes de commit
- **Mensajes claros**: Describe qué cambió en el commit
- **Versiona**: Usa tags para releases importantes
- **Documenta**: Actualiza CHANGELOG.md

---

## 🆘 Problemas Comunes

### "Permission denied" al ejecutar el script
```bash
chmod +x update-tokens.sh
```

### Archivos no se mueven automáticamente
Verifica que los archivos estén en `~/Downloads/` con los nombres correctos:
- `tokens.css`
- `tokens.scss`
- `tokens.json`
- etc.

### Quiero deshacer cambios
```bash
# Antes de commit
git checkout -- tokens/

# Después de commit (último commit)
git reset --soft HEAD~1
```

---

¿Necesitas ayuda? Revisa [UPDATE_TOKENS.md](UPDATE_TOKENS.md) para más detalles.
