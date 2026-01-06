export default function Link(props: React.PropsWithChildren & { url: string } & React.HTMLProps<HTMLAnchorElement>) {
	return (
		<a href={props.url} {...props} target="_blank">
			{props.children}
		</a>
	);
}
