export enum PATH {
	HOME = "/",
	ADMIN = "admin",
	CART = "cart",
	PRODUCTS = "products/",
	SINGLE_ITEM = "products/:id",
	MATRIX = "https://www.youtube.com/watch?v=r_O3k-RpV2c",
	ERROR = "*",
}

export enum ACTION {
	PRICE = "PRICE",
	COUNT = "COUNT",
}

// LocalStorage
export enum LS {
	LENGTH = "length",
	ALL_ITEMS = "allItems",
	SINGLE_ITEM = "singleItem",
}

export type T_Params = {
	param1: string;
	param2: string;
	param3: string;
	param4: string;
	param5?: string;
	param6?: string;
};

export type T_SingleItem = {
	id?: string;
	brand: string;
	model: string;
	price: number;
	count: number;
	discountPercent: number;
	isDiscounted: boolean;
	release: number | string;
	rating: number;
	src: string;
	alt: string;
};
export interface I_ProductsSlice {
	categories: string[];
	activeCategory: string;
	sortOptions: [string, string][];
	params: T_Params;
	storeItems: [] | T_SingleItem[];
	cartItems: [] | T_SingleItem[];
	isPending: boolean;
	currentItem: T_SingleItem;
}

export interface I_AdminSlice {
	isPending: boolean;
	isAdmin: boolean;
	login: string;
	password: string;
	loginValue: string;
	passwordValue: string;
	searchValue: string;
	allItems: [] | T_SingleItem[];
}
