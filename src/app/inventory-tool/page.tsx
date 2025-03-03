import ItemManager from "./(components)/Input/ItemManager";
import ConfigControls from "./(components)/Options/ConfigControls";
import ConfigRenderer from "./(components)/Output/ConfigRenderer";

export default function InventoryPage() {
	return (
		<div className="container mx-auto flex h-full flex-1 flex-col gap-4 p-4 lg:flex-row">
			<ItemManager />
			<div className="flex flex-col gap-4 lg:w-2/5">
				<ConfigControls />
				<ConfigRenderer />
			</div>
		</div>
	);
}
