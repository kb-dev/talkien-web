class Translator {
	private static instance: Translator;
	private language: string = '';
	private translations: object = {};

	private constructor() {
		let language = 'en';

		if (typeof window !== 'undefined' && localStorage) {
			language = localStorage.getItem('language') || 'en';
		}

		this.setLanguage(language);
	}

	public static getInstance(): Translator {
		if (!Translator.instance) {
			Translator.instance = new Translator();
		}

		return Translator.instance;
	}

	public get(str, ...args): string {
		const result = this.translations[str];

		if (!result) {
			return str;
		}

		if (!args.length) {
			return result;
		}

		let currentArg = 0;

		return result.replace('$-', () => {
			if (args[currentArg] !== undefined && args[currentArg] !== null) {
				return args[currentArg++];
			}

			return '';
		});
	}

	public setLanguage(language) {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('language', language);
		}

		this.language = language;
		this.translations = require(`./translations/${language}`).default;
	}

	public getLanguage(): string {
		return this.language;
	}

	public getAvailableLanguages(): Array<string> {
		return ['fr', 'en'];
	}
}

export default Translator.getInstance();
