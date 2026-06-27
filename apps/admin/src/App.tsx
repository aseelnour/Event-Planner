import { AppProviders } from "@/providers/react-query.provider";
import { AppInit } from "@/providers/app-init.provider";
import { AppRouter } from "@/router/app.router";

function App() {
	return (
		<AppProviders>
			<AppInit>
				<AppRouter />
			</AppInit>
		</AppProviders>
	);
}

export default App;
