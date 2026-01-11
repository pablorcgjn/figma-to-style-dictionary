#!/bin/bash

# 🎨 Script de Actualización Automática de Tokens
# Este script convierte automáticamente los tokens de Figma a todos los formatos

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Figma to Style Dictionary - Token Updater${NC}"
echo "================================================"
echo ""

# Check if source tokens exist
if [ ! -d "source-tokens" ]; then
    echo -e "${RED}❌ Error: source-tokens directory not found${NC}"
    echo "Please create it and add your Figma JSON files"
    exit 1
fi

# Count JSON files
json_count=$(find source-tokens -name "*.json" -type f | wc -l)
if [ "$json_count" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No JSON files found in source-tokens/${NC}"
    echo "Please add your Figma JSON files to source-tokens/"
    exit 1
fi

echo -e "${GREEN}✓ Found $json_count JSON file(s) to process${NC}"
echo ""

# Process each JSON file
for json_file in source-tokens/*.json; do
    filename=$(basename "$json_file" .json)
    echo -e "${BLUE}📄 Processing: $filename${NC}"
    
    # Note: This is a placeholder. The actual conversion would need
    # to be done through the web interface or a Node.js version of the converter
    echo -e "${YELLOW}   → Please convert this file using the web interface${NC}"
    echo -e "${YELLOW}   → Or we can create a Node.js CLI version${NC}"
done

echo ""
echo -e "${BLUE}📁 Organizing converted files...${NC}"

# Move downloaded files to appropriate folders
if [ -f ~/Downloads/tokens.css ]; then
    mv ~/Downloads/tokens.css tokens/css/
    echo -e "${GREEN}✓ Moved tokens.css${NC}"
fi

if [ -f ~/Downloads/tokens.scss ]; then
    mv ~/Downloads/tokens.scss tokens/scss/
    echo -e "${GREEN}✓ Moved tokens.scss${NC}"
fi

if [ -f ~/Downloads/tokens.less ]; then
    mv ~/Downloads/tokens.less tokens/less/
    echo -e "${GREEN}✓ Moved tokens.less${NC}"
fi

if [ -f ~/Downloads/tokens.json ]; then
    mv ~/Downloads/tokens.json tokens/json/
    echo -e "${GREEN}✓ Moved tokens.json${NC}"
fi

if [ -f ~/Downloads/tokens.js ]; then
    mv ~/Downloads/tokens.js tokens/js/
    echo -e "${GREEN}✓ Moved tokens.js${NC}"
fi

if [ -f ~/Downloads/tokens.swift ]; then
    mv ~/Downloads/tokens.swift tokens/ios/
    echo -e "${GREEN}✓ Moved tokens.swift${NC}"
fi

if [ -f ~/Downloads/tokens.xml ]; then
    mv ~/Downloads/tokens.xml tokens/android/
    echo -e "${GREEN}✓ Moved tokens.xml${NC}"
fi

if [ -f ~/Downloads/tokens.dart ]; then
    mv ~/Downloads/tokens.dart tokens/flutter/
    echo -e "${GREEN}✓ Moved tokens.dart${NC}"
fi

echo ""
echo -e "${BLUE}📊 Git Status:${NC}"
git status --short tokens/

echo ""
read -p "Do you want to commit these changes? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg
    
    if [ -z "$commit_msg" ]; then
        commit_msg="chore(tokens): Update design tokens - $(date +%Y-%m-%d)"
    fi
    
    git add tokens/ source-tokens/
    git commit -m "$commit_msg"
    
    echo -e "${GREEN}✓ Changes committed${NC}"
    echo ""
    
    read -p "Do you want to push to GitHub? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push
        echo -e "${GREEN}✓ Changes pushed to GitHub${NC}"
    fi
    
    echo ""
    read -p "Do you want to create a version tag? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter version tag (e.g., v1.1.0): " version_tag
        read -p "Enter tag message: " tag_msg
        
        git tag -a "$version_tag" -m "$tag_msg"
        git push --tags
        
        echo -e "${GREEN}✓ Tag $version_tag created and pushed${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✅ Done!${NC}"
echo ""
echo "Next steps:"
echo "1. Review changes in your repository"
echo "2. Update CHANGELOG.md if needed"
echo "3. Notify your team about the updates"
