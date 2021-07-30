const path = require('path')
const { body } = require('express-validator')
const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail()
    .isLength({ min: 2 }).withMessage('Nombre demasiado corto'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido').bail()
    .isLength({ min: 2 }).withMessage('Apellido demasiado corto'),
    body('birthDate').notEmpty().withMessage('Tienes que poner tu fecha de nacimiento'),
    body('address').notEmpty().withMessage('Tienes que poner tu dirección'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Tienes que escribir un formato de correro válido'),
    body('password')
        .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caracteres').bail()
        .custom(async(confirmPassword, { req }) => {
            const password = req.body.password;
            if(password !== req.body.confirmPassword){
                throw new Error('Las contraseñas no coinciden')
            }
        }),
    body('avatar').custom((value, { req } ) => {
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
    })
]
module.exports = validations