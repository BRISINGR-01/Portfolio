import { useState } from "react";
import { Col, Container, ListGroup, Modal, Nav, Row } from "react-bootstrap";

export default function Menu() {
	const [show, setShow] = useState(false);

	return (
		<Modal size="lg" centered show={show} onHide={() => setShow(false)}>
			<Modal.Body className="menu-body">
				<Container fluid>
					<nav className="holo-wrapper rounded-2xl p-4 w-full max-w-md">
						<div className="holo-panel rounded-lg p-3">
							<div className="holo-header flex items-center justify-between mb-3">
								<div className="text-sm tracking-widest uppercase">Star Fleet</div>
								<div className="text-xs opacity-70">v. 3.4</div>
							</div>

							<Nav className="flex-col gap-1">
								{[{ label: "Dashboard" }, { label: "Missions" }, { label: "Crew" }, { label: "Settings" }].map(
									(it, idx) => (
										<Nav.Item key={idx}>
											<Nav.Link href="#" className="holo-item flex items-center justify-between">
												<span className="flex items-center gap-3">
													<span className="holo-dot" aria-hidden />
													<span>{it.label}</span>
												</span>
												<span className="text-xs opacity-60">▶</span>
											</Nav.Link>
										</Nav.Item>
									)
								)}
							</Nav>
						</div>
					</nav>
					<Row>
						<Col md={2} className=" d-flex flex-column align-items-center">
							<ListGroup>
								<ListGroup.Item>Internships and big projects</ListGroup.Item>
								<ListGroup.Item>Education</ListGroup.Item>
								<ListGroup.Item>Areas</ListGroup.Item>
								<ListGroup.Item>Technologies</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={10} className="p-4">
							<h2>🪐 Sci-Fi Hologram Interface</h2>
							<p>Welcome to the command console. This area displays live data streams, mission info, and controls.</p>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
		</Modal>
	);
}
