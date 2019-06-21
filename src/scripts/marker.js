import { renderReviewPopup, getPopupPosition } from './popup';
import getGeoObject from './geocoder';

const addMarkerToMap = (map, clusterer, point, review, popup) => {
    const marker = new ymaps.Placemark(point.coords, {
        openBalloonOnClick: false,
        balloonContentHeader: review.place,
        balloonContentBody: review.review,
        balloonContentFooter: review.date,
        balloonContentLink: point.address,
        balloonContentCoords: point.coords,
        balloonContentAddress: point.address
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

const getMarkerReviews = (address) => {
    const markers = JSON.parse(localStorage.getItem('markers'));

    if (!markers) {
        return;
    }

    const currentMarker = markers.find(marker => marker.address === address);

    return currentMarker && currentMarker.reviews || [];
};

const addMarkerToStorage = (address, coords, review) => {
    const markers = JSON.parse(localStorage.getItem('markers'));

    if (!markers) {
        const storageData = [{address, coords, reviews: [review]}];

        localStorage.setItem('markers', JSON.stringify(storageData));

        return;
    }

    const existingAddress = markers.find(marker => marker.address === address);

    if (!existingAddress) {
        const storageData = [...markers, {address, coords, reviews: [review]}];

        localStorage.setItem('markers', JSON.stringify(storageData));

        return;
    }

    const filteredMarkers = markers.filter(marker => marker.address !== address);
    const storageData = [...filteredMarkers, {...existingAddress, reviews: [...existingAddress.reviews, review]}];

    localStorage.removeItem('markers');
    localStorage.setItem('markers', JSON.stringify(storageData));
};

export {
    getMarkerData,
    initMarkers,
    addMarkerToMap,
    addMarkerToStorage,
    getMarkerReviews
};