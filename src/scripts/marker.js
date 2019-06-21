import { renderReviewPopup, getPopupPosition } from './popup';
import getGeoObject from './geocoder';

const addMarkerToMap = (map, clusterer, point, review, popup) => {
    const marker = new ymaps.Placemark(point.coords, {
        openBalloonOnClick: false,
        balloonContentHeader: review.place,
        balloonContentBody: review.text,
        balloonContentFooter: review.date,
        balloonContentLink: point.address,
        balloonContentCoords: point.coords,
        balloonContentAddress: point.address,
        balloonContentPopupPosition: point.position
    },
    {
        preset: 'islands#violetIcon'
    });

    const onMarkerClick = (event) => {
        event.preventDefault();

        renderReviewPopup(popup, point);
    };

    marker.events.add('click', onMarkerClick);
    map.geoObjects.add(marker);
    clusterer.add(marker);
};

const initMarkers = (map, clusterer, popup) => {
    const markers = JSON.parse(localStorage.getItem('markers'));

    if (!markers) {
        return;
    }
    
    markers.forEach(marker => {
        const { reviews, address, coords } = marker;
        const point = { address, coords };
        
        for (let review of reviews) {
            addMarkerToMap(map, clusterer, point, review, popup);
        }
    });
};

const getMarkerData = async (event, popup) => {
    const position = event.get('domEvent').get('position');
    const coords = event.get('coords');
    const geoObject = await getGeoObject(coords);
    const { description, name } = geoObject;
    const address = `${description}, ${name}`;

    return {
        address,
        coords,
        position: getPopupPosition(popup, position)
    };
};

export {
    getMarkerData,
    initMarkers,
    addMarkerToMap
};