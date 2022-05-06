module.exports = {
    env: {
        node: true,
        mocha: true
    },
    extends: [
        'plugin:mocha/recommended',
        'semistandard'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'mocha/no-skipped-tests': 'off'
    }
};
