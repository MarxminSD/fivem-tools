"use client";

import useItemConfigStore from "@/stores/useItemConfigStore";
import { generateOxInventoryConfig } from "./Modules/OxInventory";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Copy, Download } from "lucide-react";
import syntaxStyles from "./Theme";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface CustomStyle {
	[key: string]: React.CSSProperties;
}

export default function ConfigRenderer() {
	const items = useItemConfigStore((state) => state.items);

	const configString = useMemo(() => {
		const itemConfigs = items.map((item) => generateOxInventoryConfig(item)).join("");
		return `${itemConfigs}`;
	}, [items]);

	return (
		<div className="flex h-full flex-col gap-2 overflow-y-hidden">
			<div className="flex h-full flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-2">
				<div className="mb-2 flex justify-end gap-2">
					<Button className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
						<Copy className="size-8 text-zinc-300" />
						Copy
					</Button>
					<Button className="text-md w-fit bg-zinc-900 text-zinc-100 hover:bg-zinc-900/80 [&_svg]:size-5">
						<Download className="size-8 text-blue-500" />
						Download
					</Button>
				</div>

				<div className="h-0.5 w-full bg-zinc-700"></div>

				<ScrollArea className="h-full p-2">
					<SyntaxHighlighter
						language="lua"
						style={syntaxStyles as CustomStyle}
						wrapLines={true} // Make sure this is working as expected
						lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
						customStyle={{ margin: 0, padding: 0, background: "transparent", overflowWrap: "break-word" }}
					>
						{configString}
					</SyntaxHighlighter>
				</ScrollArea>
			</div>
		</div>
	);
}
