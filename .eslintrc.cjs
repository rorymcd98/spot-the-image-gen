module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-rules', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        indent: ['error', 2],
    },
    // plugins: ['prettier'],
};
