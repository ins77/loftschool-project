import 'normalize.css';
import './style/base.css';
import './style/index.css';


import addClusterer from './scripts/clusterer';
import { addMarkerToMap, initMarkers, getMarkerData } from './scripts/marker';
import { addMarkerToStorage }  from './scripts/storage';
import { renderReviewPopup, hideReviewPopup, getPopupPosition }  from './scripts/popup';

const init = () => {
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 13
    });
    const popup = document.querySelector('#review-wrap');
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
            // todo
            console.log('Заполните все обязательные поля');
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
        addMarkerToStorage(address, coords, newReview);
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
        await renderReviewPopup(popup, point);
    };

    myMap.events.add('click', onMapClick);
    popup.addEventListener('click', onButtonSaveClick);
    popup.addEventListener('click', onButtonCloseClick);
    document.addEventListener('click', onBalloonLinkClick);
};


// helpers

const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth= month < 10 ? `0${month}` : `${month}`;
    const formattedYear = year < 10 ? `0${year}` : `${year}`;

    return `${formattedYear}.${formattedMonth}.${formattedDay}`;
};

const getFormattedTime = (date) => {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedMinutes = minutes < 10 ? `0${seconds}` : `${minutes}`;
    const formattedHours = hours < 10 ? `0${seconds}` : `${hours}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const getFullDate = date => `${getFormattedDate(date)} ${getFormattedTime(date)}`;

ymaps.ready(init);
