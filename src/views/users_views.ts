import User from '../models/User';
import productsViews from './products_views';

export default {
  render(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      products: productsViews.renderMany(user.products)
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user))
  }
}