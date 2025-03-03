"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Upload, Download, Maximize2, Minimize2, Plus, CircleX } from "lucide-react";
import useItemConfigStore, { Item } from "@/stores/useItemConfigStore";
import ItemMapper from "./ItemMapper";
import { toast } from "sonner";

export default function ItemsInput() {
	const { addItem } = useItemConfigStore();

	function expandAll() {
		useItemConfigStore.setState((prev) => ({
			items: prev.items.map((item) => ({ ...item, isExpanded: true })),
		}));
	}

	function minimizeAll() {
		useItemConfigStore.setState((prev) => ({
			items: prev.items.map((item) => ({ ...item, isExpanded: false })),
		}));
	}

	function exportJson() {
		const json = JSON.stringify(useItemConfigStore.getState().items, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "items.json";
		link.click();
		toast(
			<div className="grid grid-cols-[auto_1fr] items-center gap-4">
				<Download className="size-8 text-blue-700" />
				<div className="flex flex-col">
					<span className="text-lg text-zinc-100">File Downloaded</span>
					<span className="text-sm text-zinc-400">
						Reimport this at any time using the <span className="font-bold text-blue-700">Import</span> button.
					</span>
				</div>
			</div>,
		);
	}

	function importJson() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "application/json";
		input.onchange = async (event) => {
			const target = event.target as HTMLInputElement;
			if (!target.files?.length) return;
			try {
				const json = await readFileAsJson(target.files[0]);
				if (Array.isArray(json) && json.every((item) => validateItem(item))) {
					useItemConfigStore.getState().setItems(json);
					toast("File Loaded Successfully", {});
				} else {
					throw new Error("Invalid file structure");
				}
			} catch (error) {
				console.error("Failed to load or parse JSON:", error);
				toast(
					<div className="grid grid-cols-[auto_1fr] items-center gap-4">
						<CircleX className="size-8 text-red-700" />
						<div className="flex flex-col">
							<span className="text-lg text-zinc-100">An Error Occurred</span>
							<span className="text-sm text-zinc-400">Please ensure you have selected a valid JSON file.</span>
						</div>
					</div>,
				);
			}
		};
		input.click();
	}

	function readFileAsJson(file: File): Promise<Item[]> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = () => {
				reader.abort();
				reject(new DOMException("Error reading input file."));
			};
			reader.onload = () => {
				try {
					const json = JSON.parse((reader.result as string) || "");
					resolve(json);
				} catch (error) {
					reject(error);
				}
			};
			reader.readAsText(file);
		});
	}

	function validateItem(item: any): item is Item {
		return "id" in item && "isExpanded" in item;
	}

	return (
		<div className="flex flex-1 flex-col gap-2">
			<div className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800 p-2">
				<div className="flex justify-between gap-2">
					<div className="flex gap-2">
						<Button onClick={addItem} className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
							<Plus className="size-8 text-green-500" />
							Add Item
						</Button>

						<Button onClick={expandAll} className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
							<Maximize2 className="size-8 text-zinc-300" />
							Expand
						</Button>

						<Button onClick={minimizeAll} className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
							<Minimize2 className="size-8 text-zinc-300" />
							Minimize
						</Button>
					</div>

					<div className="flex gap-2">
						<Button onClick={importJson} className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
							<Upload className="size-8 text-blue-500" />
							Import
						</Button>

						<Button onClick={exportJson} className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
							<Download className="size-8 text-blue-500" />
							Export
						</Button>
					</div>
				</div>

				<div className="h-0.5 w-full bg-zinc-700"></div>

				<ItemMapper />
			</div>
		</div>
	);
}
