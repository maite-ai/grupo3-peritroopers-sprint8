const { Product, Brand, Category, Color } = require('../../../database/models');
module.exports = (req, res) => {
    let id = Number(req.params.id);
    Product.findByPk(id, { include: [Brand, Category, Color] })
        .then((product) => {
            let allProductBrands = [];
            product.brands.forEach(brand => {
                allProductBrands.push(brand.name);
            });
            let allProductCategories = [];
            product.categories.forEach(category => {
                allProductCategories.push(category.name);
            });
            let allProductColors = [];
            product.colors.forEach(color => {
                allProductColors.push(color.name);
            });

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
                    brand: allProductBrands,
                    category: allProductCategories,
                    color: allProductColors
                }
            };
            res.json(response);
        })
        .catch(error => {
            res.status(404).send('página no encontrada, sorry bro!')
        })
}