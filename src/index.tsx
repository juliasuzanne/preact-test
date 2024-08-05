import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { Header } from './components/Header.js';
import { Home } from './pages/Home/index.js';
import { NotFound } from './pages/_404.js';
import { Profile } from './pages/Profile/index.js';
import {createContext} from 'preact';
import Restaurant from './pages/TS/Restaurant';
import Mixtape from './pages/React/Mixtape.js';
import {useContext} from 'preact/hooks';
import CrashingComponent from './pages/CrashingComponent.js';
import createAppState from './state.js';
import render from 'preact-render-to-string'
import Riddler from './pages/React/Riddler.js';
import ErrorBoundary from './pages/ErrorBoundary.js';
import MemoryGame from './pages/MemoryGame.js';

import './style.css';

export const AppState = createContext(createAppState); 

export function App() {
	return (
		<AppState.Provider value={createAppState}>
		<ErrorBoundary>
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/memory" component={MemoryGame} />
					<Route path="/" component={Home} />
					<Route path="/crash" component={CrashingComponent} />
					<Route path='/profile' component={Profile} />
					<Route path ='/riddles' component={Riddler} />
					<Route path ='/mixtape' component={Mixtape} />
					<Route default component={NotFound} />
					<Route path='/restaurants' component={Restaurant} />
				</Router>
			</main>
		</LocationProvider>
		</ErrorBoundary>
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
