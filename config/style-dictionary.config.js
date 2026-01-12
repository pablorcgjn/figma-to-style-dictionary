export default {
    source: ['source-tokens/**/*.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'dist/css/',
            files: [{
                destination: 'tokens.css',
                format: 'css/variables',
                options: {
                    outputReferences: true
                }
            }]
        },
        scss: {
            transformGroup: 'scss',
            buildPath: 'dist/scss/',
            files: [{
                destination: 'tokens.scss',
                format: 'scss/variables',
                options: {
                    outputReferences: true
                }
            }]
        },
        less: {
            transformGroup: 'less',
            buildPath: 'dist/less/',
            files: [{
                destination: 'tokens.less',
                format: 'less/variables',
                options: {
                    outputReferences: true
                }
            }]
        },
        json: {
            transformGroup: 'js',
            buildPath: 'dist/json/',
            files: [{
                destination: 'tokens.json',
                format: 'json/nested'
            }]
        },
        js: {
            transformGroup: 'js',
            buildPath: 'dist/js/',
            files: [{
                destination: 'tokens.js',
                format: 'javascript/es6'
            }]
        },
        ios: {
            transformGroup: 'ios',
            buildPath: 'dist/ios/',
            files: [{
                destination: 'Colors.swift',
                format: 'ios-swift/class.swift',
                className: 'DesignTokens',
                options: {
                    outputReferences: false
                }
            }]
        },
        android: {
            transformGroup: 'android',
            buildPath: 'dist/android/',
            files: [{
                destination: 'colors.xml',
                format: 'android/resources',
                resourceType: 'color'
            }]
        }
    }
};
