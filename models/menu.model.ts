export type Menu = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export const menuSamples: Menu[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 9.99,
    category: 'Pizza',
    image: 'https://example.com/pizza1.jpg',
  },
  {
    id: '2',
    name: 'Chicken Alfredo Pasta',
    price: 12.99,
    category: 'Pasta',
    image: 'https://example.com/pasta1.jpg',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 7.99,
    category: 'Salad',
    image: 'https://example.com/salad1.jpg',
  },
  {
    id: '4',
    name: 'Beef Burger',
    price: 8.99,
    category: 'Burger',
    image: 'https://example.com/burger1.jpg',
  },
  {
    id: '5',
    name: 'Sushi Platter',
    price: 15.99,
    category: 'Sushi',
    image: 'https://example.com/sushi1.jpg',
  },
];

