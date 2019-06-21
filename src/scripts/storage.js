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
    getMarkerReviews,
    addMarkerToStorage
};