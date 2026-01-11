# Figma JSON to Style Dictionary Converter

🎨 Herramienta web para transformar tokens de diseño de Figma en formatos específicos para cada plataforma.

## ✨ Características

- **Múltiples formatos de salida**: CSS Variables, SCSS, LESS, JSON, JavaScript, iOS (Swift), Android (XML), Flutter (Dart)
- **Tipos de tokens soportados**: Colores, Tipografía, Espaciado, Bordes, Sombras, Tamaños
- **Preview en tiempo real**: Visualiza los tokens antes de descargar
- **Opciones personalizables**: Prefijos, comentarios, formato, agrupación
- **Interfaz moderna**: Diseño premium con animaciones y gradientes
- **Drag & Drop**: Arrastra y suelta archivos JSON
- **Descarga múltiple**: Descarga todos los formatos a la vez

## 🚀 Uso

1. **Abre `index.html`** en tu navegador
2. **Sube tu archivo JSON** de Figma (arrastra y suelta o haz clic para seleccionar)
3. **Selecciona los formatos** que necesitas
4. **Elige los tipos de tokens** a incluir
5. **Configura las opciones** (prefijo, comentarios, etc.)
6. **Haz clic en "Convertir JSON"**
7. **Descarga** los archivos generados

## 📋 Formatos Soportados

### Web
- **CSS Variables**: Variables CSS nativas (`--prefix-color-primary`)
- **SCSS**: Variables SCSS (`$prefix-color-primary`)
- **LESS**: Variables LESS (`@prefix-color-primary`)
- **JSON**: Formato JSON estándar
- **JavaScript**: Módulos ES6

### Mobile
- **iOS (Swift)**: Extensiones de UIColor
- **Android (XML)**: Resources XML
- **Flutter (Dart)**: Clases de Color

## 🎯 Estructura del JSON de Figma

El conversor espera un JSON con la siguiente estructura:

```json
{
  "TokenName": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [1, 0, 0],
      "alpha": 1,
      "hex": "#FF0000"
    },
    "$extensions": {
      "com.figma.variableId": "...",
      "com.figma.scopes": ["..."]
    }
  }
}
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (con variables CSS y animaciones)
- JavaScript (Vanilla, sin dependencias)
- Google Fonts (Inter)

## 📦 Instalación Local

No requiere instalación. Simplemente:

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

## 🎨 Personalización

Puedes personalizar:
- **Prefijo de tokens**: Por defecto `sds`, cámbialo a tu preferencia
- **Incluir comentarios**: Añade comentarios explicativos en el código
- **Formato de salida**: Código formateado o minificado
- **Agrupación**: Agrupa tokens por categoría

## 📝 Ejemplo de Uso

### Entrada (Figma JSON)
```json
{
  "Background": {
    "Default": {
      "$type": "color",
      "$value": {
        "hex": "#FFFFFF",
        "alpha": 1
      }
    }
  }
}
```

### Salida (CSS)
```css
:root {
  --sds-background-default: #FFFFFF;
}
```

### Salida (SCSS)
```scss
$sds-background-default: #FFFFFF;
```

### Salida (iOS Swift)
```swift
extension UIColor {
    static let backgroundDefault = UIColor(red: 1, green: 1, blue: 1, alpha: 1)
}
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una sugerencia:

1. Abre un issue
2. Crea un pull request
3. Comparte tus ideas

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como desees.

## 🙏 Créditos

Creado con ❤️ para diseñadores y desarrolladores que trabajan con Design Systems.

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.
