/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', () => {
    renderCookieTable();
});

addButton.addEventListener('click', () => {
    const name = addNameInput.value;
    const value = addValueInput.value;

    if (name.trim() === '' || value.trim() === '') {
        return;
    }

    setCookie(name, value);
    renderCookieTable();

    // const filteredCookieNames = Object.keys(getFilteredCookies(filterNameInput.value));

    // if (isCookieNameExists(name)) {
    //     updateCookieRow(name, value);
    // }

    // if (!filteredCookieNames.includes(name)) {
    //     if (isCookieNameExists(name)) {
    //         removeCookieRow(name);
    //     }

    //     return;
    // }

    // if (isCookieNameExists(name)) {
    //     updateCookieRow(name, value);
    // }
    // } else {
    //     addCookieRow(name, value);
    // }
});

const setCookie = (name, value, expires) => {
    document.cookie = `${name}=${value}; expires=${expires}`;
};

const removeCookie = (name) => {
    const date = new Date();

    date.setDate(date.getDate() - 1);
    setCookie(name, '', date.toUTCString());
};

const getFilteredCookies = (filterValue) => {
    const cookie = document.cookie;

    if (!cookie) {
        return [];
    }

    const cookies = getCookiesObject(cookie);
    const filteredCookieNames = Object.keys(cookies).filter(cookieName => (
        cookies[cookieName].includes(filterValue) || cookieName.includes(filterValue)
    ));

    return filteredCookieNames.reduce((acc, currentName) => {
        acc[currentName] = cookie[currentName];
    
        return acc;
    }, {});
};

// const isCookieNameExists = (name) => {
//     const cookieNameCells = listTable.querySelectorAll('.cookie-name');

//     return [...cookieNameCells].some(cell => cell.textContent === name);
// };

const getCookiesObject = (cookie) => {
    return cookie.split('; ').reduce((acc, current) => {
        const [name, value] = current.split('=');

        acc[name] = value;

        return acc;
    }, {});
};

// const removeCookieRow = (name) => {
//     const cookieNameCells = listTable.querySelectorAll('.cookie-name');
//     const nameCell = [...cookieNameCells].find(cell => cell.textContent === name);
//     const currentRow = nameCell.parentElement;

//     currentRow.remove();
// };

// const updateCookieRow = (name, value) => {
//     const cookieNameCells = listTable.querySelectorAll('.cookie-name');
//     const nameCell = [...cookieNameCells].find(cell => cell.textContent === name);
//     const valueCell = nameCell.parentElement.querySelector('.cookie-value');

//     valueCell.textContent = value;
// };

const addCookieRow = (name, value) => {
    const tableRow = document.createElement('tr');
    const tableCellName = document.createElement('td');
    const tableCellValue = document.createElement('td');
    const tableCellDelete = document.createElement('td');
    const buttonDelete = document.createElement('button');

    tableCellName.classList.add('cookie-name');
    tableCellValue.classList.add('cookie-value');

    tableCellName.textContent = name;
    tableCellValue.textContent = value;
    buttonDelete.textContent = 'Удалить';

    tableCellDelete.append(buttonDelete);
    tableRow.append(tableCellName);
    tableRow.append(tableCellValue);
    tableRow.append(tableCellDelete);
    listTable.append(tableRow);

    const onButtonDeleteClick = () => {
        removeCookie(name);
        tableRow.remove();
    };

    buttonDelete.addEventListener('click', onButtonDeleteClick);
};

const renderCookieTable = () => {
    listTable.innerHTML = '';

    const cookies = getCookiesObject(document.cookie);
    const filteredCookies = getFilteredCookies(filterNameInput.value);

    for (let cookieName of Object.keys(filteredCookies)) {
        addCookieRow(cookieName, cookies[cookieName]);
    }
};

const init = () => {
    renderCookieTable();
};

init();
