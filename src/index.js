import './styles/index.css';

import addClusterer from './scripts/clusterer';
import { addMarkerToStorage, addMarkerToMap, initMarkers, getMarkerData } from './scripts/marker';
import { renderReviewPopup, hideReviewPopup, getPopupPosition }  from './scripts/popup';
import { getFullDate } from './scripts/helpers/date';

const init = () => {
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 13
    });
    const popup = document.querySelector('#popup-review');
    const clusterer = addClusterer(myMap, popup);

    initMarkers(myMap, clusterer, popup);
    
    const onButtonSaveClick = (event) => {
        const target = event.target;
        const buttonSave = document.querySelector('#save');
    
        if (target !== buttonSave) {
            return;
        }

        event.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const place = document.querySelector('#place').value.trim();
        const review = document.querySelector('#review').value.trim();
        const areFieldsEmpty = !(name && place && review);

        if (areFieldsEmpty) {
            alert('Заполните все обязательные поля');
            return;
        }

        const date = getFullDate(new Date());
        const newReview = { name, place, review, date };
        const { address, coords, position } = popup.dataset;
        const point = {
            address, 
            coords: coords.split(','), 
            position: position.split(',')
        };
    
        addMarkerToMap(myMap, clusterer, point, newReview, popup);
        addMarkerToStorage(point, newReview);
        renderReviewPopup(popup, point);
    };

    const onButtonCloseClick = (event) => {
        const target = event.target;
        const buttonClose = document.querySelector('#close');
    
        if (target !== buttonClose) {
            return;
        }

        hideReviewPopup(popup);
    };

    const onBalloonLinkClick = (event) => {
        const target = event.target;
        const balloonLink = document.querySelector('#balloon-link');

        if (target !== balloonLink) {
            return;
        }

        event.preventDefault();

        myMap.balloon.close();

        const { address, coords } = balloonLink.dataset;
        const clickPosition = [event.clientX, event.clientY];
        const point = {
            address,
            coords: coords.split(','),
            position: getPopupPosition(popup, clickPosition)
        };

        renderReviewPopup(popup, point);
    };

    const onMapClick = async (event) => {
        const point = await getMarkerData(event, popup);
        renderReviewPopup(popup, point);
    };

    myMap.events.add('click', onMapClick);
    popup.addEventListener('click', onButtonSaveClick);
    popup.addEventListener('click', onButtonCloseClick);
    document.addEventListener('click', onBalloonLinkClick);
};

ymaps.ready(init);
