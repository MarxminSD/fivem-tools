import { Button } from "@/components/ui/Button";
import useItemConfigStore from "@/stores/useItemConfigStore";
import { ChevronUp, Copy, Trash, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import MainDataSection from "./Sections/MainDataSection";
import AnimationDataSection from "./Sections/AnimationDataSection";
import { ScrollArea } from "@/components/ui/ScrollArea";

export default function ItemMapper() {
	const { items, removeItem, updateItem, copyItem } = useItemConfigStore();

	if (items.length === 0) {
		return null;
	}

	return (
		<ScrollArea className="h-full p-2">
			<div className="flex flex-col gap-2">
				{items.map((item) => (
					<div key={item.id} className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900 py-2">
						<div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-2">
							<div
								onClick={() => {
									updateItem(item.id, { isExpanded: !item.isExpanded });
								}}
								className="flex items-center gap-2 hover:cursor-pointer"
							>
								<div className="bg-transparent p-2 text-zinc-100 [&_svg]:size-5">
									<motion.div animate={{ rotate: item.isExpanded ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
										<ChevronUp className="h-3.5 w-3.5 text-zinc-300 transition-opacity duration-200" />
									</motion.div>
								</div>

								<p className="select-none text-nowrap text-lg font-bold">
									{item.label && item.label !== "" ? <span className="text-zinc-200">{item.label}</span> : null}
									{item.name && item.name !== "" ? (
										<span className="text-zinc-400">
											<span className="text-zinc-500"> | </span>
											{item.name}
										</span>
									) : null}
								</p>

								{!item.name || item.name == "" || !item.label || item.label == "" ? (
									<div className="flex select-none items-center gap-2 align-middle">
										<TriangleAlert className="size-4 align-middle text-amber-500" />
										<span className="text-sm text-zinc-300">Missing name or label - item will be skipped.</span>
									</div>
								) : null}
							</div>

							<Button
								onClick={() => {
									copyItem(item.id);
								}}
								className="bg-transparent p-2 transition-colors duration-200 hover:bg-zinc-800 [&_svg]:size-5"
							>
								<Copy className="text-zinc-300" />
							</Button>

							<Button
								onClick={() => {
									removeItem(item.id);
								}}
								className="bg-transparent p-2 transition-colors duration-200 hover:bg-zinc-800 [&_svg]:size-5"
							>
								<Trash className="text-red-600" />
							</Button>
						</div>
						<AnimatePresence>
							{item.isExpanded && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.1 }}
									className="flex flex-col gap-4 overflow-hidden px-2 pb-2"
								>
									<MainDataSection id={item.id} />
									{item.isUsable && <AnimationDataSection id={item.id} />}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
