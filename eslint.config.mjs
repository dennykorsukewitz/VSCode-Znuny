import eslint from '@eslint/js';
import nPlugin from 'eslint-plugin-n';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            n: nPlugin,
        },
        rules: {
            curly: 'warn',
            'n/no-missing-import': [
                'error',
                {
                    allowModules: [
                        'vscode',
                        '@vscode/test-electron',
                        'mocha',
                        'xpath',
                        'xmldom',
                    ],
                    tryExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                },
            ],
        },
    }
);
