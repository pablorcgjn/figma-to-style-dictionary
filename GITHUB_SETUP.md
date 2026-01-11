# 🚀 Guía para Subir a GitHub

## Opción 1: Crear Repositorio desde GitHub.com (Recomendado)

### Paso 1: Crear el repositorio en GitHub
1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `figma-to-style-dictionary`
   - **Description**: `🎨 Herramienta web para transformar tokens de diseño de Figma en formatos específicos para cada plataforma`
   - **Visibility**: Public (o Private si prefieres)
   - ⚠️ **NO** marques "Add a README file" (ya lo tenemos)
   - ⚠️ **NO** marques "Add .gitignore" (ya lo tenemos)
   - ⚠️ **NO** marques "Choose a license" (ya lo tenemos)
5. Haz clic en **"Create repository"**

### Paso 2: Conectar tu repositorio local
Después de crear el repositorio, GitHub te mostrará instrucciones. Usa estas:

```bash
# Añadir el remote (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/figma-to-style-dictionary.git

# Renombrar la rama a main (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

## Opción 2: Usar GitHub CLI (gh)

Si tienes GitHub CLI instalado:

```bash
# Crear el repositorio directamente desde la terminal
gh repo create figma-to-style-dictionary --public --source=. --remote=origin --push

# O si prefieres privado
gh repo create figma-to-style-dictionary --private --source=. --remote=origin --push
```

## 📝 Comandos que ya están listos

El repositorio local ya está inicializado y tiene el primer commit. Solo necesitas:

1. Crear el repositorio en GitHub
2. Conectarlo con `git remote add origin`
3. Hacer push con `git push -u origin main`

## 🔄 Para futuros updates

Una vez conectado a GitHub, para hacer updates:

```bash
# 1. Hacer cambios en los archivos

# 2. Ver qué archivos cambiaron
git status

# 3. Añadir los cambios
git add .

# 4. Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios"

# 5. Subir a GitHub
git push
```

## 🌐 GitHub Pages (Opcional)

Para publicar la aplicación en GitHub Pages:

1. Ve a tu repositorio en GitHub
2. Click en **Settings** > **Pages**
3. En **Source**, selecciona **main** branch
4. Click en **Save**
5. Tu app estará disponible en: `https://TU_USUARIO.github.io/figma-to-style-dictionary/`

## 📋 Checklist

- [ ] Crear repositorio en GitHub
- [ ] Conectar repositorio local con `git remote add origin`
- [ ] Hacer push inicial con `git push -u origin main`
- [ ] (Opcional) Activar GitHub Pages
- [ ] (Opcional) Añadir topics al repositorio: `figma`, `design-tokens`, `style-dictionary`
- [ ] (Opcional) Añadir una imagen de preview en el README

## 🆘 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/figma-to-style-dictionary.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Cambiar la URL del remote
```bash
git remote set-url origin https://github.com/TU_USUARIO/figma-to-style-dictionary.git
```

## 📞 ¿Necesitas ayuda?

Si tienes problemas, avísame y te ayudo a resolverlos! 🚀
