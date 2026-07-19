import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'
import recommendedVirtualDom from '@lvce-editor/eslint-plugin-virtual-dom'

export default [
  ...config,
  ...recommendedVirtualDom,
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
      '@typescript-eslint/only-throw-error': 'off',
    },
  },
  {
    files: [
      'packages/quick-pick-worker/src/parts/GetQuickPickItemVirtualDom/GetQuickPickItemVirtualDom.ts',
      'packages/quick-pick-worker/src/parts/GetQuickPickNoResultsVirtualDom/GetQuickPickNoResultsVirtualDom.ts',
    ],
    rules: {
      'virtual-dom/valid-child-count': 'off',
    },
  },
  {
    files: ['packages/quick-pick-worker/test/**/*.ts'],
    rules: {
      'virtual-dom/no-inline-event-handlers': 'off',
      'virtual-dom/prefer-constants': 'off',
      'virtual-dom/prefer-merge-class-names': 'off',
    },
  },
]
