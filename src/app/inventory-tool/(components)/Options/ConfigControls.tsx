"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import useOptionsStore from "@/stores/useOptionsStore";
import ConfigCombobox from "./ConfigCombobox";

export default function ConfigControls() {
	const { isLiveGenerateConfig, setIsLiveGenerateConfig } = useOptionsStore();

	return (
		<div className="flex w-full flex-col gap-4 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
			<h2 className="text-xl font-bold text-zinc-100">Options</h2>
			<ConfigCombobox />
			<div className="flex items-end gap-2" onClick={() => setIsLiveGenerateConfig(!isLiveGenerateConfig)}>
				<Checkbox className="mb-0.5" checked={isLiveGenerateConfig} />
				<label className="select-none text-nowrap hover:cursor-pointer">Generate Config Live</label>
			</div>
		</div>
	);
}
