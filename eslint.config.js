import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config,
  ...actions,
  {
    ignores: ['packages/quick-pick-worker/test/GetJson.test.ts'],
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
]
