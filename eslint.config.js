import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@stylistic/ts/semi': 'always',
    },
  },
)
