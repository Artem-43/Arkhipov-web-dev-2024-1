import dishes from './menu.js';

let totalCost = 0;
const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    desert: null
};

const dialog = document.querySelector('.dialog');
const dialogButton = document.querySelector('.dialog__btn');

function addToOrder(keyword) {
    const dish = dishes.find(d => d.keyword === keyword);
    if (!dish) return;

    const categoryKey = dish.category;

    document.getElementById('nothing').style.display = 'none';
    document.getElementById('selected-dishes').style.display = 'block';

    let infoContainer = document.getElementById(`${categoryKey}-info`);

    // Убираем стоимость предыдущего выбранного блюда
    if (selectedDishes[categoryKey]) {
        const previousDish = 
        dishes.find(d => d.keyword === selectedDishes[categoryKey]);
        totalCost -= previousDish.price;

        // Убираем подсветку с предыдущей карточки
        const prevCard = 
        document.querySelector(`[data-dish="${selectedDishes[categoryKey]}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    // Обновляем выбранное блюдо
    selectedDishes[categoryKey] = dish.keyword;

    // Обновляем информацию в блоке
    infoContainer.innerHTML = `
        ${categoryKey === 'soup' ? 'Суп' :
        categoryKey === 'main' ? 'Основное блюдо' :
            categoryKey === 'salad' ? 'Салат' :
                categoryKey === 'drink' ? 'Напиток' : 'Десерт'}:<br>
        ${dish.name} - ${dish.price}&#8381;
    `;

    const hiddenFieldId = `selected-${categoryKey}`;
    document.getElementById(hiddenFieldId).value = dish.keyword;

    // Подсветка текущей карточки
    const currentCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
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
        main: document.querySelector('.main-dishes .grid-container'),
        drink: document.querySelector('.drink .grid-container'),
        salad: document.querySelector('.salad .grid-container'),
        desert: document.querySelector('.desert .grid-container')
    };

    Object.values(sections).forEach(section => section.innerHTML = '');

    const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

    sortedDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = `dish product-card ${dish.kind}`;
        card.setAttribute('data-dish', dish.keyword);
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
        button.addEventListener('click', () => addToOrder(dish.keyword));
        sections[dish.category].appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayDishes();
});


const handleFormBtnClick = (event) => {
    event.preventDefault();
    let message = ' ';
    const txt = document.querySelector('.notification');
    if (!(selectedDishes.desert || selectedDishes.drink || selectedDishes.main
        || selectedDishes.salad || selectedDishes.soup)) {
        message = 'Ничего не выбрано. Выберите блюда для заказа';
    } else if (!selectedDishes.drink && (selectedDishes.main 
        || (selectedDishes.salad && selectedDishes.soup))) { 
        console.log('dsidhks');           
        message = 'Выберите напиток';
    } else if (selectedDishes.soup && !(selectedDishes.salad 
        || selectedDishes.main)) {
        message = 'Выберите главное блюдо/салат/стартер';
    } else if (selectedDishes.salad && 
        !(selectedDishes.soup || selectedDishes.main)) {
        message = 'Выберите суп или главное блюдо';
    } else if (selectedDishes.drink || selectedDishes.desert) {
        message = 'Выберите главное блюдо';
    }

    console.log(Boolean(selectedDishes.drink));
    console.log(Boolean(selectedDishes.main));
    // console.log(Boolean(selectedDishes.drink));
    // console.log(Boolean(selectedDishes.drink));
    // console.log(Boolean(selectedDishes.drink));
    

    txt.textContent = message;
    if (message) {
        dialog.showModal();
    }
};

const handleDialogBtnClick = () => {
    dialog.close();
};


const orderForm = document.querySelector('.order_form1');


const formBtn = document.querySelector(".form__btn");
formBtn.addEventListener('click', handleFormBtnClick);
dialogButton.addEventListener('click', handleDialogBtnClick);
