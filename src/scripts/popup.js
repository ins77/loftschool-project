import { getMarkerReviews } from './marker';
import makeReviewTemplate from '../templates/makeReviewTemplate.hbs';

const getPopupPosition = (popup, position) => {
    const [ positionX, positionY ] = position;
    const { clientWidth: displayWidth, clientHeight: displayHeight } = document.documentElement;
    const { clientWidth: popupWidth, clientHeight: popupHeight } = popup;
    const x = positionX > displayWidth - popupWidth ? positionX - popupWidth : positionX;

    if (displayHeight - positionY > popupHeight) {
        return [x, positionY];
    }

    const y = positionY < popupHeight ? positionY / 2 : positionY - popupHeight;

    return [x, y];
}

const renderReviewPopup = (popup, point) => {
    const { address, coords, position } = point;
    const [ positionX, positionY ] = position;
    
    const data = {
        address,
        reviews: getMarkerReviews(address)
    };

    popup.dataset.address = address;
    popup.dataset.coords = coords;
    popup.dataset.position = position;
    popup.style.left = `${positionX}px`;
    popup.style.top = `${positionY}px`;
    popup.classList.remove('hidden');
    popup.innerHTML = makeReviewTemplate(data);
};

const hideReviewPopup = (popup) => {
    popup.classList.add('hidden');
    popup.innerHTML = '';
};

export {
    getPopupPosition,
    renderReviewPopup,
    hideReviewPopup
};