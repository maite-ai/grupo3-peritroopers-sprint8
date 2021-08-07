const { Result } = require('express-validator');
const { Product, Brand, Category, Color } = require('../../../database/models');

module.exports = (req, res) => {
    let response = {
        meta: {
            status: 500,
            msg: 'Error en el servidor',
        },
        data: {
            Product:{
                id: 2000,
                name: '',
                description: '',
                price: 200000,
                image: '',
                stock: '',
                brand: [],
                category: [],
                color: [],
            }
        }
    };

    Product.findOne({
        order: [
            ['id', 'DESC']
        ],
        include: [{model: Brand, as: "brands"}, {model: Category, as: "categories"}, {model: Color, as: "colors"}]
    })
    console.log(Product)
    .then(result => JSON.parse(JSON.stringify(result)))
    .then(result => {
        /*==>META<==*/
        response.meta.status = 200
        response.meta.msg = 'Último producto encontrado'

        /*==>DATA<==*/
        response.data.product.id = result.id;
        response.data.product.name = result.name;
        response.data.product.description = result.description;
        response.data.product.price = result.price;
        response.data.product.image = `http://localhost:3030/images/${result.image}`;
        response.data.product.stock = result.stock;
        response.data.product.brand = result.brands.map(brand => brand.name);
        response.data.product.category = result.categories.map(category => category.name);
        response.data.product.color = result.colors.map(color => color.name);
        
        res.json(response)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(response)
    })
}