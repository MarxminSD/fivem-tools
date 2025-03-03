import { Input } from "@/components/ui/Input";
import useItemConfigStore, { AnimationData, Item, Vector3Data } from "@/stores/useItemConfigStore";

export default function AnimationDataSection({ id }: { id: string }) {
	const { items, updateItem } = useItemConfigStore();
	const item = items.find((i) => i.id === id);
	if (!item || item.isUsable === false) return null;

	const handleNumChange = (field: keyof Item, value: number) => {
		updateItem(id, {
			[field]: value,
		});
	};

	const handleStringChange = (field: keyof AnimationData, value: string) => {
		updateItem(id, {
			animationData: {
				...item.animationData,
				[field]: value,
			},
		});
	};

	const handleVectorChange = (vectorField: "modelPosition" | "modelRotation", component: keyof Vector3Data, value: string) => {
		const parsedValue = parseFloat(value);
		updateItem(id, {
			animationData: {
				...item.animationData,
				[vectorField]: {
					...item.animationData[vectorField],
					[component]: parsedValue,
				},
			},
		});
	};

	return (
		<div className="flex flex-col gap-4 px-12">
			<div className="flex h-[1px] w-full items-center bg-zinc-700"></div>

			{/* Animation Info */}
			<div className="grid grid-cols-[1fr_1fr_auto] gap-4">
				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Animation Dictionary</p>
					<Input
						value={item.animationData?.animationDict || ""}
						onChange={(e) => handleStringChange("animationDict", e.target.value)}
						placeholder="mp_player_inteat@burger"
					/>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Animation Clip</p>
					<Input
						value={item.animationData?.animationClip || ""}
						onChange={(e) => handleStringChange("animationClip", e.target.value)}
						placeholder="mp_player_int_eat_burger"
					/>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Consume Time (ms)</p>
					<Input placeholder="5000" value={item.useTime || ""} onChange={(e) => handleNumChange("useTime", Number(e.target.value))} />
				</div>
			</div>

			{/* Model Info */}
			<div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4">
				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Position (X, Y, Z)</p>
					<div className="grid grid-cols-3 gap-2">
						<Input
							placeholder="X"
							value={item.animationData?.modelPosition?.x || ""}
							onChange={(e) => handleVectorChange("modelPosition", "x", e.target.value)}
						/>
						<Input
							placeholder="Y"
							value={item.animationData?.modelPosition?.y || ""}
							onChange={(e) => handleVectorChange("modelPosition", "y", e.target.value)}
						/>
						<Input
							placeholder="Z"
							value={item.animationData?.modelPosition?.z || ""}
							onChange={(e) => handleVectorChange("modelPosition", "z", e.target.value)}
						/>
					</div>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Rotation (X, Y, Z)</p>
					<div className="grid grid-cols-3 gap-2">
						<Input
							placeholder="X"
							value={item.animationData?.modelRotation?.x || ""}
							onChange={(e) => handleVectorChange("modelRotation", "x", e.target.value)}
						/>
						<Input
							placeholder="Y"
							value={item.animationData?.modelRotation?.y || ""}
							onChange={(e) => handleVectorChange("modelRotation", "y", e.target.value)}
						/>
						<Input
							placeholder="Z"
							value={item.animationData?.modelRotation?.z || ""}
							onChange={(e) => handleVectorChange("modelRotation", "z", e.target.value)}
						/>
					</div>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Bone</p>
					<Input
						placeholder="60309"
						value={item.animationData?.modelBone || ""}
						onChange={(e) => handleStringChange("modelBone", e.target.value)}
					/>
				</div>

				<div className="flex flex-col items-start gap-1">
					<p className="text-nowrap">Model</p>
					<Input
						value={item.animationData?.modelHash || ""}
						onChange={(e) => handleStringChange("modelHash", e.target.value)}
						placeholder="snrbuns_burger"
					/>
				</div>
			</div>
		</div>
	);
}
