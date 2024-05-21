export type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export const menuSamples: Menu[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 9.99,
    category: 'Pizza',
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pasta',
    price: 12.99,
    category: 'Pasta',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 7.99,
    category: 'Salad',
  },
  {
    id: '4',
    name: 'Beef Burger',
    price: 8.99,
    category: 'Burger',
  },
  {
    id: '5',
    name: 'Sushi Platter',
    price: 15.99,
    category: 'Sushi',
  },
];

