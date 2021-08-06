const { Product, Brand, Category, Color } = require('../../../database/models');

module.exports = (req, res) => {
    let id = Number(req.params.id);

    Product.findByPk(id, { include: [{model: Brand, as: "brands"},  {model: Category, as: "categories"}, {model: Color, as: "colors"}] })
    .then((product) => {
        if(product) {
            let response = {
                meta: {
                    status: 200
                },
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    //revisar image!!
                    image: product.image,
                    stock: product.stock,
                    brand: [product.brands.name],
                    category: [product.categories.name],
                    color: [product.colors.name],
                    url_image: req.headers.host + '/images/' + product.image,
                }
            };
            res.json(response);
        } else {
            res.status(404).json({
                meta: {
                    status: 404,
                    msg: 'Producto no existente'
                },
                data: []
            });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(404).send(error)
    })
}