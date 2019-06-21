import makeBalloonTemplate from '../templates/makeBalloonTemplate.hbs';
import { hideReviewPopup } from './popup';

export default (map, popup) => {
    const customClusterBalloonContent = ymaps.templateLayoutFactory.createClass(
        makeBalloonTemplate('$[(properties)]')
    );

    const clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true,
        openBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customClusterBalloonContent,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 160,
        clusterBalloonPagerSize: 10
    });

    map.geoObjects.add(clusterer);

    const onClustererBalloonOpen = () => {
        hideReviewPopup(popup);
    };

    clusterer.events.add('balloonopen', onClustererBalloonOpen);

    return clusterer;
};