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
    "globals": {
        // "$": true,
    },
    "plugins": [
        "react"
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'webpack.config.js'
            }
        },
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "flowVersion": "0.53" // Flow version
        },
    },
    "rules": { "indent": [ "error", 4 ],
        "linebreak-style": [ "error", "unix" ],
        "quotes": [ "error", "single" ],
        'import/no-unresolved': [0, {commonjs: true, amd: true}],
        "semi": [ "error", "always" ],
        'max-len': ['error', { code: 150, ignoreComments: true, }],
        'no-alert': 'off',
        'no-console': 'off',
        "class-methods-use-this": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": [1, { ignore: ['signup'] }]
    },
};