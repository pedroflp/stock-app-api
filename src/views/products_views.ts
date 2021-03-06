import Product from '../models/Product';

export default {
  render(product: Product) {
    return {
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      updated: product.updated,
    };
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product))
  }
}