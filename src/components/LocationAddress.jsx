import { useEffect } from 'react';
import { BuildGeoCodeRequest } from '../utils/utils.js';

export default function LocationAddress({ position, address, setAddress }) {
	useEffect(() => {
		async function GetAddress() {
			const URL = BuildGeoCodeRequest(position);
			const { features } = await fetch(URL).then((response) => response.json());
			const { label } = features[0]?.properties;

			setAddress(label);
		}
		GetAddress();
	}, [position, setAddress]);

	return <>Emplacement <div className='value'>{address}</div></>
}