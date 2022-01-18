const MAP_TILES_URL = "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}";
const SUBDOMAINS = ["mt0", "mt1", "mt2", "mt3"];

const GEOCODE_API_URL = "https://api-adresse.data.gouv.fr/reverse/";

function BuildGeoCodeRequest(position = null) {
	if (!GEOCODE_API_URL) return console.error('BuildGeoCodeRequest must receive GEOCODE_API_URL');
	if (!position) return console.error('BuildGeoCodeRequest must receive position arg');
	return `${GEOCODE_API_URL}?lon=${position?.[1]}&lat=${position?.[0]}`;
}

function fix(value) {
  	return value.toFixed(2);
}

export {
    BuildGeoCodeRequest,
    fix,
    MAP_TILES_URL,
    SUBDOMAINS,
    GEOCODE_API_URL
}