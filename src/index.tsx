import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { Header } from './components/Header.js';
import { Home } from './pages/Home/index.js';
import { NotFound } from './pages/_404.js';
import { Profile } from './pages/Profile/index.js';
import {createContext} from 'preact';
import {useContext} from 'preact/hooks';
import createAppState from './state.js';

import './style.css';

export const AppState = createContext(createAppState); 

export function App() {
	return (
		<AppState.Provider value={createAppState}>

		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path='/profile' component={Profile} />
					<Route default component={NotFound} />

				</Router>
			</main>
		</LocationProvider>
		</AppState.Provider>

	);
}

if (typeof window !== 'undefined') {
	hydrate(
	<App />	
	, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
