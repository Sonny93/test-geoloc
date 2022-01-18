import { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	Circle,
	useMapEvents
} from "react-leaflet";
import toastr from "toastr";

import "./App.scss";
import "toastr/build/toastr.css";

import {
	BuildGeoCodeRequest,
	fix,
	MAP_TILES_URL,
	SUBDOMAINS
} from "./utils/utils.js";

export default function App() {
	const [coordonnees, setCoords] = useState(null);
	const [error, setError] = useState(null);
	const [address, setAddress] = useState(null);

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.watchPosition(
				({ coords }) => setCoords(coords),
				(error) => setError(error),
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
			);
		}
	}, [setCoords]);

	if (error) {
		console.error(error);
		return (
			<div className="App">
				<h3>Impossible de récuperer votre position actuelle.</h3>
				<p>{error?.message || <i>Aucune précision</i>}</p>
			</div>
		);
	}

	if (!coordonnees) return <>Chargement</>;

	const { latitude, longitude, accuracy, speed } = coordonnees;
	const position = [latitude, longitude];

	return (
		<div className="App">
			<div className="container">
				<div className="content">
					{latitude && (
						<div className="field" style={{ transitionDelay: ".1s" }}>
							Latitude <div className="value">{fix(latitude)}</div>
						</div>
					)}
					{longitude && (
						<div className="field" style={{ transitionDelay: ".2s" }}>
							Longitude <div className="value">{fix(longitude)}</div>
						</div>
					)}
					{accuracy && (
						<div className="field" style={{ transitionDelay: ".3s" }}>
							Précision (en mètre) <div className="value">{fix(accuracy)}</div>
						</div>
					)}
					{speed && (
						<div className="field" style={{ transitionDelay: ".4s" }}>
							Vitesse de déplacement <div className="value">{fix(speed)}</div>
						</div>
					)}
					<LocationAddress
						position={position}
						address={address}
						setAddress={setAddress}
					/>
				</div>
			</div>
			<MapContainer center={position} zoom={16} className="map">
				<TileLayer url={MAP_TILES_URL} subdomains={SUBDOMAINS} />
				<LocationMarker position={position} accuracy={accuracy} />
			</MapContainer>
		</div>
	);
}

function LocationMarker({ position, accuracy }) {
	const map = useMapEvents({
		click: () => map.locate(),
		locationfound: (e) => {
			toastr.info("Vue centrée avec succès sur votre position");
			map.flyTo(e.latlng, map.getZoom());
		},
		locationerror: (error) => {
			console.warn(error);
			toastr.warning("Impossible de centrer la vue sur votre position acutelle");
		}
	});

	if (position) {
		return (
			<Circle center={position} pathOptions={{ color: "lightblue" }} radius={accuracy}>
				<Popup>Précision d'environ {fix(accuracy)} mètre(s).</Popup>
				<Circle center={position} pathOptions={{ color: "blue", stroke: true }} radius={5} />
			</Circle>
		);
	} else return <></>;
}

function LocationAddress({ position, address, setAddress }) {
	useEffect(() => {
		async function GetAddress() {
			const URL = BuildGeoCodeRequest(position);
			const { features } = await fetch(URL).then((response) => response.json());
			const { label } = features[0]?.properties;

			setAddress(label);
		}
		GetAddress();
	}, [position, setAddress]);

	return (
		<div className="field" style={{ transitionDelay: ".4s" }}>
			Emplacement <div className="value">{address}</div>
		</div>
	)
}

