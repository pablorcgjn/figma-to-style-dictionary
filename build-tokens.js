#!/usr/bin/env node

import StyleDictionary from 'style-dictionary';
import config from './config/style-dictionary.config.js';

console.log('🎨 Building design tokens with Style Dictionary v5...\n');

// Style Dictionary v5 API
const sd = new StyleDictionary(config);

await sd.buildAllPlatforms();

console.log('\n✅ Build complete!');
console.log('\n📁 Generated files:');
console.log('   - dist/css/tokens.css');
console.log('   - dist/scss/tokens.scss');
console.log('   - dist/less/tokens.less');
console.log('   - dist/json/tokens.json');
console.log('   - dist/js/tokens.js');
console.log('   - dist/ios/Colors.swift');
console.log('   - dist/android/colors.xml');
