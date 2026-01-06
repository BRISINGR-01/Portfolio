import Link from "./floating-ui/components/Link";

export default function DailyDevCard(props: { wide?: boolean }) {
	return (
		<div className="daily-dev-card">
			<Link url="https://app.daily.dev/alexpopov45">
				<img
					style={{ width: "100%" }}
					src={
						props.wide
							? "https://api.daily.dev/devcards/v2/0TqQvrR1PZz3yKqUAd7AR.png?type=wide&r=2fu"
							: "https://api.daily.dev/devcards/v2/0TqQvrR1PZz3yKqUAd7AR.png?type=default&r=itg"
					}
					alt="Alex Popov's Dev Card"
				/>
			</Link>
		</div>
	);
}
