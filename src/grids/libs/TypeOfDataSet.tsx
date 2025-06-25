interface IChangeSet {
	Data: any;
	Delete: (index: string | undefined) => void;
	Update: (index: string | undefined, dataProp: string | undefined, value: string | undefined) => void;
	Find: (index: string | undefined) => object;
	Initialization: () => void;
}

export type { IChangeSet }