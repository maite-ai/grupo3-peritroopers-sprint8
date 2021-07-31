const { Product, Brand, Category, Color } = require('../../../database/models');

module.exports = (req, res) => {
    let response = {
        meta: {
            status: 500,
            msg: '',
            count: 0
        },
        data: {
            countByBrand: {},
            list: [],
            countByCategory: {},
            countByColor: {}
        }
    }

    let promises = [
        Product.findAndCountAll({ include: [Brand, Category, Color] }),
        Brand.findAll(),
        Category.findAll(),
        Color.findAll()
    ];

    Promise.all(promises)
    .then(result => {
        let products = result[0];
        let brands = result[1];
        let categories = result[2];
        let colors = result[3];

        brands.forEach(brand => {
            response.data.countByBrand[brand.name] = 0;
        });
        categories.forEach(category => {
            response.data.countByCategory[category.name] = 0;
        });
        colors.forEach(color => {
            response.data.countByColor[color.name] = 0;
        });

        response.data.countByBrand.totalBrands = brands.length;
        response.data.countByCategory.totalCategories = categories.length;
        response.data.countByColor.totalColors = colors.length;
        response.meta.count = products.rows.length;

        response.data.list = products.rows.map(row => {
            response.data.countByBrand[row.brand.name]++;
            row.categories.forEach(category => response.data.countByCategory[category.dataValues.name]++);
            row.colors.forEach(color => response.data.countByColor[color.dataValues.name]++);

            let product = {
                id: row.id,
                name: row.name,
                description: row.description,
                price: row.price,
                //Revisar row.image o row.filename!!
                image: row.image,
                stock: row.stock,
                brands: row.brands.map(band => brand.name),
                categories: row.categories.map(category => category.name),
                colors: row.colors.map(color => color.name),
                url: `http://localhost:3030/api/products/${row.id}`
            }
            return product
        });
        response.meta.status = 200;
        response.meta.msg = 'El listado de productos ha sido mostrado satisfactoria, fabulosisima y fantásticamente.';
        return res.json(response);
    })
    .catch(error => {
        response.meta.msg = 'Error en listar productos *llanto deseperanzador*';
        console.log(error);
        return res.status(500).json(response);
    })
}