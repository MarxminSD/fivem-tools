import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
	return (
		<div className="container mx-auto flex flex-1 flex-col p-4">
			<main className="flex flex-col items-center gap-4">
				<h1 className="text-center text-4xl font-bold text-foreground">Config Creator</h1>
				<p className="text-center text-foreground-muted">A tool for developers and server owners to easily create config file entries.</p>

				<Link href={"/inventory-tool"}>
					<Button size={"lg"}>Get Started</Button>
				</Link>
			</main>
		</div>
	);
}
