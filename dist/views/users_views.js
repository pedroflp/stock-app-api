"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_views_1 = __importDefault(require("./products_views"));
exports.default = {
    render(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            products: products_views_1.default.renderMany(user.products)
        };
    },
    renderMany(users) {
        return users.map(user => this.render(user));
    }
};
