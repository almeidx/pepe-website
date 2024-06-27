import { Toggle } from "@/components/Toggle.tsx";
import { Text } from "@/components/dashboard/Text.tsx";

export function IncludeRoleRewards() {
	return (
		<div className="flex gap-2">
			<Text>If you want to include role rewards:</Text>

			<Toggle id="withRoleRewards" initialValue={false} />
		</div>
	);
}
