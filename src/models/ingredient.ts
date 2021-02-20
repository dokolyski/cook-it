export class Ingredient {
  _id: string;
  name: string;
  quantity: string;

  constructor(id: string, name: string, quantity: string) {
    this._id = id;
    this.name = name;
    this.quantity = quantity;
  }
}
