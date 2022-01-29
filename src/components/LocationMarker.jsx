import toastr from 'toastr';
import {
	Popup,
	Circle,
	useMapEvents
} from 'react-leaflet';
import { fix } from '../utils/utils.js';

export default function LocationMarker({ position, accuracy }) {
	const map = useMapEvents({
		click: () => map.locate(),
		locationfound: (e) => {
			toastr.info('Vue centrée avec succès sur votre position');
			map.flyTo(e.latlng, map.getZoom());
		},
		locationerror: (error) => {
			console.warn(error);
			toastr.warning('Impossible de centrer la vue sur votre position acutelle');
		}
	});

	if (position) {
		return (
			<Circle center={position} pathOptions={{ color: 'lightblue' }} radius={accuracy}>
				<Popup>Précision d'environ {fix(accuracy)} mètre(s).</Popup>
				<Circle center={position} pathOptions={{ color: 'blue', stroke: true }} radius={5} />
			</Circle>
		);
	} else return <></>;
}