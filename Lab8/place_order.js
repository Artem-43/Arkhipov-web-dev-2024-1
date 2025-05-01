const apiKey = 'd75e179e-4794-41fd-881f-c9e16e900de6';
const apiUrl = `https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`;

let dishes = [];
let selectedDishes = {
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

function calculateTotalCost() {
    let totalCost = 0;
    Object.values(selectedDishes).forEach(id => {
        if (id !== null) {
            const dish = dishes.find(d => d.id === id);
            if (dish) totalCost += dish.price;
        }
    });
    return totalCost;
}


function removeFromOrder(id) {
    const dish = dishes.find(d => d.id === id);
    if (!dish) return;

    const categoryKey = dish.category;

    const stored = localStorage.getItem('dishes');
    if (stored) {
        Object.assign(selectedDishes, JSON.parse(stored));
    }

    // Удаляем выбранное блюдо
    selectedDishes[categoryKey] = null;
    localStorage.setItem('dishes', JSON.stringify(selectedDishes));

    // Обновляем информацию в блоке
    let infoContainer = document.getElementById(`${categoryKey}-info`);
    infoContainer.innerHTML = `
        ${categoryKey === 'soup' ? 'Суп' :
        categoryKey === 'main-course' ? 'Основное блюдо' :
            categoryKey === 'salad' ? 'Салат' :
                categoryKey === 'drink' ? 'Напиток' : 'Десерт'}:<br>
        Ничего не выбрано;
    `;    
    displayDishes(); // eslint-disable-line
    console.log(selectedDishes);
}


function displayDishes() {
    document.getElementById('nothing').style.display = 'none';
    document.getElementById('selected-dishes').style.display = 'block';
    const sections = {
        order_structure: document.querySelector('.order_structure .grid-container'),
    };
    console.log('localStorage:', localStorage);

    const stored = localStorage.getItem('dishes');
    if (stored) {
        Object.assign(selectedDishes, JSON.parse(stored));
    }
    
    Object.values(sections).forEach(section => section.innerHTML = '');

    //достает все id, не равные null
    const selectedIds = Object.values(selectedDishes).filter(id => id !== null);
    // находит все блюда из dishes, у которых id совпадает с выбранными.
    const selectedFullDishes = dishes.filter(dish => selectedIds.includes(dish.id));
    
    //Если длина массива с айдишиниками равна нулю (пустой массив), то выводим ничего не выбрано
    if (selectedIds.length == 0) {
        const title = document.querySelector('.section-name');
        title.textContent = "Ничего не выбрано";
        document.getElementById('nothing').style.display = 'block';
        document.getElementById('selected-dishes').style.display = 'none';
    }
    // отрисовываем блюда
    selectedFullDishes.forEach(dish => {
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
                    <button class="dish-button">Удалить</button>
                </div>
            </div>
        `;
        const button = card.querySelector('.dish-button');
        button.addEventListener('click', () => removeFromOrder(dish.id));
        sections.order_structure.appendChild(card);

        // записываем выбранные блюда и цены в блок ваш заказ
        const categoryKey = dish.category;
        let infoContainer = document.getElementById(`${categoryKey}-info`);
        infoContainer.innerHTML = `
        ${categoryKey === 'soup' ? 'Суп' :
        categoryKey === 'main-course' ? 'Основное блюдо' :
            categoryKey === 'salad' ? 'Салат' :
                categoryKey === 'drink' ? 'Напиток' : 'Десерт'}:<br>
        ${dish.name} - ${dish.price}&#8381;
    `;
    });
    document.getElementById('total-cost').style.display = 'block';
    document.getElementById('cost-value').textContent = calculateTotalCost();
}

const handleFormBtnClick = async (event) => {
    event.preventDefault();
    let message = '';
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
            message = 'Пожалуйста, заполните обязательные поля: ФИО, \
            почта, номер телефона, адрес и время доставки';
        } else { // обязательные поля заполнены*-
            
            // Создаём объект FormData
            const formData = new FormData(orderForm);
            
            formData.append('soup_id', (selectedDishes.soup ? selectedDishes.soup : ""));
            formData.append('main_course_id', 
                selectedDishes['main-course'] ? selectedDishes['main-course'] : "");
            formData.append('salad_id', selectedDishes.salad ? selectedDishes.salad : "");
            formData.append('drink_id', selectedDishes.drink ? selectedDishes.drink : "");
            formData.append('dessert_id', selectedDishes.dessert ? selectedDishes : "");

            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            console.log('Отправляемые данные:', formDataObject);

            await fetch(apiUrl, {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        message = "Заказ успешно отправлен!";
                        selectedDishes = {};
                        localStorage.setItem('dishes', 
                            JSON.stringify(selectedDishes));
                        displayDishes();
                    } else {
                        message = "Ошибка при отправке заказа.";
                    }
                })
                .catch(error => {
                    console.error("Ошибка при отправке данных:", error);
                    message = "Произошла ошибка, попробуйте позже.";
                });  
        };     
    }

    txt.textContent = message;
    if (message) {
        dialog.showModal();
    }
};

const handleDialogBtnClick = () => {
    dialog.close();
};

const handleFormBtnReset = () => {
    selectedDishes["main-course"] = null;
    selectedDishes.salad = null;
    selectedDishes.soup = null;
    selectedDishes.drink = null;
    selectedDishes.dessert = null;
    orderForm.reset();

    localStorage.setItem('dishes', JSON.stringify(selectedDishes));
    displayDishes();
};

const apiURL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
const loadDishes = () => {
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                dishes = json;
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

formBtn.addEventListener('click', handleFormBtnClick);
dialogButton.addEventListener('click', handleDialogBtnClick);
resetBtn.addEventListener('click', handleFormBtnReset);

document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
});
