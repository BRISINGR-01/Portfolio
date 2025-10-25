import { useEffect, useState } from "react";

export default function Delay(props: { children: React.JSX.Element | React.JSX.Element[]; time: number }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setShow(true), props.time * 1000);

		return () => clearTimeout(t);
	});

	return show ? props.children : <></>;
}
