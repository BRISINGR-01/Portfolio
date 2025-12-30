import { useEffect, useState } from "react";
import { Col, ListGroup, Row, Stack } from "react-bootstrap";
import { fontys } from "../../../content";
import "../../../css/fontys.css";
import type { fn, Semester } from "../../../types";
import IconFrame from "../IconFrame";

export default function Fontys(props: { setGoBackCb: (cb: fn | null) => void }) {
	const [showSem, setShowSem] = useState<Semester | null>();
	useEffect(() => {
		if (showSem) {
			props.setGoBackCb(() => () => setShowSem(null));
		} else {
			props.setGoBackCb(null);
		}
	}, [showSem]);

	if (showSem) {
		return <div>{showSem.description}</div>;
	}

	return (
		<Stack className="position-relative pb-5 p-4" gap={4}>
			<Row>
				<Col xs={3} sm={2}>
					<IconFrame id="fontys" img={fontys.img} />
				</Col>

				<Col xs={9} className="mt-3">
					{fontys.description}
				</Col>
			</Row>

			<SemestersList onSelect={setShowSem} />
		</Stack>
	);
}

function SemestersList(props: { onSelect: (sem: Semester) => void }) {
	return (
		<ListGroup>
			{fontys.semesters.map((sem, i) => (
				<ListGroup.Item key={i} className="holo-item pointer" onClick={() => props.onSelect(sem)}>
					<span className="holo-title glow-text px-3">Semester {i + 1}</span>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
