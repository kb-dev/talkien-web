export type Event<T = string> = {
	dataset?: { [name: string]: string };
	id?: string;
	// Use by radio button to invalidate others inputs with same id
	invalidateOthers?: boolean;
	name: string;
	value: T;
};
