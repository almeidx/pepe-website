import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Toggle from "../form/Toggle";

interface HeaderProps {
	description: string;
	openMenu(): void;
	title: string;
}

type HeaderWithToggleProps = HeaderProps & {
	id: string;
	initialValue: boolean;
	onChange(value: boolean): unknown;
	openMenu(): void;
};

export default function Header(props: HeaderProps | HeaderWithToggleProps) {
	const [enabled, setEnabled] = useState<boolean>("initialValue" in props && props.initialValue);

	return (
		<>
			<BiArrowBack
				// eslint-disable-next-line @typescript-eslint/unbound-method
				onClick={props.openMenu}
				className="z-[99999] mb-4 ml-4 inline-block h-6 w-6 cursor-pointer text-white sm:hidden"
			/>
			<div className="mx-4 flex justify-between">
				<h1 className="text-white">{props.title}</h1>

				{"initialValue" in props && (
					<div className="flex flex-row items-center gap-x-3">
						<label className="text-white" htmlFor={props.id}>
							{enabled ? "Enabled" : "Disabled"}
						</label>
						<Toggle
							id={props.id}
							initialValue={props.initialValue}
							size="small"
							onChange={(state) => {
								setEnabled(state);
								props.onChange(state);
							}}
						/>
					</div>
				)}
			</div>

			<p className="my-3 mx-4 font-light text-gray-400">{props.description}</p>
		</>
	);
}
