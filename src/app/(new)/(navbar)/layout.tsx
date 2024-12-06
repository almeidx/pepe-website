import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default function NavbarLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen w-full flex-col bg-lrk-background font-sans text-lrk-white selection:bg-lrk-primary selection:text-lrk-white">
			<div className="mx-auto max-w-7xl">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink>Link</NavigationMenuLink>
								<NavigationMenuLink>Link</NavigationMenuLink>
								<NavigationMenuLink>Link</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink>Link</NavigationMenuLink>
								<NavigationMenuLink>Link</NavigationMenuLink>
								<NavigationMenuLink>Link</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<main>{children}</main>
			</div>
		</div>
	);
}
