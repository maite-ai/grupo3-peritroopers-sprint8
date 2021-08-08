const { Product, Brand, Category, Color, Sequelize } = require('../../../database/models');

module.exports = (req, res) => {
    console.log("Entre")
    Product.findOne({
        order: [
            ['id', 'DESC']
        ],
        include: [{model: Brand, as: "brands"}, {model: Category, as: "categories"}, {model: Color, as: "colors"}]
    })
    .then(product => JSON.parse(JSON.stringify(product)))
    .then(product => {
    let response = {
        meta: {
            status: 200,
            msg: 'Último producto creado',
        },
        data: {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: `http://localhost:3030/images/${product.image}`,
            stock: product.stock,
            brand: [product.brands.name],
            category: [product.categories.name],
            color: [product.colors.name],
            }
        };

    res.json(response)
    })
    
    .catch( error => {
        res.send({ error: 'Not found' });
    })
}