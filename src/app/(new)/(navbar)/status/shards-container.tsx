"use client";

import { ReportProblem } from "@/components/icons/mdi/report-problem.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { getShardIdForGuildId } from "@/utils/get-shard-id-for-guild-id.ts";
import { isSnowflake } from "@/utils/is-snowflake.ts";
// import { prettySeconds } from "@/utils/pretty-seconds.ts";
import prettyMilliseconds from "pretty-ms";
import { useState } from "react";
import { type Shard, ShardDisplay } from "./shard.tsx";

export function ShardsContainer({ shards, totalShards }: ShardsContainerProps) {
	const [guildId, setGuildId] = useState("");

	const highlightedShard = guildId && isSnowflake(guildId) ? getShardIdForGuildId(guildId, totalShards) : null;

	return (
		<>
			{/* <Input
				className="w-full"
				id="serverId"
				placeholder="Enter a server id…"
				value={guildId}
				onChange={(event) => setGuildId(event.target.value)}
				maxLength={20}
			/> */}

			<Input
				id="serverId"
				placeholder="Enter a server id…"
				value={guildId}
				onChange={(event) => setGuildId(event.target.value)}
				maxLength={20}
			/>

			<div className="flex w-full flex-wrap items-center justify-center gap-x-[29px] gap-y-5">
				{shards?.length ? (
					<Table>
						<TableCaption>Shard Status Overview</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">ID</TableHead>
								<TableHead>Servers</TableHead>
								<TableHead>Members</TableHead>
								<TableHead>Uptime</TableHead>
								<TableHead className="text-right">Ping</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{/* <TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Credit Card</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow> */}
							{shards.map((shard) => (
								<TableRow key={shard.shardId} className={shard.shardId === highlightedShard ? "bg-dark-gray" : ""}>
									<TableCell className="font-medium">{shard.shardId}</TableCell>
									<TableCell>{shard.guilds.toLocaleString("en-GB")}</TableCell>
									<TableCell>{shard.members.toLocaleString("en-GB")}</TableCell>
									<TableCell>{prettyMilliseconds(shard.uptime / 1_000)}</TableCell>
									<TableCell className="text-right">{shard.ping}ms</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					// shards.map((shard) => (
					// 	<ShardDisplay key={`shard-${shard.shardId}`} {...shard} highlight={shard.shardId === highlightedShard} />
					// ))
				) : (
					<p className="flex items-center gap-2 font-bold text-xl">
						<ReportProblem className="text-yellow" />
						The bot is unreachable
					</p>
				)}
			</div>
		</>
	);
}

interface ShardsContainerProps {
	readonly shards: Shard[] | null;
	readonly totalShards: number;
}
