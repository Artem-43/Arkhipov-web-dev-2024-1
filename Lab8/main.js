let dishes = [];
let totalCost = 0;
const orderButton = document.querySelector(".place_an_order__btn");

let selectedDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

function checkCombo() {
    let isCombo = true;
    if (!(selectedDishes.dessert || selectedDishes.drink || selectedDishes["main-course"]
        || selectedDishes.salad || selectedDishes.soup)) {
        isCombo = false;
    } else if (!selectedDishes.drink && (selectedDishes["main-course"]
        || (selectedDishes.salad && selectedDishes.soup))) { 
        isCombo = false;
    } else if (selectedDishes.soup && !(selectedDishes.salad 
        || selectedDishes["main-course"])) {
        isCombo = false;
    } else if (selectedDishes.salad && 
        !(selectedDishes.soup || selectedDishes["main-course"])) {
        isCombo = false;
    } else if ((selectedDishes.drink || selectedDishes.dessert) &&
        !(selectedDishes["main-course"] || selectedDishes.salad || selectedDishes.soup)) {
        isCombo = false;
    } 
    return isCombo;
};

function calculateTotalCost() {
    totalCost = 0;
    Object.values(selectedDishes).forEach(id => {
        if (id !== null) {
            const dish = dishes.find(d => d.id === id);
            if (dish) totalCost += dish.price;
        }
    });
    return totalCost;
}

function addToOrder(id) {
    const dish = dishes.find(d => d.id === id);
    if (!dish) return;
    const categoryKey = dish.category;

    let infoContainer = document.getElementById(`${categoryKey}-info`);

    // Убираем подсветку с предыдущей карточки и вычитаем стоимость;
    if (selectedDishes[categoryKey]) {
        const prevCard = 
        document.querySelector(`[data-dish="${selectedDishes[categoryKey]}"]`);
        if (prevCard) prevCard.classList.remove('selected');

        const previousDish = 
        dishes.find(d => d.id === selectedDishes[categoryKey]);
        totalCost -= previousDish.price;
    }

    // Обновляем выбранное блюдо
    selectedDishes[categoryKey] = dish.id;

    // const hiddenFieldId = `selected-${categoryKey}`;
    // document.getElementById(hiddenFieldId).value = dish.keyword;

    // Подсветка текущей карточки
    const currentCard = document.querySelector(`[data-dish="${dish.id}"]`);
    if (currentCard) currentCard.classList.add('selected');

    // Прибавляем стоимость
    totalCost += dish.price;
    localStorage.setItem('dishes', JSON.stringify(selectedDishes));

    
    // Показываем панель для перехода к оформлению заказа
    let panel = document.querySelector(".place_an_order");
    if (selectedDishes == 0) {
        panel.style.display = "none";
    } else {
        panel.style.display = "flex";
    }

    // Проверяем на комбо
    if (checkCombo()) {
        const btn = document.querySelector(".place_an_order__btn");
        btn.style.backgroundColor = "white";
    }

    let total = document.querySelector(".total-cost");
    total.innerHTML = `Итого: ${totalCost}` ;

}


function displayDishes() {
    const stored = localStorage.getItem('dishes');
    if (stored) {
        selectedDishes = JSON.parse(stored);
        console.log(selectedDishes);
    }
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
    // Показываем панель для перехода к оформлению заказа
    let panel = document.querySelector(".place_an_order");
    if (calculateTotalCost() == 0) { //если ничего не выбрано панель скрыта
        panel.style.display = "none";
    } else { //если выбрано
        // панель для перехода на страницу оформить заказ
        panel.style.display = "flex";
        let total = document.querySelector(".total-cost");
        total.innerHTML = `Итого: ${totalCost}`;
        //подсвечиваем карточки выбранных блюд
        Object.values(selectedDishes).forEach(dish => {
            console.log(dish);
            const currentCard = document.querySelector(`[data-dish="${dish}"]`);
            if (currentCard) currentCard.classList.add('selected');
        });
    }
};

const handleOrderBtnClick = (event) => {
    event.preventDefault();
    if (checkCombo()) {
        window.location.href = "./place_order.html"; // переходит как ссылка
        console.log("hello");
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

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});
orderButton.addEventListener('click', handleOrderBtnClick);

