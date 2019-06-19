export default class Map {
    initMap() {
        return new Promise ((resolve, reject) => ymaps.ready(resolve))
            .then(() => {
                this.map = new ymaps.Map('map', {
                    center: [55.78874, 49.12214],
                    zoom: 12
                });

                this.cluster = new ymaps.Clusterer({
                    clusterDisabledClickZoom: true,
                    clusterOpenBalloonOnClick: true,
                    clusterBalloonContentLayout: 'cluster#balloonCarousel'
                });

                this.map.geoObjects.add(this.cluster);

                return this.map;
            });
    }
}
