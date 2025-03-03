"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

const resources = [
	{
		value: "ox_inventory",
		label: "Ox Inventory",
	},
	{
		value: "qb_core",
		label: "QB Core",
	},
	{
		value: "jim_consumables",
		label: "Jim Consumables",
	},
];

export default function ConfigCombobox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role="combobox"
					aria-expanded={open}
					className="w-[250px] justify-between border border-zinc-700 bg-zinc-800 hover:bg-zinc-800/80"
				>
					{value ? resources.find((resources) => resources.value === value)?.label : "Select resource..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[250px] p-0">
				<Command>
					<CommandInput placeholder="Search resources..." />
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{resources.map((resources) => (
								<CommandItem
									key={resources.value}
									value={resources.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{resources.label}
									<Check className={cn("ml-auto", value === resources.value ? "opacity-100" : "opacity-0")} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
