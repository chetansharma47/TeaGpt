export interface CoffeeItem {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
  caffeineFact: string;
}

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    price: 3.50,
    description: 'A concentrated shot of pure audacity.',
    emoji: '☕',
    caffeineFact: 'Contains 63mg caffeine. Earl weeps into his Earl Grey.'
  },
  {
    id: 'latte',
    name: 'Latte',
    price: 5.00,
    description: 'Espresso drowned in steamed milk, like your hopes.',
    emoji: '🥛',
    caffeineFact: 'A latte is just coffee with commitment issues.'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    price: 4.75,
    description: 'Equal parts espresso, milk, and hubris.',
    emoji: '☕',
    caffeineFact: 'Named after monks. Earl respects monks slightly less now.'
  },
  {
    id: 'americano',
    name: 'Americano',
    price: 4.00,
    description: 'Espresso diluted with hot water, like your standards.',
    emoji: '🖤',
    caffeineFact: 'Invented to approximate drip coffee. The minimum viable beverage.'
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    price: 5.25,
    description: 'Australians invented this. Earl holds a grudge.',
    emoji: '🤍',
    caffeineFact: '130mg caffeine. Earl is not flat. Earl has dimension and dignity.'
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    price: 6.00,
    description: 'Coffee steeped for 12 hours of cold, calculated disappointment.',
    emoji: '🧊',
    caffeineFact: 'Twice the caffeine. Twice the offense to Earl\'s sensibilities.'
  }
];
