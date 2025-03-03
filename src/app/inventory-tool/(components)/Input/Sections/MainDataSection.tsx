import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import useItemConfigStore from "@/stores/useItemConfigStore";

export default function MainDataSection({ id }: { id: string }) {
	const { items, updateItem } = useItemConfigStore();

	const item = items.find((i) => i.id === id);
	if (!item) return null;

	return (
		<div className="mt-2 flex flex-col gap-4 px-12">
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Item Label</p>
					<Input
						type="text"
						value={item.label || ""}
						onChange={(e) => updateItem(id, { label: e.target.value })}
						placeholder="Snr. Double Burger"
					/>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Item Name</p>
					<Input
						type="text"
						value={item.name || ""}
						onChange={(e) => updateItem(id, { name: e.target.value })}
						placeholder="snr_burger_double"
					/>
				</div>
			</div>

			<div className="grid grid-cols-[1fr_auto] gap-4">
				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Description</p>
					<Input
						type="text"
						value={item.description || ""}
						onChange={(e) => updateItem(id, { description: e.target.value })}
						placeholder="The most scrumptious cheeseburger in existence!"
					/>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Weight</p>
					<Input
						type="number"
						value={item.weight || ""}
						onChange={(e) => updateItem(id, { weight: Number(e.target.value) })}
						placeholder="100"
					/>
				</div>
			</div>

			<div className="flex gap-4">
				<div className="flex items-end gap-2" onClick={() => updateItem(id, { isUsable: !item.isUsable })}>
					<Checkbox checked={item.isUsable} className="mb-0.5" />
					<label className="select-none text-nowrap hover:cursor-pointer">Has Animation</label>
				</div>
			</div>
		</div>
	);
}
