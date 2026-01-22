import { useEffect, useState } from "react";

export default function Delay(props: { children: React.ReactNode; time: number }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setShow(true), props.time * 1000);

		return () => clearTimeout(t);
	}, [props]);

	return show ? props.children : <></>;
}
