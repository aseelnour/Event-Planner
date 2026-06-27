import { AppProviders } from "@/providers/react-query.provider";
import { AppRouter } from "@/router/app.router";

export function App() {
	return (
		<AppProviders>
			<AppRouter />
		</AppProviders>
	);
}
