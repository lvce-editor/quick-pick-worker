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
      '@typescript-eslint/only-throw-error': 'off',
      'e2e/no-inline-nth-in-expect': 'off',
      'sonarjs/no-hardcoded-ip': 'off',
      'sonarjs/no-identical-expressions': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/no-undefined-argument': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
      'unicorn/no-incorrect-template-string-interpolation': 'off',
      'unicorn/no-nonstandard-builtin-properties': 'off',
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/no-unnecessary-splice': 'off',
      'unicorn/operator-assignment': 'off',
      'unicorn/prefer-hoisting-branch-code': 'off',
      'unicorn/prefer-minimal-ternary': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-number-is-safe-integer': 'off',
    },
  },
]
