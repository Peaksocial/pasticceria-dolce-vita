/*
  Our range. Each category is one tab on /our-range, and each item is one card.

  To add a product photo: put the file in public/images/range/ and set the
  item's image to its path, e.g. image: '/images/range/continental-cake.jpg'.
  Items without an image show the logo placeholder.
*/

export interface RangeItem {
  name: string;
  description?: string;
  containsNuts?: boolean;
  image?: string;
}

export interface RangeCategory {
  id: string;
  title: string;
  intro?: string;
  photo?: { src: string; alt: string; width: number; height: number };
  items: RangeItem[];
}

export const range: RangeCategory[] = [
  {
    id: 'large',
    title: 'Large cakes',
    items: [
      { name: 'Continental Cake', description: 'Traditional Italian sponge cake, filled with vanilla and chocolate custard and soaked in liqueur.' },
      { name: 'Tiramisu Cake', description: 'Layers of vanilla sponge and mascarpone cream, soaked in coffee.' },
      { name: 'Black Forest Cake', description: 'Layers of chocolate sponge, cherry jam and fresh cream, soaked in cherry juice.' },
      { name: 'Vanilla Saint Honoré Cake', description: 'Puff pastry shell filled with vanilla custard, topped with vanilla profiteroles.' },
      { name: 'Baked Ricotta Cake', description: 'Baked shortbread pastry filled with sweet ricotta.' },
      { name: 'Baked Nutella Ricotta Cake', description: 'Baked shortbread filled with sweet ricotta and Nutella.', containsNuts: true },
      { name: 'Cookies and Cream Cheesecake', description: 'Creamy cheesecake with Oreos, on an Oreo biscuit base.' },
      { name: 'Chocolate Mud Cake', description: 'Rich but fluffy chocolate mud cake.' },
      { name: 'Caramel Mud Cake', description: 'Vanilla mud cake swirled with caramel.' },
      { name: 'Marble Mud Cake', description: 'Vanilla mud cake swirled with strawberry and chocolate.' },
      { name: 'Fruit Flan', description: 'Shortbread shell filled with vanilla custard, topped with fresh fruit.' },
      { name: 'Lemon Meringue Cake', description: 'Shortbread shell filled with lemon curd, topped with meringue.' },
      { name: 'Custard Log Cake', description: 'Sugared donut filled with vanilla custard.' },
      { name: 'Biscoff Guglhof Cake', description: 'Tea cake mixed and coated with Biscoff spread.' },
      { name: 'Plain Guglhof Cake', description: 'Vanilla and chocolate swirl tea cake, dusted in icing sugar.' },
      { name: 'Apple Pie', description: 'Shortbread pastry filled with apple chunks.' },
    ],
  },
  {
    id: 'small',
    title: 'Small cakes',
    items: [
      { name: 'Vanilla Slice', description: 'Layers of flaky puff pastry and vanilla custard.' },
      { name: 'Sfogliatelle', description: 'Flaky pastry filled with sweet ricotta and orange citrus.' },
      { name: 'Baked Ricotta Cakes', description: 'Baked shortbread pastry filled with sweet ricotta. Other flavours are mixed into the ricotta.' },
      { name: 'Tiramisu Dome', description: 'Layered sponge soaked in coffee, with mascarpone cream and a dusting of cocoa.' },
      { name: 'Custard Tart', description: 'Shortbread pastry filled with custard.' },
      { name: 'Custard Log', description: 'Sugared donut filled with vanilla custard.' },
      { name: 'Fruit Flan', description: 'Shortbread shell filled with vanilla custard, topped with fresh fruit.' },
      { name: 'Lemon Meringue Cake', description: 'Shortbread tart filled with lemon curd, topped with meringue.' },
      { name: 'Biscoff Cheesecake', description: 'Creamy Biscoff cheesecake on a thin layer of crushed Biscoff biscuit.' },
      { name: 'Mars Bar Ricotta Cake', description: 'Shortbread tart filled with sweet ricotta, topped with Nutella and caramel.', containsNuts: true },
      { name: 'Peaches Cake', description: 'Brioche bun soaked in liqueur and filled with vanilla custard.' },
      { name: 'Pavlova Cups', description: 'Layered meringue, fruit and fresh cream.' },
      { name: 'Lamington', description: 'Vanilla sponge dipped in chocolate and coated in coconut.' },
      { name: 'Apple Pie', description: 'Shortbread pastry filled with apple chunks.' },
      { name: 'Apple Turnover', description: 'Folded puff pastry filled with apple chunks.' },
    ],
  },
  {
    id: 'cannoli',
    title: 'Cannoli',
    intro: 'Fried sweet shells, filled with the filling of your choice.',
    photo: { src: '/images/cannoli.jpg', alt: 'A box of cannoli with different fillings, dusted with icing sugar', width: 900, height: 1019 },
    items: [
      { name: 'Ricotta Cannoli' },
      { name: 'Vanilla Cannoli' },
      { name: 'Chocolate Cannoli' },
      { name: 'Pistachio Cannoli', containsNuts: true },
      { name: 'Hazelnut Cannoli', containsNuts: true },
      { name: 'Biscoff Cannoli' },
      { name: 'Bueno Cannoli' },
      { name: 'Cookies and Cream Cannoli' },
      { name: 'Coffee Cannoli' },
      { name: 'Limoncello Cannoli' },
    ],
  },
  {
    id: 'pies',
    title: 'Pies and savoury',
    items: [
      { name: 'Plain Beef Pie', description: 'Tender beef in a flaky pastry crust.' },
      { name: 'Potato and Beef Pie', description: 'A hearty filling of beef and potato in a flaky pastry crust.' },
      { name: 'Beef, Cheese and Bacon Pie', description: 'Tender beef, melted cheese and crispy bacon in a flaky pastry crust.' },
      { name: 'Curry Beef Pie', description: 'Tender beef in a rich curry filling, wrapped in a flaky pastry crust.' },
      { name: 'Pepper Beef Pie', description: 'Tender beef in a rich pepper filling, wrapped in a flaky pastry crust.' },
      { name: 'Mushroom Beef Pie', description: 'Tender beef and mushrooms in a rich filling.' },
      { name: 'Chicken Pie', description: 'Tender chicken in a rich pastry crust.' },
      { name: 'Sausage Roll', description: 'Flaky pastry filled with savoury sausage.' },
      { name: 'Spinach and Ricotta Pastie', description: 'Flaky pastry filled with spinach and creamy ricotta.' },
    ],
  },
];
