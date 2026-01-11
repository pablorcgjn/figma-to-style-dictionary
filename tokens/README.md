# Design Tokens

Esta carpeta contiene los design tokens convertidos en múltiples formatos.

## 📁 Estructura

```
tokens/
├── css/          # CSS Variables
├── scss/         # SCSS Variables
├── less/         # LESS Variables
├── json/         # JSON format
├── js/           # JavaScript/ES6 modules
├── ios/          # Swift (iOS)
├── android/      # XML (Android)
└── flutter/      # Dart (Flutter)
```

## 🎨 Uso por Plataforma

### CSS
```css
/* Import in your CSS file */
@import url('tokens/css/tokens.css');

/* Use the variables */
.button {
  background-color: var(--sds-color-background-brand-default);
  color: var(--sds-color-text-brand-on-brand);
}
```

### SCSS
```scss
// Import in your SCSS file
@import 'tokens/scss/tokens';

// Use the variables
.button {
  background-color: $sds-color-background-brand-default;
  color: $sds-color-text-brand-on-brand;
}
```

### JavaScript
```javascript
// Import in your JS file
import { tokens } from './tokens/js/tokens.js';

// Use the tokens
const Button = styled.button`
  background-color: ${tokens.colors.background.brand.default};
  color: ${tokens.colors.text.brand.onBrand};
`;
```

### iOS (Swift)
```swift
// Import in your Swift file
import UIKit

// Use the colors
view.backgroundColor = UIColor.backgroundBrandDefault
label.textColor = UIColor.textBrandOnBrand
```

### Android (XML)
```xml
<!-- Reference in your layout -->
<Button
    android:background="@color/background_brand_default"
    android:textColor="@color/text_brand_on_brand" />
```

### Flutter (Dart)
```dart
// Import in your Dart file
import 'tokens/flutter/tokens.dart';

// Use the colors
Container(
  color: DesignColors.backgroundBrandDefault,
  child: Text(
    'Hello',
    style: TextStyle(color: DesignColors.textBrandOnBrand),
  ),
)
```

## 🔄 Actualización

Los tokens se actualizan desde Figma. Ver [UPDATE_TOKENS.md](../UPDATE_TOKENS.md) para más información.

## 📝 Versionado

Cada actualización de tokens está versionada. Ver [CHANGELOG.md](../CHANGELOG.md) para el historial completo de cambios.
