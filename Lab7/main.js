
let dishes = [];
  

let totalCost = 0;
const selectedDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

const dialog = document.querySelector('.dialog');
const dialogButton = document.querySelector('.dialog__btn');
const orderForm = document.querySelector('.order_form1');
const formBtn = document.querySelector(".form__btn");
const resetBtn = document.querySelector('.reset__Btn');

function addToOrder(id) {
    const dish = dishes.find(d => d.id === id);
    if (!dish) return;

    const categoryKey = dish.category;

    document.getElementById('nothing').style.display = 'none';
    document.getElementById('selected-dishes').style.display = 'block';

    let infoContainer = document.getElementById(`${categoryKey}-info`);

    // Убираем стоимость предыдущего выбранного блюда
    if (selectedDishes[categoryKey]) {
        const previousDish = 
        dishes.find(d => d.id === selectedDishes[categoryKey]);
        totalCost -= previousDish.price;

        // Убираем подсветку с предыдущей карточки
        const prevCard = 
        document.querySelector(`[data-dish="${selectedDishes[categoryKey]}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    // Обновляем выбранное блюдо
    selectedDishes[categoryKey] = dish.id;

    // Обновляем информацию в блоке
    infoContainer.innerHTML = `
        ${categoryKey === 'soup' ? 'Суп' :
        categoryKey === 'main-course' ? 'Основное блюдо' :
            categoryKey === 'salad' ? 'Салат' :
                categoryKey === 'drink' ? 'Напиток' : 'Десерт'}:<br>
        ${dish.name} - ${dish.price}&#8381;
    `;

    const hiddenFieldId = `selected-${categoryKey}`;
    document.getElementById(hiddenFieldId).value = dish.keyword;

    // Подсветка текущей карточки
    const currentCard = document.querySelector(`[data-dish="${dish.id}"]`);
    if (currentCard) currentCard.classList.add('selected');

    // Прибавляем стоимость
    totalCost += dish.price;

    // Отображаем итог
    document.getElementById('total-cost').style.display = 'block';
    document.getElementById('cost-value').textContent = totalCost;

    console.log(selectedDishes);
}

function displayDishes() {
    const sections = {
        soup: document.querySelector('.soup .grid-container'),
        'main-course': document.querySelector('.main-dishes .grid-container'),
        drink: document.querySelector('.drink .grid-container'),
        salad: document.querySelector('.salad .grid-container'),
        dessert: document.querySelector('.dessert .grid-container')
    };

    Object.values(sections).forEach(section => section.innerHTML = '');

    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = `dish product-card ${dish.kind}`;
        card.setAttribute('data-dish', dish.id);
        card.innerHTML = `
            <div class="dish-image">
                <img src="${dish.image}" alt="${dish.name}">
            </div>
            <div class="dish-info">
                <div class="dish-name-and-price">
                    <p class="price">${dish.price}&#8381;</p>
                    <p class="dish-name">${dish.name}</p>
                </div>
                    <p class="size">${dish.count}</p>
                    <button class="dish-button">Добавить</button>
                </div>
            </div>
        `;
        const button = card.querySelector('.dish-button');
        button.addEventListener('click', () => addToOrder(dish.id));
        sections[dish.category].appendChild(card);
    });
}


const handleFormBtnClick = (event) => {
    event.preventDefault();
    let message = 'Заказ успешно отправлен';
    const txt = document.querySelector('.notification');
    if (!(selectedDishes.dessert || selectedDishes.drink || selectedDishes["main-course"]
        || selectedDishes.salad || selectedDishes.soup)) {
        message = 'Ничего не выбрано. Выберите блюда для заказа';
    } else if (!selectedDishes.drink && (selectedDishes["main-course"]
        || (selectedDishes.salad && selectedDishes.soup))) { 
        message = 'Выберите напиток';
    } else if (selectedDishes.soup && !(selectedDishes.salad 
        || selectedDishes["main-course"])) {
        message = 'Выберите главное блюдо/салат/стартер';
    } else if (selectedDishes.salad && 
        !(selectedDishes.soup || selectedDishes["main-course"])) {
        message = 'Выберите суп или главное блюдо';
    } else if ((selectedDishes.drink || selectedDishes.dessert) &&
        !(selectedDishes["main-course"] || selectedDishes.salad || selectedDishes.soup)) {
        message = 'Выберите главное блюдо';
    } else {
        if (!orderForm.checkValidity()) { // проверка на то, что заполнены все обязательные поля
            message = 'Пожалуйста, заполните обязательные поля: ФИО, почта, номер телефона и адрес';
        } else { // обязательные поля заполнены
            orderForm.submit();
        };     
    }

    txt.textContent = message;
    if (message) {
        dialog.showModal();
    }
};

const apiURL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
const loadDishes = () => {
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                dishes = json;
                console.log(dishes);
                displayDishes();
            });
        } else {
            console.log(
                "Network request for products.json failed with response " +
                response.status +
                ": " +
                response.statusText,
            );
        }
    });
}; 

const handleDialogBtnClick = () => {
    dialog.close();
};

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});

const handleFormBtnReset = () => {
    selectedDishes["main-course"] = null;
    selectedDishes.salad = null;
    selectedDishes.soup = null;
    selectedDishes.drink = null;
    selectedDishes.dessert = null;
    document.getElementById('selected-dishes').style.display = 'none';
    document.getElementById('nothing').style.display = 'block';
    orderForm.reset();
    totalCost = 0;
    document.getElementById('cost-value').textContent = totalCost;

    document.querySelectorAll('[data-dish]').forEach(el => // удаляет подсветку карточек
        el.classList.remove('selected'));

    document.getElementById('soup-info').innerHTML = 'Суп<br>Ничего не выбрано';
    document.getElementById('main-course-info').innerHTML = 'Главное блюдо<br>Ничего не выбрано';
    document.getElementById('salad-info').innerHTML = 'Салат<br>Ничего не выбрано';
    document.getElementById('drink-info').innerHTML = 'Напиток<br>Ничего не выбрано';
    document.getElementById('dessert-info').innerHTML = 'Десерт<br>Ничего не выбрано';
    console.log(selectedDishes);
};

formBtn.addEventListener('click', handleFormBtnClick);
dialogButton.addEventListener('click', handleDialogBtnClick);
resetBtn.addEventListener('click', handleFormBtnReset);