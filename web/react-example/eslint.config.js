import reactHooks from 'eslint-plugin-react-hooks'

module.exports = {
  extends: '../../eslint.config.js',
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
  },
};
