import Link from "next/link";

export default function Header() {
	return (
		<nav className="flex h-16 w-full items-center border-b border-zinc-800 bg-zinc-900">
			<div className="container mx-auto flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/" className="text-3xl font-bold text-zinc-100">
						FiveM Tools
					</Link>
				</div>

				<div className="flex items-center gap-6">
					<Link href="/tools" className="text-xl font-semibold text-zinc-100 transition-colors duration-200 hover:text-zinc-400">
						Tools
					</Link>
					<Link
						href="https://github.com/MarxminSD/fivem-tools"
						target="_blank"
						className="text-xl font-semibold text-zinc-100 transition-colors duration-200 hover:text-zinc-400"
						rel="noopener noreferrer"
					>
						Contribute
					</Link>
				</div>
			</div>
		</nav>
	);
}
