export default async (coords) => {
    const [coordX, coordY] = coords;
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=753aab6d-f0d5-4334-a020-6d947f456538&format=json&geocode=${coordY},${coordX}`);
    const result = await response.json();

    return result.response.GeoObjectCollection.featureMember[0].GeoObject;
};
