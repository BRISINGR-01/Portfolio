import { Stack } from "react-bootstrap";
import { COLOR_PALETTE, TRANSITION } from "../../../../constants";
import FadeAnim from "../FadeAnim";

export default function GalleryNav({
	onSelect,
	nrOfPages,
	currentPage,
}: {
	onSelect: (i: number) => void;
	nrOfPages: number;
	currentPage: number;
}) {
	return (
		<FadeAnim
			animate={{
				opacity: 1,
				transition: { ...TRANSITION, delay: 0.3 },
			}}
		>
			<Stack
				direction="horizontal"
				gap={2}
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					bottom: "1.5em",
					background: "linear-gradient(90deg,#000000A0 0%, #083b6480 50%, #000000A0 100%)",
					boxShadow: "0px 0px 10px 0px " + COLOR_PALETTE.PRIMARY,
					borderRadius: 12,
				}}
				className="position-absolute px-2 justify-content-center z-2"
			>
				<div
					className="pointer navArrow"
					onClick={() => onSelect(currentPage === 0 ? nrOfPages - 1 : currentPage - 1)}
					style={{ color: COLOR_PALETTE.PRIMARY }}
				>
					‹
				</div>

				<Stack direction="horizontal">
					{Array.from({ length: nrOfPages }).map((_, i) => (
						<div
							key={i}
							onClick={() => onSelect(i)}
							className="pointer"
							style={{
								padding: "0 8px",
							}}
						>
							<div
								style={{
									filter: `drop-shadow(0 0 6px ${COLOR_PALETTE.PRIMARY}) 
								drop-shadow(0 0 12px ${COLOR_PALETTE.PRIMARY})`,
									opacity: i === currentPage ? 0.7 : 0.4,
									transform: i === currentPage ? "scale(1.2)" : "scale(1)",
									width: 8,
									height: 8,
									borderRadius: "50%",
									background: COLOR_PALETTE.PRIMARY,
								}}
							/>
						</div>
					))}
				</Stack>

				<div
					className="pointer navArrow"
					onClick={() => onSelect(currentPage === nrOfPages - 1 ? 0 : currentPage + 1)}
					style={{ color: COLOR_PALETTE.PRIMARY }}
				>
					›
				</div>
			</Stack>
		</FadeAnim>
	);
}
