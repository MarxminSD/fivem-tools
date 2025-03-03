import { create } from "zustand";

interface OptionsStore {
	isLiveGenerateConfig: boolean;
	setIsLiveGenerateConfig: (isLiveGenerateConfig: boolean) => void;
}

const useOptionsStore = create<OptionsStore>((set) => ({
	isLiveGenerateConfig: false,
	setIsLiveGenerateConfig: (isLiveGenerateConfig) => set({ isLiveGenerateConfig }),
}));

export default useOptionsStore;
