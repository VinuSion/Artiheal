const data = {
  foods: [
    {
      foodId: '1',
      name: 'Arroz Blanco',
      servingSize: 100,
      calories: 130,
      foodType: 'comida',
    },
    {
      foodId: '2',
      name: 'Carne Asada',
      servingSize: 150,
      calories: 250,
      foodType: 'comida',
    },
    {
      foodId: '3',
      name: 'Huevo',
      servingSize: 50,
      calories: 70,
      foodType: 'comida',
    },
    {
      foodId: '4',
      name: 'Pan Integral',
      servingSize: 30,
      calories: 80,
      foodType: 'comida',
    },
    {
      foodId: '5',
      name: 'Agua Mineral',
      servingSize: 250,
      calories: 0,
      foodType: 'bebida',
    },
    {
      foodId: '6',
      name: 'Paella',
      servingSize: 200,
      calories: 350,
      foodType: 'comida',
    },
    {
      foodId: '7',
      name: 'Leche Deslactosada',
      servingSize: 250,
      calories: 90,
      foodType: 'bebida',
    },
    {
      foodId: '8',
      name: 'Sándwich de Jamón y Queso',
      servingSize: 150,
      calories: 350,
      foodType: 'comida',
    },
    {
      foodId: '9',
      name: 'Pescado a la Parrilla',
      servingSize: 150,
      calories: 200,
      foodType: 'comida',
    },
    {
      foodId: '10',
      name: 'Tacos de Pollo',
      servingSize: 200,
      calories: 320,
      foodType: 'comida',
    },
    {
      foodId: '11',
      name: 'Té de Manzanilla',
      servingSize: 250,
      calories: 5,
      foodType: 'bebida',
    },
    {
      foodId: '12',
      name: 'Naranja',
      servingSize: 130,
      calories: 62,
      foodType: 'comida',
    },
    {
      foodId: '13',
      name: 'Yogur Natural',
      servingSize: 150,
      calories: 100,
      foodType: 'comida',
    },
    {
      foodId: '14',
      name: 'Café Espresso',
      servingSize: 30,
      calories: 2,
      foodType: 'bebida',
    },
    {
      foodId: '15',
      name: 'Ensalada César',
      servingSize: 150,
      calories: 250,
      foodType: 'comida',
    },
    {
      foodId: '16',
      name: 'Sopa de Tomate',
      servingSize: 250,
      calories: 120,
      foodType: 'comida',
    },
    {
      foodId: '17',
      name: 'Nuez de Macadamia',
      servingSize: 30,
      calories: 200,
      foodType: 'comida',
    },
    {
      foodId: '18',
      name: 'Tostadas con Mermelada',
      servingSize: 80,
      calories: 180,
      foodType: 'comida',
    },
    {
      foodId: '19',
      name: 'Tinto',
      servingSize: 150,
      calories: 125,
      foodType: 'bebida',
    },
    {
      foodId: '20',
      name: 'Fresa',
      servingSize: 100,
      calories: 150,
      foodType: 'comida',
    },
    {
      foodId: '21',
      name: 'Pizza Margherita',
      servingSize: 250,
      calories: 300,
      foodType: 'comida',
    },
    {
      foodId: '22',
      name: 'Pollo a la Parrilla',
      servingSize: 200,
      calories: 250,
      foodType: 'comida',
    },
    {
      foodId: '23',
      name: 'Tortilla Española',
      servingSize: 150,
      calories: 180,
      foodType: 'comida',
    },
    {
      foodId: '24',
      name: 'Mango',
      servingSize: 150,
      calories: 60,
      foodType: 'comida',
    },
    {
      foodId: '25',
      name: 'Café con Leche',
      servingSize: 350,
      calories: 250,
      foodType: 'bebida',
    },
  ],
  tasks: [
    {
      foodReference: '1',
      description: 'Consumir 5 tazas de Arroz',
      pointsAwarded: 8,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '2',
      description: 'Consumir 4 presas de Carne Asada',
      pointsAwarded: 9,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '3',
      description: 'Consumir 6 huevos',
      pointsAwarded: 7,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '4',
      description: 'Consumir 2 rebanadas de Pan Integral',
      pointsAwarded: 4,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '5',
      description: 'Tomar 3 vasos de Agua Mineral',
      pointsAwarded: 5,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '6',
      description: 'Consumir 5 tazas de Paella',
      pointsAwarded: 8,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '7',
      description: 'Tomar 4 vasos de Leche Deslactosada',
      pointsAwarded: 6,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '8',
      description: 'Consumir 3 sándwiches de Jamón y Queso',
      pointsAwarded: 7,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '9',
      description: 'Consumir 5 presas de Pescado a la Parrilla',
      pointsAwarded: 8,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '10',
      description: 'Consumir 3 tacos de Pollo',
      pointsAwarded: 5,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '11',
      description: 'Tomar 6 vasos de Té de Manzanilla',
      pointsAwarded: 9,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '12',
      description: 'Consumir 4 naranjas',
      pointsAwarded: 6,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '13',
      description: 'Consumir 3 vasos de Yogur Natural',
      pointsAwarded: 7,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '14',
      description: 'Tomar 2 cafés Espresso',
      pointsAwarded: 4,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '15',
      description: 'Consumir 5 tazas de Ensalada César',
      pointsAwarded: 8,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '16',
      description: 'Tomar 2 tazas de Sopa de Tomate',
      pointsAwarded: 3,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '17',
      description: 'Consumir 7 nueces de Macadamia',
      pointsAwarded: 10,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '18',
      description: 'Consumir 3 tostadas con mermelada',
      pointsAwarded: 7,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '19',
      description: 'Tomar 4 vasos de Tinto',
      pointsAwarded: 6,
      taskType: 'consumo alimentario',
    },
    {
      foodReference: '20',
      description: 'Consumir 5 Fresas',
      pointsAwarded: 8,
      taskType: 'consumo alimentario',
    },
  ],
  routines: [
    {
      name: 'Rutina Vegetariana',
      dietaryPreferences: ['Vegetariano'],
      daysOfWeek: [
        {
          day: 'Lunes',
          foods: [
            { foodItemId: '20', quantity: 3 },
            { foodItemId: '5', quantity: 2 },
          ],
        },
        {
          day: 'Miércoles',
          foods: [
            { foodItemId: '12', quantity: 4 },
            { foodItemId: '16', quantity: 1 },
            { foodItemId: '5', quantity: 4 },
          ],
        },
        {
          day: 'Viernes',
          foods: [
            { foodItemId: '3', quantity: 3 },
            { foodItemId: '11', quantity: 2 },
          ],
        },
      ],
    },
    {
      name: 'Rutina Vegana',
      dietaryPreferences: ['Vegano'],
      daysOfWeek: [
        {
          day: 'Lunes',
          foods: [
            { foodItemId: '20', quantity: 2 },
            { foodItemId: '17', quantity: 3 },
            { foodItemId: '5', quantity: 4 },
          ],
        },
        {
          day: 'Miércoles',
          foods: [{ foodItemId: '5', quantity: 4 }],
        },
        {
          day: 'Viernes',
          foods: [
            { foodItemId: '16', quantity: 1 },
            { foodItemId: '5', quantity: 4 },
          ],
        },
      ],
    },
    {
      name: 'Rutina Regular',
      dietaryPreferences: [],
      daysOfWeek: [
        {
          day: 'Lunes',
          foods: [
            { foodItemId: '1', quantity: 1 },
            { foodItemId: '4', quantity: 3 },
            { foodItemId: '18', quantity: 2 },
          ],
        },
        {
          day: 'Martes',
          foods: [
            { foodItemId: '1', quantity: 1 },
            { foodItemId: '19', quantity: 2 },
            { foodItemId: '8', quantity: 2 },
          ],
        },
        {
          day: 'Miércoles',
          foods: [
            { foodItemId: '1', quantity: 1 },
            { foodItemId: '2', quantity: 1 },
            { foodItemId: '5', quantity: 2 },
          ],
        },
        {
          day: 'Jueves',
          foods: [
            { foodItemId: '1', quantity: 1 },
            { foodItemId: '2', quantity: 1 },
          ],
        },
        {
          day: 'Viernes',
          foods: [
            { foodItemId: '1', quantity: 1 },
            { foodItemId: '18', quantity: 2 },
            { foodItemId: '8', quantity: 1 },
          ],
        },
        {
          day: 'Sábado',
          foods: [
            { foodItemId: '20', quantity: 5 },
            { foodItemId: '2', quantity: 1 },
            { foodItemId: '5', quantity: 4 },
            { foodItemId: '8', quantity: 3 },
          ],
        },
        {
          day: 'Domingo',
          foods: [
            { foodItemId: '4', quantity: 3 },
            { foodItemId: '5', quantity: 3 },
          ],
        },
      ],
    },
    {
      name: 'Rutina Sin Lactosa',
      dietaryPreferences: ['Sin Lactosa'],
      daysOfWeek: [
        {
          day: 'Miércoles',
          foods: [
            { foodItemId: '7', quantity: 2 },
          ],
        },
        {
          day: 'Viernes',
          foods: [
            { foodItemId: '6', quantity: 1 },
            { foodItemId: '11', quantity: 2 },
          ],
        },
        {
          day: 'Domingo',
          foods: [
            { foodItemId: '1', quantity: 2 },
            { foodItemId: '2', quantity: 1 },
          ],
        },
      ],
    },
  ],
};

export default data;
