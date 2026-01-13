#!/bin/bash

echo "🔧 Reiniciando Figma Dev Mode MCP..."
echo ""

# 1. Cerrar Figma
echo "1️⃣ Cerrando Figma Desktop..."
killall Figma 2>/dev/null
sleep 2

# 2. Limpiar caché
echo "2️⃣ Limpiando caché de Figma..."
rm -rf ~/Library/Application\ Support/Figma/Cache 2>/dev/null
rm -rf ~/Library/Application\ Support/Figma/Code\ Cache 2>/dev/null
echo "   ✅ Caché limpiado"

# 3. Reabrir Figma
echo ""
echo "3️⃣ Abriendo Figma Desktop..."
open -a Figma

echo ""
echo "⏳ Esperando 15 segundos para que el servidor MCP se inicie..."
sleep 15

echo ""
echo "✅ ¡Listo! Ahora intenta usar el MCP de nuevo."
echo ""
echo "📝 Si el problema persiste:"
echo "   - Lee TROUBLESHOOTING_MCP.md para más soluciones"
echo "   - O usa el plugin de Figma como alternativa"
