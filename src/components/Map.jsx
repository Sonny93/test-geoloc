import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker.jsx';
import { MAP_TILES_URL, SUBDOMAINS } from '../utils/utils.js';

export default function Map({ position, accuracy, zoom }) {
    return (
        <MapContainer center={position} zoom={zoom} className='map'>
            <TileLayer url={MAP_TILES_URL} subdomains={SUBDOMAINS} />
            <LocationMarker position={position} accuracy={accuracy} />
        </MapContainer>
    )
}