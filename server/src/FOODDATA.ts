const foodData = {
  foods: [
    {
      foodId: "1",
      name: "Arroz Blanco",
      servingSize: 100,
      calories: 130,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/food-and-drink-color/64/food_rice_bowl_healthy_restaurant_cooking_meal-512.png",
    },
    {
      foodId: "2",
      name: "Carne Asada",
      servingSize: 150,
      calories: 250,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/cuisine-food/128/food-restaurant-meal-steak-meat-grilled-cooked-512.png",
    },
    {
      foodId: "3",
      name: "Huevo",
      servingSize: 50,
      calories: 70,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/food-5-7/128/Vigor_Egg-Eggs-Food-Poultry-Breakfast-Eggshell-512.png",
    },
    {
      foodId: "4",
      name: "Pan Integral",
      servingSize: 30,
      calories: 80,
      foodType: "comida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/bakery-66/512/Bread-Whole-Wheat-gain-512.png",
    },
    {
      foodId: "5",
      name: "Agua Mineral",
      servingSize: 300,
      calories: 0,
      foodType: "bebida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-18-512.png",
    },
    {
      foodId: "6",
      name: "Paella",
      servingSize: 200,
      calories: 350,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/world-classic-food/512/27-seafood-paella-spanish-cuisine-512.png",
    },
    {
      foodId: "7",
      name: "Leche Deslactosada",
      servingSize: 250,
      calories: 90,
      foodType: "bebida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/food-drink-5/32/milk-512.png",
    },
    {
      foodId: "8",
      name: "Sándwich de Jamón y Queso",
      servingSize: 150,
      calories: 350,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/bakery-color/200/05-512.png",
    },
    {
      foodId: "9",
      name: "Pescado a la Parrilla",
      servingSize: 150,
      calories: 200,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/cuisine-food/128/food-restaurant-meal-fish-seafood-grilled-cooked-512.png",
    },
    {
      foodId: "10",
      name: "Tacos de Pollo",
      servingSize: 200,
      calories: 320,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/world-cuisine-astute-vol-2/512/Tacos-512.png",
    },
    {
      foodId: "11",
      name: "Té de Manzanilla",
      servingSize: 250,
      calories: 5,
      foodType: "bebida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/brain-foods-6/496/tea-chamomile-herbal-drink-hot-512.png",
    },
    {
      foodId: "12",
      name: "Naranja",
      servingSize: 130,
      calories: 62,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/fruits-79/48/08-orange-512.png",
    },
    {
      foodId: "13",
      name: "Yogurt Natural",
      servingSize: 150,
      calories: 100,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/dairy-and-milk/38/16-512.png",
    },
    {
      foodId: "14",
      name: "Café Espresso",
      servingSize: 300,
      calories: 2,
      foodType: "bebida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/drink-beverage/512/11-coffee-espresso-cafe-mug-512.png",
    },
    {
      foodId: "15",
      name: "Ensalada César",
      servingSize: 150,
      calories: 250,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/food-set-2-1/91/Food_C136-512.png",
    },
    {
      foodId: "16",
      name: "Sopa de Tomate",
      servingSize: 250,
      calories: 120,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/food-serving/128/yumminky-food-serving-11-512.png",
    },
    {
      foodId: "17",
      name: "Nuez de Macadamia",
      servingSize: 30,
      calories: 200,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/healthy-food-9/64/Macadamia-nut-nutrition-healthy-512.png",
    },
    {
      foodId: "18",
      name: "Tostadas con Mermelada",
      servingSize: 80,
      calories: 180,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/food-1206/64/Food_Filled_Outline_bread-toast-jam-food-512.png",
    },
    {
      foodId: "19",
      name: "Tinto",
      servingSize: 250,
      calories: 125,
      foodType: "bebida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/coffee-barista-1/100/FILTER_COFFEE-512.png",
    },
    {
      foodId: "20",
      name: "Fresa",
      servingSize: 100,
      calories: 150,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Strawberry-512.png",
    },
    {
      foodId: "21",
      name: "Pizza Margherita",
      servingSize: 250,
      calories: 300,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/thanksgiving-163/64/pizza-fall-holiday-autumn-tradition-512.png",
    },
    {
      foodId: "22",
      name: "Pollo a la Parrilla",
      servingSize: 200,
      calories: 250,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/cuisine-food/128/food-chicken-meat-drumstick-leg-piece-grilled-512.png",
    },
    {
      foodId: "23",
      name: "Tortilla Española",
      servingSize: 150,
      calories: 180,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/food-1283/64/omelette-food-egg-lunch-breakfast-512.png",
    },
    {
      foodId: "24",
      name: "Mango",
      servingSize: 150,
      calories: 60,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/fruits-58/256/Food_Filled_outline_-79-512.png",
    },
    {
      foodId: "25",
      name: "Café con Leche",
      servingSize: 350,
      calories: 250,
      foodType: "bebida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/drink-beverage/512/z5-coffee-latte-takeaway-cup-512.png",
    },
    {
      foodId: "26",
      name: "Atún",
      servingSize: 150,
      calories: 130,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/seafood-14/64/tuna-food-fish-can-256.png",
    },
    {
      foodId: "27",
      name: "Jugo Natural",
      servingSize: 250,
      calories: 130,
      foodType: "bebida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/beverages-33/32/apple_vinegar_cider_healthy_organic_fresh_juice_natural-256.png",
    },
    {
      foodId: "28",
      name: "Leche de Almendras",
      servingSize: 200,
      calories: 15,
      foodType: "bebida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/healthy-food-35/64/Almond_milk-almond-milk-healthy-drink-256.png",
    },
    {
      foodId: "29",
      name: "Tofu",
      servingSize: 100,
      calories: 110,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/international-food-1/48/21-stinky_tofu_southeast_asia-256.png",
    },
    {
      foodId: "30",
      name: "Manzana",
      servingSize: 100,
      calories: 52,
      foodType: "comida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/fruity-3/512/Apple-512.png",
    },
    {
      foodId: "31",
      name: "Sushi de Salmón",
      servingSize: 180,
      calories: 220,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/food-4-9/128/food_Sushi-Roll-Seafood-Japanese-Restaurant-256.png",
    },
    {
      foodId: "32",
      name: "Spaghettis a la Carbonara",
      servingSize: 250,
      calories: 350,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/food-set-2-1/91/Food_C149-512.png",
    },
    {
      foodId: "33",
      name: "Ensalada de Frutas",
      servingSize: 200,
      calories: 150,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/vegan-diet/64/Fruit_Salad-256.png",
    },
    {
      foodId: "34",
      name: "Hamburguesa Vegana",
      servingSize: 250,
      calories: 220,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/plant-based-diet-soft-fill/60/Vegan-Burger-organic-vegetarian-beef-512.png",
    },
    {
      foodId: "35",
      name: "Malteada de frutas",
      servingSize: 300,
      calories: 180,
      foodType: "bebida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/healthy-food-3/64/Smoothie-watermelon-beverage-shake-fruit-256.png",
    },
    {
      foodId: "36",
      name: "Lentejas",
      servingSize: 150,
      calories: 150,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/healthy-food-3/64/Lentils-seed-healthy-vegan-diet-256.png",
    },
    {
      foodId: "37",
      name: "Pie de Limón",
      servingSize: 100,
      calories: 300,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/flavors-colored-outline-part-2/128/ic_mascarpone_lemon_cake-512.png",
    },
    {
      foodId: "38",
      name: "Uvas",
      servingSize: 100,
      calories: 70,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/vegetables-60/48/Fruits_grapes_food-256.png",
    },
    {
      foodId: "39",
      name: "Puré de Papas",
      servingSize: 150,
      calories: 110,
      foodType: "comida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/vegan-3/64/Mashed_potatoes-food-dish-potato-256.png",
    },
    {
      foodId: "40",
      name: "Lasagna Boloñesa",
      servingSize: 200,
      calories: 320,
      foodType: "comida",
      picture:
        "https://cdn4.iconfinder.com/data/icons/italy-flat/512/lasagna_bolognese_mozzarella_pasta_italian_food-512.png",
    },
    {
      foodId: "41",
      name: "Lechuga",
      servingSize: 50,
      calories: 5,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/vegetables-92/64/lettuce-iceberg-vegetable-salad-leaf-green-512.png",
    },
    {
      foodId: "42",
      name: "Repollo",
      servingSize: 100,
      calories: 25,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/fruit-and-vegetable-64/340/plant_fresh_vegetable_cabbage_salad_lombardy-256.png",
    },
    {
      foodId: "43",
      name: "Brócoli",
      servingSize: 91,
      calories: 30,
      foodType: "comida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/vegetables-ii-color/290/20-256.png",
    },
    {
      foodId: "44",
      name: "Espinaca",
      servingSize: 200,
      calories: 30,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/fruit-and-vegetable-64/340/food_healthy_spinach_vegetable_leaf_salad_diet-512.png",
    },
    {
      foodId: "45",
      name: "Papaya",
      servingSize: 140,
      calories: 60,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/fruit-and-vegetable-64/340/fruit_vegan_food_papaya_ripe_slice-512.png",
    },
    {
      foodId: "46",
      name: "Tamarindo",
      servingSize: 220,
      calories: 100,
      foodType: "comida",
      picture:
        "https://cdn0.iconfinder.com/data/icons/fruit-169/504/tamarind-fruit-sour-vitamin-tropical-256.png",
    },
    {
      foodId: "47",
      name: "Quinua",
      servingSize: 125,
      calories: 110,
      foodType: "comida",
      picture:
        "https://cdn3.iconfinder.com/data/icons/healthy-food-20/3500/quinoa_package_bowl_porridge_healthy_food-512.png",
    },
    {
      foodId: "48",
      name: "Banano",
      servingSize: 120,
      calories: 105,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/food-5-7/128/Vigor_Banana-Peel-Fruit-Ripe-Healthy-256.png",
    },
    {
      foodId: "49",
      name: "Frijoles",
      servingSize: 135,
      calories: 140,
      foodType: "comida",
      picture:
        "https://cdn1.iconfinder.com/data/icons/food-5-7/128/food_Beans-Seeds-Seed-Vegetable-Kidney-2-512.png",
    },
    {
      foodId: "50",
      name: "Guanábana",
      servingSize: 140,
      calories: 66,
      foodType: "comida",
      picture:
        "https://cdn2.iconfinder.com/data/icons/ecuador-4/496/guanabana-fruit-sweet-edible-plant-256.png",
    },
    {
      foodId: "51",
      name: "Ensalada de vegetales",
      servingSize: 200,
      calories: 180,
      foodType: "comida",
      picture: "https://cdn3.iconfinder.com/data/icons/food-set-2-1/91/Food_C136-512.png",
    },
    {
      foodId: "52",
      name: "Ensalada de Espinacas",
      servingSize: 150,
      calories: 80,
      foodType: "comida",
      picture: "https://cdn4.iconfinder.com/data/icons/restaurant-215/2048/11297_-_Salad-512.png",
    },
    {
      foodId: "53",
      name: "Plato de Avena cocida",
      servingSize: 250,
      calories: 200,
      foodType: "comida",
      picture: "https://cdn4.iconfinder.com/data/icons/breakfast-16/256/Food_Filled_outline_-36-512.png",
    },
    {
      foodId: "54",
      name: "Salmón al Horno",
      servingSize: 180,
      calories: 220,
      foodType: "comida",
      picture: "https://cdn4.iconfinder.com/data/icons/food-and-drink-color/64/Food_fish_salmon_cooking_seafood_healthy_restaurant-2-512.png",
    },
    {
      foodId: "55",
      name: "Brócoli al Vapor",
      servingSize: 100,
      calories: 45,
      foodType: "comida",
      picture: "https://cdn0.iconfinder.com/data/icons/vegetables-filled-outline/50/Vegetables_-_Filled_outline-14-512.png",
    },
    {
      foodId: "56",
      name: "Avena con Frutas",
      servingSize: 200,
      calories: 150,
      foodType: "comida",
      picture: "https://cdn1.iconfinder.com/data/icons/scotland-2/496/porridge-grains-oatmeal-scottish-traditional-512.png",
    },
    {
      foodId: "57",
      name: "Zanahoria",
      servingSize: 120,
      calories: 50,
      foodType: "comida",
      picture: "https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/carrot-512.png",
    },
    {
      foodId: "58",
      name: "Sopa de Lentejas",
      servingSize: 250,
      calories: 180,
      foodType: "comida",
      picture: "https://cdn4.iconfinder.com/data/icons/coronavirus-24/468/27-soup-512.png",
    },
    {
      foodId: "59",
      name: "Batido de Espinacas",
      servingSize: 300,
      calories: 100,
      foodType: "bebida",
      picture: "https://cdn0.iconfinder.com/data/icons/smoothie-drinks-2-0-bubblico/128/yumminky-smoothie-drink-60-2-512.png",
    },
    {
      foodId: "60",
      name: "Ramen de cerdo",
      servingSize: 150,
      calories: 100,
      foodType: "comida",
      picture: "https://cdn2.iconfinder.com/data/icons/japan-flat-2/340/ramen_food_japanese_asian_bowl_noodle_soup_japan-512.png",
      //now?
    },
  ],
    
 
};

export default foodData;
