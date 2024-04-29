export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
  ) {}

  // todo: updateWith
  updateWith({
    description,
    name,
    price,
  }: Partial<Omit<Product, 'id' | 'updateWith'>>) {
    this.description = description ?? this.description;
    this.name = name ?? this.name;
    this.price = price ?? this.price;
  }
}
