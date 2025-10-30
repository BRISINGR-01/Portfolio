export default function G_Card(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div
			{...props}
			style={{ ...props.style }}
			className={`g-card text-light p-3 position-absolute align-self-center ${props.className}`}
		>
			{props.children}
		</div>
	);
}
