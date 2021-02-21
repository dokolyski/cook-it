export class Ingredient {
  _id: string | undefined;
  name: string;
  quantity: string;

  constructor(name: string, quantity: string) {
    this.name = name;
    this.quantity = quantity;
  }
}
