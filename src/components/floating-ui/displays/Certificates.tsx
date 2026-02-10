import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { certificates } from "../../../content/content";
import type { Certificate, fn } from "../../../types";
import Frame from "../components/Frame";

function truncate(name: string) {
	if (name.length > 15) {
		return name.slice(0, 15) + "...";
	}

	return name;
}

export default function Certificates(props: { setGoBackCb: (cb?: fn) => void }) {
	const [displayGroup, setDisplayGroup] = useState<string | null>(null);

	useEffect(() => {
		props.setGoBackCb(displayGroup ? () => () => setDisplayGroup(null) : () => undefined);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [displayGroup]);

	return (
		<Stack className="my-3">
			{displayGroup && <h2 className="text-center">{displayGroup}</h2>}
			<List company={displayGroup} onSelect={setDisplayGroup} />
		</Stack>
	);
}

function List(props: { company: string | null; onSelect: (certificates: string) => void }) {
	const compCert: Certificate | undefined = props.company
		? certificates.find(({ company }) => props.company === company)
		: undefined;

	return (
		<Stack direction="horizontal" className="flex-wrap align-items-center justify-content-center" gap={4}>
			{compCert && (
				<Certificate
					name={compCert.name}
					hasSubCertificates={false}
					onSelect={() => {}}
					company=""
					ext={compCert.ext}
				/>
			)}
			{(compCert?.subCertificates ?? certificates).map(({ name, company, ext, subCertificates }, i) => (
				<motion.div
					key={name}
					initial={{ opacity: 0, x: -(i + 1) * 30 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 10 }}
				>
					<Certificate
						hasSubCertificates={!!subCertificates}
						name={name}
						onSelect={() => props.onSelect(company!)}
						company={company}
						ext={ext}
					/>
				</motion.div>
			))}
		</Stack>
	);
}

function Certificate(props: {
	name: string;
	company?: string;
	ext?: string;
	hasSubCertificates: boolean;
	onSelect: fn;
}) {
	return (
		<OverlayTrigger overlay={<Tooltip className="glow-text">{props.name}</Tooltip>}>
			<Stack className="flex-grow-0">
				<div
					style={{
						filter: props.hasSubCertificates ? "drop-shadow(2px 2px 0px gold)" : "",
					}}
					onClick={props.hasSubCertificates ? () => props.onSelect() : undefined}
				>
					<Frame
						notExpandable={!!props.hasSubCertificates}
						alt={truncate(props.name)}
						style={{
							height: "6em",
							width: "fit-content",
							background: "white",
						}}
						src={
							props.ext === "-"
								? "icons/other/certificate-detail.svg"
								: `public/images/certificates/${props.name}.${props.ext ?? "jpeg"}`
						}
						size={4}
					/>
				</div>
				<span className="mt-1 w-100 text-center">{truncate(props.name)}</span>
			</Stack>
		</OverlayTrigger>
	);
}
