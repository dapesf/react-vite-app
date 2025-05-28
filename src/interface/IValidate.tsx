interface ComponentMethod {
	[key: string]: boolean | number | ((prop: any, value: any) => boolean | Promise<boolean>) | any;
}

interface ComponentMessages {
	[key: string]: string;
}

interface ValidationContext {
	name: string;
	element?: HTMLInputElement | null;
	methods?: ComponentMethod;
	messages?: ComponentMessages;
}

interface Context {
	[key: string]: ValidationContext;
}

interface TaskResult {
	taskId: string;
	value: boolean;
}

export type {
	ComponentMethod
	, ComponentMessages
	, ValidationContext
	, Context
	, TaskResult
};