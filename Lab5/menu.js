const dishes = [
    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/Gazpacho.jpg",
        kind: 'veg'
    },
    {
        keyword: "mushroom",
        name: "Грибной суп",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/mushroom_soup_puree.jpg",
        kind: 'veg'
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "images/ramen.jpg",
        kind: 'meat'
    },
    {
        keyword: "norwegian",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "270 г",
        image: "images/Norwegian-soup.jpg",
        kind: 'fish'
    },
    {
        keyword: "tom_yam",
        name: "Том ям с креветками",
        price: 365,
        category: "soup",
        count: "330 г",
        image: "images/Tom_yam_with_shrimp.jpg",
        kind: "fish"
    },
    {
        keyword: "chicken_soup",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "images/chicken.jpg",
        kind: 'meat'
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "340 г",
        image: "images/lasagna.jpg",
        kind: "meat"
    },
    {
        keyword: "fried_potatoes",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "images/fried_potatoes_with_mushrooms.jpg",
        kind: "veg",
    },
    {
        keyword: "cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        count: "280 г",
        image: "images/Chicken_cutlets_and_mashed_potatoes.jpg",
        kind: "meat"
    },
    {
        keyword: "fish_rice",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main",
        count: "270 г",
        image: "images/fishrice.jpg",
        kind: 'fish'
    },
    {
        keyword: "pizza",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "470 г",
        image: "images/pizza.jpg",
        kind: 'veg'
    },
    {
        keyword: "orange",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 г",
        image: "images/Orange_juice.jpg",
        kind: "cold"
    },
    {
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        count: "280 г",
        image: "images/shrimppasta.jpg",
        kind: 'fish'
    },
    {
        keyword: "apple",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 г",
        image: "images/Apple_juice.jpg",
        kind: "cold"
    },
    {
        keyword: "carrot",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 г",
        image: "images/Carrot_juice.jpg",
        kind: "cold"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        count: "300 г",
        image: "images/cappuccino.jpg",
        kind: 'hot'
    },
    {
        keyword: "greentea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "300 г",
        image: "images/greentea.jpg",
        kind: 'hot'
    },
    {
        keyword: "tea",
        name: "Черный чай",
        price: 90,
        category: "drink",
        count: "300 г",
        image: "images/tea.jpg",
        kind: 'hot'
    },
    {
        keyword: "checheesecake",
        name: "Чизкейк",
        price: 240,
        category: "desert",
        count: "125 г",
        image: "images/checheesecake.jpg",
        kind: 'small'
    },
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 220,
        category: "desert",
        count: "300 г",
        image: "images/baklava.jpg",
        kind: 'average'
    },
    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 270,
        category: "desert",
        count: "140 г",
        image: "images/chocolatecake.jpg",
        kind: 'small'
    },
    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "desert",
        count: "125 г",
        image: "images/chocolatecheesecake.jpg",
        kind: 'small'
    },
    {
        keyword: "donuts3",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "desert",
        count: "350 г",
        image: "images/donuts2.jpg",
        kind: 'average'
    },
    {
        keyword: "donuts6",
        name: "Пончики (6 штуки)",
        price: 650,
        category: "desert",
        count: "700 г",
        image: "images/donuts.jpg",
        kind: 'big'
    },
    {
        keyword: "coreansaladwithegg",
        name: "Корейский салад с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "images/saladwithegg.jpg",
        kind: 'veg'
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "images/caprese.jpg",
        kind: 'veg'
    },
    {
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "images/tunasalad.jpg",
        kind: 'fish'
    },
    {
        keyword: "frenchfries1",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "images/frenchfries1.jpg",
        kind: 'veg'
    },
    {
        keyword: "frenchfries2",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "images/frenchfries2.jpg",
        kind: 'veg'
    },
    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "images/caesar.jpg",
        kind: 'meat'
    }
];

export default dishes;