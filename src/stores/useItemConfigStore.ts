import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Vector3Data = {
	x?: number;
	y?: number;
	z?: number;
};

export type AnimationData = {
	animationDict?: string;
	animationClip?: string;
	modelHash?: string;
	modelPosition: Vector3Data;
	modelRotation: Vector3Data;
	modelBone?: string;
};

export type Item = {
	id: string;
	isExpanded: boolean;
	name?: string;
	label?: string;
	description?: string;
	weight?: number;
	isUsable?: boolean;
	useTime?: string;
	animationData: AnimationData;
};

type ConfigItemStore = {
	activeModule: string;
	realTimeGeneration: boolean;
	items: Item[];
	addItem: () => void;
	removeItem: (id: string) => void;
	updateItem: (id: string, changes: Partial<Item>) => void;
	copyItem: (id: string) => void;
	setItems: (items: Item[]) => void;
};

const useItemConfigStore = create<ConfigItemStore>((set) => ({
	activeModule: "OxInventory",
	realTimeGeneration: false,
	items: [],
	addItem: () => {
		const newItem: Item = {
			id: uuidv4(),
			isExpanded: true,
			name: undefined,
			label: undefined,
			description: undefined,
			weight: undefined,
			isUsable: false,
			useTime: undefined,
			animationData: {
				animationDict: undefined,
				animationClip: undefined,
				modelHash: undefined,
				modelPosition: { x: undefined, y: undefined, z: undefined },
				modelRotation: { x: undefined, y: undefined, z: undefined },
				modelBone: undefined,
			},
		};
		set((state) => ({ items: [...state.items, newItem] }));
	},
	updateItem: (id: string, changes: Partial<Item>) =>
		set((state) => ({
			items: state.items.map((item) => (item.id === id ? { ...item, ...changes } : item)),
		})),
	removeItem: (id: string) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
	copyItem: (id: string) =>
		set((state) => {
			const item = state.items.find((i) => i.id === id);
			if (!item) return state;
			const newItem = { ...item, id: uuidv4(), isExpanded: true };
			return { items: [...state.items, newItem] };
		}),
	setItems: (items: Item[]) => set({ items }),
}));

export default useItemConfigStore;
