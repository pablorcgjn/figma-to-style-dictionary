# 🚀 Instalación Rápida en Nuevo Proyecto

## Opción 1: Instalación Automática (Recomendada)

```bash
# 1. Clonar este repositorio como template
git clone https://github.com/pablorcgjn/figma-to-style-dictionary.git mi-nuevo-proyecto
cd mi-nuevo-proyecto

# 2. Cambiar el remote a tu nuevo repositorio
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/tu-nuevo-repo.git

# 3. Actualizar configuración del plugin
# Edita figma-plugin/ui.html líneas 256-260:
# - Cambia 'pablorcgjn' por tu usuario
# - Cambia 'figma-to-style-dictionary' por tu repo

# 4. Push al nuevo repositorio
git push -u origin main

# 5. Instalar dependencias
npm install

# 6. ¡Listo! Instala el plugin en Figma
```

---

## Opción 2: Instalación Manual

### Paso 1: Crear Repositorio
```bash
mkdir mi-design-tokens
cd mi-design-tokens
git init
```

### Paso 2: Ejecutar Script de Instalación
```bash
# Copia install.sh de este repo
chmod +x install.sh
./install.sh
```

### Paso 3: Copiar Archivos
Copia estos archivos desde este repositorio:

**Configuración:**
- `config/style-dictionary.config.js`
- `build-tokens.js`
- `.github/workflows/build-tokens.yml`

**Plugin de Figma:**
- `figma-plugin/manifest.json`
- `figma-plugin/code.js`
- `figma-plugin/ui.html`
- `figma-plugin/README.md`

### Paso 4: Personalizar
Edita `figma-plugin/ui.html` (líneas 256-260):
```javascript
document.getElementById('repoOwner').value = 'TU_USUARIO';
document.getElementById('repoName').value = 'tu-repo';
```

### Paso 5: Instalar
```bash
npm install
git add .
git commit -m "Initial setup"
git push
```

---

## 📚 Documentación Completa

Para instrucciones detalladas paso a paso, lee:
- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Guía completa de instalación

---

## ⚡ Verificación Rápida

```bash
# Probar que funciona
npm run build

# Deberías ver:
# ✔︎ dist/css/tokens.css
# ✔︎ dist/scss/tokens.scss
# ✔︎ dist/ios/Colors.swift
# etc.
```

---

## 🎯 Workflow de Uso

Una vez instalado:

```
1. Diseñador actualiza variables en Figma
2. Abre plugin → "Extraer" → "Subir a GitHub"
3. GitHub Actions genera código automáticamente
4. git pull → ¡Código listo!
```

---

## 🆘 Ayuda

Si tienes problemas, consulta:
- [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) - Guía detallada
- [figma-plugin/DEBUGGING.md](figma-plugin/DEBUGGING.md) - Solución de problemas del plugin
- [GitHub Issues](https://github.com/pablorcgjn/figma-to-style-dictionary/issues)

---

## 📦 Lo que Incluye

- ✅ Plugin de Figma
- ✅ Style Dictionary configurado
- ✅ GitHub Actions workflow
- ✅ 7 formatos de salida
- ✅ Documentación completa

**Tiempo de instalación**: 10-15 minutos  
**Tiempo de uso**: 30 segundos por actualización

¡Disfruta! 🚀
