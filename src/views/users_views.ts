import User from '../models/User';

export default {
  render(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      products: user.products
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user))
  }
}