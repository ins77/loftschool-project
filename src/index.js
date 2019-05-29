/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
const map = (array, fn) => {
    const mappedArray = [];

    for (let i = 0; i < array.length; i++) {
        mappedArray.push(fn(array[i], i, array));
    }

    return mappedArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
const reduce = (array, fn, initial) => {
    const currentIndex = initial ? 0 : 1;
    let acc = initial ? initial : array[0];

    for (let i = currentIndex; i < array.length; i++) {
        acc = fn(acc, array[i], i, array);
    }

    return acc;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
const upperProps = (obj) => {
    const props = Object.keys(obj);
    
    return map(props, prop => prop.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
const slice = (array, from = 0, to = array.length) => {
    if (to > array.length) {
        to = array.length;
    }

    const lastArrayIndex = array.length - 1;
    const currentIndex = from < 0 ? 0 : from;
    const lastIndexPredicate = to < 0 && Math.abs(to) < array.length;
    const lastIndex = lastIndexPredicate ? array[lastArrayIndex - Math.abs(to)] : to;

    let newArr = [];

    for (let i = currentIndex; i < lastIndex; i++) {
        newArr = [...newArr, array[i]];
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
const createProxy = obj => (
    new Proxy(obj, {
        set(target, prop, value) {
            if (typeof value === 'number') {
                target[prop] = value ** 2;
            }

            return true;
        }
    })
);

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
