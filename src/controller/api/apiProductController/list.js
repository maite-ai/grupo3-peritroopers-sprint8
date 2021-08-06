const { Product, Brand, Category, Color } = require('../../../database/models');

module.exports = (req, res) => {
    let response = {
        meta: {
            status: 500,
            msg: '',
            count: [],
            countByCategory: [],
        },
        data: {
            list: [],
        }
    }

    let promise = 
        Product.findAndCountAll({ include: [{model: Brand, as: "brands"},  {model: Category, as: "categories"}, {model: Color, as: "colors"}] });

    promise
    .then(result => { 
        let productosListados = []
        result.rows.forEach(product => {
            productosListados.push({
                id: product.id,
                name: product.name,
                description: product.description,
                brand: [product.brands.name],
                category: [product.categories.name],
                color: [product.colors.name],
                url: `http://localhost:3030/api/products/${product.id}`
            })
        })
        let categoryCounter = {}
        result.rows.forEach(product => {
            if(!categoryCounter[product.categories.name]){
                categoryCounter[product.categories.name] = 1}
            else{
            categoryCounter[product.categories.name]++
            }
        })
        response.meta.status = 200;
        response.data.list = productosListados;
        response.meta.count = productosListados.length
        response.meta.countByCategory = categoryCounter
        res.json(response)
    })
    .catch(error =>{
        response.meta.msg = error
        res.json(response)
    })
}