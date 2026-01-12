#!/bin/bash

# 🚀 Script de Instalación Automática
# Sistema de Design Tokens con Figma + Style Dictionary

set -e

echo "🎨 Instalación de Sistema de Design Tokens"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en un repositorio git
if [ ! -d .git ]; then
    echo -e "${YELLOW}⚠️  No estás en un repositorio git.${NC}"
    echo "Inicializando repositorio..."
    git init
    echo -e "${GREEN}✓${NC} Repositorio git inicializado"
fi

# 1. Crear estructura de carpetas
echo ""
echo -e "${BLUE}📁 Creando estructura de carpetas...${NC}"
mkdir -p source-tokens
mkdir -p config
mkdir -p dist/{css,scss,less,json,js,ios,android}
mkdir -p .github/workflows
mkdir -p figma-plugin
echo -e "${GREEN}✓${NC} Carpetas creadas"

# 2. Inicializar npm si no existe package.json
if [ ! -f package.json ]; then
    echo ""
    echo -e "${BLUE}📦 Inicializando npm...${NC}"
    npm init -y
    echo -e "${GREEN}✓${NC} package.json creado"
fi

# 3. Instalar Style Dictionary
echo ""
echo -e "${BLUE}📥 Instalando Style Dictionary...${NC}"
npm install --save-dev style-dictionary
echo -e "${GREEN}✓${NC} Style Dictionary instalado"

# 4. Actualizar package.json
echo ""
echo -e "${BLUE}⚙️  Configurando package.json...${NC}"

# Usar node para actualizar el JSON
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.type = 'module';
pkg.scripts = pkg.scripts || {};
pkg.scripts.build = 'node build-tokens.js';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo -e "${GREEN}✓${NC} package.json actualizado"

# 5. Crear .gitignore si no existe
if [ ! -f .gitignore ]; then
    echo ""
    echo -e "${BLUE}📝 Creando .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# OS Files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Node
node_modules/

# Temporary files
*.tmp
.cache/
EOF
    echo -e "${GREEN}✓${NC} .gitignore creado"
fi

# 6. Crear archivos .gitkeep
echo ""
echo -e "${BLUE}📌 Creando archivos .gitkeep...${NC}"
touch source-tokens/.gitkeep
touch dist/css/.gitkeep
touch dist/scss/.gitkeep
touch dist/less/.gitkeep
touch dist/json/.gitkeep
touch dist/js/.gitkeep
touch dist/ios/.gitkeep
touch dist/android/.gitkeep
echo -e "${GREEN}✓${NC} .gitkeep creados"

echo ""
echo -e "${GREEN}=========================================="
echo "✅ Instalación base completada"
echo "==========================================${NC}"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Copia los archivos de configuración:"
echo "   - config/style-dictionary.config.js"
echo "   - build-tokens.js"
echo "   - .github/workflows/build-tokens.yml"
echo ""
echo "2. Copia el plugin de Figma:"
echo "   - figma-plugin/manifest.json"
echo "   - figma-plugin/code.js"
echo "   - figma-plugin/ui.html"
echo ""
echo "3. Lee INSTALLATION_GUIDE.md para instrucciones completas"
echo ""
echo "4. Ejecuta: npm run build (para probar)"
echo ""
echo "🚀 ¡Listo para usar!"
