"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(product) {
        return {
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            updated: product.updated,
        };
    },
    renderMany(products) {
        return products.map(product => this.render(product));
    }
};
