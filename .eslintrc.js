module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint-config-airbnb-base", "plugin:react/recommended"],
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "webpack.config.js"
            }
        }
    },
    "globals": {
        // "$": true,
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        'max-len': ['error', {
            code: 140,
            ignoreComments: true,
        }],
        "prefer-destructuring": ["error", {
            "array": true,
            "object": false
        }, {
            "enforceForRenamedProperties": false
        }],
        "space-before-function-paren": ["error", "never"],
        'no-alert': 'off',
        'no-console': 'off',
        "class-methods-use-this": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    }
};