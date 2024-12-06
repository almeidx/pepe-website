"use client";

import { MessageCounts } from "@/app/(old)/levels/[entry]/me/message-counts";
import { ParentSize } from "@visx/responsive";

export function GraphContainer({ data }: { data: any }) {
	return (
		<ParentSize debounceTime={10}>
			{({ width, height }) => <MessageCounts width={width} height={height} data={data} />}
		</ParentSize>
	);
}
