const { validationResult } = require('express-validator');
const DB = require('../database/models');
const sequelize = DB.sequelize;
const { Op } = require("sequelize");


let productController = {
    home: (req, res) => {
        res.redirect('/');
    },
    list: async (req, res) => {
        try {
            let products = await DB.Product.findAll({
                include: ["brands", "categories", "colors"]
            });
            products = JSON.parse(JSON.stringify(products))
            return res.render('catalogue', { products:products })
        }
        catch(error){
            res.send(error);
        }
    },
    detail: async (req, res) => {
        try{
            const product = await DB.Product.findByPk(req.params.id);
            console.log(product)
            return res.render('productDetail', { product });
        }
        catch(error){
            res.send(error);
        }
    },
    create: async (req, res) => {
        try{
            console.log('llegué al create');
            let productBrand = await DB.Brand.findAll()
            let productCategory = await DB.Category.findAll()
            let productColor = await DB.Color.findAll()
            return res.render('createProduct', {productBrand, productCategory, productColor})
        }
        catch(error){
            res.render('404')
            console.log(error);
        }
    },

    // Función que simula el almacenamiento (?)
    store: async (req, res) => {
        try {
            const resultValidation = validationResult(req)
            if(resultValidation.errors.length>0){
                return res.render('createProduct',{
                    errors:resultValidation.mapped(),
                    oldData:req.body
                }) 
            } 
            console.log('Llegue al store')
            let productToCreate = await DB.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.file.filename,
                stock: req.body.stock,
                brandId: req.body.brandId,
                categoryId: req.body.categoryId,
                colorId: req.body.colorId
            })

            return res.redirect('/');
        }
        catch(error){console.log(error)}
    },

    edit: async (req, res) => {
        try{
            let product = await DB.Product.findByPk(req.params.id);
            console.log(product);
            res.render("editProduct", {product});
        }
        catch(error) {
            res.render('404');
            console.log(error);
        }        
    },

    // Función que realiza cambios en el producto seleccionado. Continuará...
    update: async (req, res) => {
        let product = await req.body;
        product.id = req.params.id;
            product.image = req.file ? req.file.filename : req.body.oldImage;    
            if(req.body.image === undefined) {
                product.image = product.oldImage;
            }

            console.log(product.image);
            console.log(product);

        delete product.oldImage;
        await DB.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stock: req.body.stock,
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            colorId: req.body.colorId
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/');
    },

    destroy: async (req, res) => {
        try {
            console.log("entre al destroy")
            let productId = req.params.id;
            await DB.Product.destroy({ where: { id: productId }, force: true });
            return res.redirect('/')
        }
        catch(error){res.send(error)}
    },

    delete: (req, res) => {
        let productId = req.params.id;
        Product.findByPk(productId).then((products) => {
          return res.render("delete", { products }).catch((error) => {
            console.log(error);
          });
        });
      },

    productCart: (req, res) => { 
        res.render("productCart");
    },

    productDetail: (req, res) => {
        res.render("productDetail");
    },

    search: (req, res) => {
        let dataABuscar = DB
            .findAll({
                where: {
                    name: { [Op.like]: '%' + req.query.keyword + '%' }
                }
            })
            .then(products => {
                if(products.length > 0) {
                    res.render('catalogue', { dataABuscar });
                }
                return res.status(200).json('No se han encontrado resultados para su búsqueda')
            })
    }
}

module.exports = productController