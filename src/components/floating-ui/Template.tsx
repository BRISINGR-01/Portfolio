import type { Experience, fn } from "../../types";
import HologramDisplay from "./components/HologramDisplay";
import IconFrame from "./IconFrame";

export default function Template({
	data,
	...props
}: {
	data: Experience;
	imageCaption?: React.JSX.Element;
	close: fn;
}) {
	return (
		<HologramDisplay onClick={props.close}>
			<div className="w-100 h-100 d-flex">
				<div className="d-flex h-100 flex-column col-2">
					<IconFrame id={data.id} img={data.altIcon ?? data.icon} />

					<div className="mt-5 d-flex w-100 justify-content-between flex-nowrap gap-3">
						<span> Start: </span>
						{data.timespan[0]}
					</div>
					<div className="d-flex w-100 justify-content-between flex-nowrap gap-3">
						<span> End: </span>
						{data.timespan[1]}
					</div>
				</div>
				<div className="flex-grow-1 p-3">
					<h2 className="text-center">{data.title}</h2>
					<span className="fs-6">Description</span>
					<br />
					<span>{data.description}</span>
				</div>
			</div>
		</HologramDisplay>
	);
}
