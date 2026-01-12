#!/bin/bash

# 🚀 Script para conectar a GitHub y publicar
# Ejecuta este script después de crear el repositorio en GitHub

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Conectando a GitHub...${NC}"
echo ""

# Pedir el nombre de usuario
read -p "Ingresa tu nombre de usuario de GitHub: " github_user

if [ -z "$github_user" ]; then
    echo -e "${YELLOW}⚠️  Nombre de usuario no puede estar vacío${NC}"
    exit 1
fi

# Configurar remote
echo -e "${BLUE}📡 Configurando remote...${NC}"
git remote add origin "https://github.com/$github_user/figma-to-style-dictionary.git"

# Verificar que la rama sea main
echo -e "${BLUE}🔄 Verificando rama...${NC}"
git branch -M main

# Mostrar status
echo -e "${BLUE}📊 Estado actual:${NC}"
git log --oneline --graph -5

echo ""
echo -e "${GREEN}✅ Remote configurado correctamente${NC}"
echo ""
echo -e "${YELLOW}Repositorio: https://github.com/$github_user/figma-to-style-dictionary${NC}"
echo ""

read -p "¿Hacer push ahora? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📤 Haciendo push...${NC}"
    git push -u origin main
    
    echo ""
    echo -e "${GREEN}✅ ¡Código subido exitosamente!${NC}"
    echo ""
    echo -e "${BLUE}🌐 Tu repositorio está en:${NC}"
    echo -e "${YELLOW}https://github.com/$github_user/figma-to-style-dictionary${NC}"
    echo ""
    
    read -p "¿Activar GitHub Pages? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo -e "${BLUE}📝 Para activar GitHub Pages:${NC}"
        echo "1. Ve a: https://github.com/$github_user/figma-to-style-dictionary/settings/pages"
        echo "2. En 'Source', selecciona 'main' branch"
        echo "3. Click en 'Save'"
        echo ""
        echo -e "${GREEN}Tu app estará en:${NC}"
        echo -e "${YELLOW}https://$github_user.github.io/figma-to-style-dictionary/${NC}"
        echo ""
        
        # Abrir la página de settings
        open "https://github.com/$github_user/figma-to-style-dictionary/settings/pages"
    fi
fi

echo ""
echo -e "${GREEN}🎉 ¡Todo listo!${NC}"
