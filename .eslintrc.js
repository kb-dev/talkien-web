module.exports = {
	env: {
		browser: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	extends: ['plugin:import/typescript'],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'import'],
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': ['error', { default: 'generic' }],
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/ban-types': 'error',
		'@typescript-eslint/class-name-casing': 'error',
		'@typescript-eslint/explicit-member-accessibility': [
			'off',
			{
				overrides: {
					constructors: 'off',
				},
			},
		],
		'@typescript-eslint/indent': ['off'],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-namespace': 'error',
		'@typescript-eslint/no-object-literal-type-assertion': 'off',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-triple-slash-reference': 'off',
		'@typescript-eslint/no-use-before-declare': 'off',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unified-signatures': 'error',
		'arrow-body-style': 'error',
		'arrow-parens': ['error', 'always'],
		complexity: 'off',
		'constructor-super': 'error',
		curly: 'error',
		'default-case': 'error',
		'dot-notation': 'error',
		'eol-last': 'error',
		'guard-for-in': 'error',
		'import/first': 'error',
		/**'import/order': [
			'error',
			{
				groups: [['builtin', 'external'], 'internal', 'parent', ['sibling', 'index']],
				'newlines-between': 'always',
			},
		],*/
		'max-classes-per-file': ['error', 1],
		'new-parens': 'error',
		'no-bitwise': 'off',
		'no-caller': 'error',
		'no-cond-assign': 'error',
		'no-console': 'error',
		'no-debugger': 'error',
		'no-duplicate-case': 'error',
		'no-empty': 'error',
		'no-empty-function': 'error',
		'no-extra-bind': 'error',
		'no-fallthrough': 'error',
		'no-invalid-this': 'off',
		'no-irregular-whitespace': 'error',
		'no-magic-numbers': ['error', { ignoreArrayIndexes: true, ignore: [-1, 0, 1] }],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-return-await': 'error',
		'no-sequences': 'error',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-throw-literal': 'error',
		'no-undef-init': 'error',
		'no-unsafe-finally': 'error',
		'no-unused-labels': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'one-var': 'off',
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
			},
		],
		'prefer-object-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		radix: 'error',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				asyncArrow: 'always',
				named: 'never',
			},
		],
		'use-isnan': 'error',
		'valid-typeof': 'off',
		yoda: 'error',
		'@typescript-eslint/tslint/config': [
			'error',
			{
				rulesDirectory: ['./node_modules/tslint-react/rules'],
				rules: {
					align: [true, 'parameters', 'statements', 'members'],
					deprecation: true,
					encoding: true,
					'import-spacing': true,
					'jsdoc-format': [true, 'check-multiline-start'],
					'jsx-boolean-value': true,
					'jsx-curly-spacing': [true, 'never'],
					'jsx-equals-spacing': [true, 'never'],
					'jsx-key': true,
					'jsx-no-bind': true,
					'jsx-no-lambda': true,
					'jsx-no-string-ref': true,
					'jsx-self-close': true,
					'max-line-length': [true, 100],
					'newline-before-return': true,
					'no-duplicate-imports': true,
					'no-duplicate-variable': true,
					'no-reference-import': true,
					'no-shadowed-variable': true,
					'no-trailing-whitespace': true,
					'no-unused-expression': true,
					'object-literal-sort-keys': true,
					'one-line': [
						true,
						'check-catch',
						'check-else',
						'check-finally',
						'check-open-brace',
						'check-whitespace',
					],
					'only-arrow-functions': [true, 'allow-declarations', 'allow-named-functions'],
					'prefer-method-signature': true,
					quotemark: [true, 'single', 'jsx-double', 'avoid-escape'],
					semicolon: [true, 'always', 'ignore-bound-class-methods'],
					'space-within-parens': [true, 0],
					'switch-final-break': true,
					'trailing-comma': [
						true,
						{
							multiline: 'always',
							singleline: 'never',
							esSpecCompliant: true,
						},
					],
					'triple-equals': true,
					'variable-name': [
						true,
						'ban-keywords',
						'check-format',
						'allow-pascal-case',
						'allow-leading-underscore',
					],
					whitespace: [
						true,
						'check-branch',
						'check-decl',
						'check-operator',
						'check-module',
						'check-separator',
						'check-rest-spread',
						'check-type',
						'check-typecast',
						'check-type-operator',
						'check-preblock',
					],
				},
			},
		],
	},
};
