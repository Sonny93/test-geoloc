import { useEffect, useState } from 'react';

import './App.scss';
import 'toastr/build/toastr.css';

import Map from './components/Map';
import Details from './components/Details';

const GEOLOC_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 15000,
	maximumAge: 5000
}

export default function App() {
	const [coordonnees, setCoords] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator
				.geolocation
				.watchPosition(
					({ coords }) => setCoords(coords),
					(error) => setError(error),
					GEOLOC_OPTIONS
				);
		}
	}, [setCoords]);

	if (error) {
		console.error(error);
		return (
			<div className='App'>
				<h3>Impossible de récuperer votre position actuelle.</h3>
				<p>{error?.message || <i>Aucune précision</i>}</p>
			</div>
		);
	}

	if (!coordonnees) return <>Chargement</>;

	const { latitude, longitude, accuracy } = coordonnees;
	return (
		<div className='App'>
			<Details coordonnees={coordonnees} />
			<Map
				position={[latitude, longitude]}
				accuracy={accuracy}
				zoom={16}
			/>
		</div>
	);
}