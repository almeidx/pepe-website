"use client";

import ms from "@almeidx/ms";
import { useCallback, useMemo, useState } from "react";
import Input from "@/form/Input";
import Message from "~/components/Message";
import Tooltip from "~/components/Tooltip";
import { parseMultiplier } from "~/utils/common";
import { getRequiredXp } from "~/utils/constants";

const averageXpPerMessage = (40 + 15) / 2;
const timePerMessage = ms("1m20s");

export function Calculator() {
	const [level, setLevel] = useState("");
	const [currentLevel, setCurrentLevel] = useState("");
	const [multiplier, setMultiplier] = useState("");

	const multiplierValue = useMemo(() => parseMultiplier(multiplier), [multiplier]);
	const requiredXp = useMemo(
		() => getRequiredXp(Number.parseInt(level, 10)) - getRequiredXp(Number.parseInt(currentLevel, 10) || 0),
		[level, currentLevel],
	);

	const calculateAmountOfMessages = useCallback(
		() => Math.ceil(requiredXp / (averageXpPerMessage * (multiplierValue ?? 1))),
		[requiredXp, multiplierValue],
	);

	const calculateTime = useCallback(
		() => Math.ceil(calculateAmountOfMessages() * timePerMessage),
		[calculateAmountOfMessages],
	);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row">
				<Input
					id="level"
					initialValue=""
					maxLength={3}
					onChange={(text) => setLevel(text)}
					placeholder="Enter the desired level"
				/>

				<Input
					id="initialLevel"
					initialValue=""
					maxLength={3}
					onChange={(text) => setCurrentLevel(text)}
					placeholder="Enter the current level"
				/>

				<Input
					id="multiplier"
					initialValue=""
					maxLength={5}
					onChange={(text) => setMultiplier(text)}
					placeholder="Enter an XP multiplier"
				/>
			</div>

			{(requiredXp <= 0 && (
				<Message message="The current level you inputted is bigger than or equal to the level you want to achieve." />
			)) ||
				(multiplier !== "" && !multiplierValue && <Message message="The multiplier value you inputted is invalid." />)}

			{level && requiredXp > 0 && (!multiplier || multiplierValue) && (
				<div className="grid grid-rows-3 gap-3 sm:grid-cols-3 sm:grid-rows-none">
					<div className="flex flex-col gap-2 rounded-md bg-discord-not-quite-black py-3 px-4">
						<div className="flex flex-row items-center justify-between gap-2">
							<span className="text-gray-200">Approximate Messages</span>
							<Tooltip text="The amount of messages you need to write into a valid leveling enabled channel assuming all of your messages will be counted as XP gain, and assuming your XP gain is a perfect average between the lowest gain possible and the highest gain possible" />
						</div>
						<p className="text-center font-display text-4xl font-bold text-gray-200">
							{calculateAmountOfMessages().toLocaleString("en")}
						</p>
					</div>

					<div className="flex flex-col gap-2 rounded-md bg-discord-not-quite-black py-3 px-4">
						<div className="flex flex-row items-center justify-between gap-2">
							<span className="text-gray-200">Estimated Time</span>
							<Tooltip text="The time it would take of constant chatting to reach this level, assuming you send a message every 1 minute and 20 seconds, and assuming all messages are counted as XP gain." />
						</div>
						<p className="text-center font-display text-4xl font-bold text-gray-200">{ms(calculateTime())}</p>
					</div>

					<div className="flex flex-col gap-2 rounded-md bg-discord-not-quite-black py-3 px-4">
						<div className="flex flex-row items-center justify-between gap-2">
							<span className="text-gray-200">XP Required</span>
							<Tooltip text="The total amount of XP needed to get to this level. The XP to Level conversion is a fixed constant." />
						</div>
						<p className="text-center font-display text-4xl font-bold text-gray-200">
							{Math.ceil(requiredXp).toLocaleString("en")}
						</p>
					</div>
				</div>
			)}
		</>
	);
}
