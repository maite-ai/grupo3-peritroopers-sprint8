const path = require('path')
const { body } = require('express-validator')
const validations = [
    body('name').notEmpty().withMessage('Este campo no puede estar vacío aaa').bail()
    .isLength({ min: 5 }).withMessage('Nombre demasiado corto'),
    body('description').notEmpty().withMessage('Este campo no puede estar vacío aaa').bail()
    .isLength({ min: 20 }).withMessage('Falta desarrollo en la descripción del producto...'),
    body('image').custom((value, { req }) => {
        let file = req.file
        let acceptedExtentions = ['.jpg','.jpeg','.png','.gif']
        if(!file){
            throw new Error('Tienes que subir una imágen')
        }else{
            let fileExtention = path.extname(file.originalname)
            if(!acceptedExtentions.includes(fileExtention)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtentions.join(', ')}`)
            }
        }
        return true
    }),
    body('stock').notEmpty().withMessage('Este campo no puede estar vacío aaa'),
    body('price').notEmpty().withMessage('Este campo no puede estar vacío aaa')
]
module.exports = validations