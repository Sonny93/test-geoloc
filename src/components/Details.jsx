import { useEffect, useState } from 'react';
import { fix } from '../utils/utils.js';
import LocationAddress from './LocationAddress';

const KEYS = [ 'latitude', 'longitude', 'accuracy', 'speed' ];
export default function Details({ coordonnees }) {    
    const [position, setPosition] = useState();
	const [address, setAddress] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const itemsNew = [];
        for (const key of KEYS) {
            if (coordonnees[key] !== null) {
                itemsNew.push({ 
                    key: capitalize(key), 
                    value: coordonnees[key] 
                });
            }
        }
        setItems(itemsNew);
        setPosition([
            coordonnees['latitude'],
            coordonnees['longitude']
        ]);
    }, [coordonnees]);

    return (<div className='container'>
        <div className='content'>
            {position && (
                <div className='field' style={{ transitionDelay: '.1s' }}>
                    <LocationAddress
                        position={position}
                        address={address}
                        setAddress={setAddress}
                    /> 
                </div>
            )}
            {items.map(({ key, value }, index) => (
                value ? (
                    <div className='field' style={{ transitionDelay: `.${index + 2}s` }}>
                        {key} <div className='value'>{fix(value)}</div>
                    </div>
                ) : ''
            ))}
        </div>
    </div>)
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);