"use client";

import type { GuildInfo } from "@/app/guilds/page.tsx";
import fallbackAvatarImg from "@/assets/fallback-avatar.png";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { BOT_INVITE } from "@/shared-links.mjs";
import { guildIcon } from "@/utils/discord-cdn.ts";
import { isSnowflake } from "@/utils/is-snowflake.ts";
import { Send } from "@mui/icons-material";
import clsx from "clsx";
import { matchSorter } from "match-sorter";
import Link from "next/link";
import { useState } from "react";

export function DashboardGuildList({ guilds }: { readonly guilds: GuildInfo[] }) {
	const [term, setTerm] = useState("");

	const filteredGuilds = matchSorter(guilds, term, { keys: ["name", "id"] });
	const termGuild = term.length && isSnowflake(term) ? filteredGuilds.find((guild) => guild.id === term) : null;

	const filteredGuildHref = filteredGuilds.length === 1 ? guildHref(filteredGuilds[0]) : null;
	const termGuildHref = termGuild ? guildHref(termGuild) : null;
	const targetGuildHref = filteredGuildHref ?? termGuildHref;

	return (
		<>
			<div className="mt-12 flex items-center gap-4">
				<input
					type="text"
					placeholder="Enter a server name or id…"
					className="h-10 w-72 rounded-lg bg-light-gray px-4 py-3 shadow-sm md:w-96"
					value={term}
					onChange={(event) => setTerm(event.target.value)}
				/>

				<Link
					href={targetGuildHref ?? "/guilds"}
					className={clsx(
						"flex size-9 items-center justify-center rounded-lg bg-green-400",
						!targetGuildHref && "cursor-not-allowed bg-green-400/50",
					)}
				>
					<span className="sr-only">
						{targetGuildHref?.startsWith("https:") ? "Add Lurkr to the searched guild" : "Go to the searched guild"}
					</span>
					<Send className="size-7" />
				</Link>
			</div>

			<div className="my-7 flex max-w-2xl flex-wrap justify-center gap-12">
				{filteredGuilds.map((guild, idx) => (
					<Link
						className="group relative flex size-20 items-center justify-center rounded-lg border border-white/25 bg-[#1e1f22]"
						href={guildHref(guild)}
						key={guild.id}
						prefetch={false}
					>
						<div
							className="-left-11 -top-14 invisible absolute z-50 w-40 rounded-lg bg-darker px-3 py-2 text-white shadow-md outline outline-1 outline-white group-focus-within:visible group-hover:visible"
							role="tooltip"
						>
							<p className="truncate text-center">{guild.name}</p>

							<div className="-bottom-1.5 -translate-x-1/2 absolute left-1/2 size-3 rotate-45 bg-darker shadow-md [box-shadow:0_-1px_0_#fff_inset,-1px_0_0_#fff_inset]" />
						</div>

						<ImageWithFallback
							alt={`${guild.name} server icon`}
							className="size-[75px] rounded-full"
							height={75}
							src={guildIcon(guild.id, guild.icon)}
							width={75}
							fallback={fallbackAvatarImg}
							unoptimized={Boolean(guild.icon)}
							priority={idx < 25}
						/>
					</Link>
				))}
			</div>
		</>
	);
}

function guildHref(guild: GuildInfo | undefined) {
	if (guild) {
		if (guild.botIn) {
			return `/guilds/${guild.id}`;
		}

		const invite = new URL(BOT_INVITE);
		invite.searchParams.set("guild_id", guild.id);
		return invite.toString();
	}

	return BOT_INVITE;
}
