import { AppInit } from "@/providers/app-init.provider";
import { AppProviders } from "@/providers/react-query.provider";
import { AppRouter } from "@/router/app.router";

export function App() {
	return (
		<AppProviders>
			<AppInit>
				<AppRouter />
			</AppInit>
		</AppProviders>
	);
}
