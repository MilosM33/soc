import { Link } from "react-router-dom";

export default function AdminStats() {
	return (
		<div>
			<a
				href={"https://dashboard.stripe.com/"}
				className="bg-secondary  text-white p-2 rounded-md"
				target="blank"
			>
				Stripe Dashboard
			</a>
		</div>
	);
}
