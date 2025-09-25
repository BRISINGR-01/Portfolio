import "../css/Emergency.css";

export default function Emergency() {
	const contacts = [
		{ name: "Mama", phone: "+359882201122" },
		{ name: "Tate", phone: "+359888824737" },
		{ name: "Kol", phone: "+36703066629" },
		{ name: "Max", phone: "+48609409779" },
		{ name: "Stas", phone: "+359878887840" },
		{ name: "Mario", phone: "+359878255762" },
		{ name: "Paulo", phone: "+31616111249" },
	];

	return (
		<div className="contacts-container">
			<h1>Emergency Contacts</h1>
			<ul className="contact-list">
				{contacts.map((contact, index) => (
					<li key={index} className="contact-item">
						<span>{contact.name}</span>
						<a href={`tel:${contact.phone}`}>{contact.phone}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
