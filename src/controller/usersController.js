const bcryptjs=require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let userController = {
    register: (req, res) => {
        res.render('register');
    },

    processRegister: async (req,res) => {
        try{
            const resultValidation = validationResult(req)
            if(resultValidation.errors.length>0){
                return res.render('register',{
                    errors:resultValidation.mapped(),
                    oldData:req.body
                })
            }
            let userInDB = await db.User.findOne({
                where: {email: req.body.email}
            })

            if(userInDB){
                return res.render('register', {
                    errors:{
                        email:{
                            msg:'Este email ya está registrado'
                        }
                    },
                    oldData:req.body
                })
            }
            let userToCreate = {
                name: req.body.name,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                address: req.body.address,
                email: req.body.email,
                password:bcryptjs.hashSync(req.body.password,10),
                avatar: req.file.filename,
                userCategoryId: 2
            }
            console.log(`USUARIO POR CREARSE:`, {userToCreate});

            let userCreated = await db.User.create(userToCreate);
            console.log(`USUARIO CREADO:`, {userCreated})

            return res.redirect('/users/login');
        }
        catch(error){console.log(error)}
    },

    edit: async (req, res) => {
        try{
            console.log('Llegue al formulario de edición')
            let user = await db.User.findByPk(req.session.userLogged.id);
            console.log(user);
            res.render("userEdit", {user});
        }
        catch(error) {
            res.render('404');
            console.log(error);
        }        
    },
    update: async (req, res) => {
        try {
        console.log('Se está intentando almacenar algo')
        let userUpdated = await db.User.update({
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            avatar:req.file.filename
        },{
            where: {
                id: req.params.id
            }
        })

        return res.redirect('/profile');
    }
        catch(error){
            console.log(error);
        }
   },

    login: (req, res) => {
        res.render('login')
    },
    loginProcess: async (req,res)=>{
        try{
            let userToLog= await db.User.findOne({where: {email: req.body.email}})

        if(userToLog){
            let passValidation=bcryptjs.compareSync(req.body.password,userToLog.password)
            if(passValidation){
                delete userToLog.password
                req.session.userLogged=userToLog

                if(req.body.remember_me){
                    res.cookie('email', req.body.email, {maxAge: (1000*60)*2})
                }
                return res.redirect('/users/profile')
            }
            return res.render('login', {
                errors: {
                    password: {
                        msg: 'Contraseña incorrecta'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'No estás registrado'
                }
            }
        });
        
        }
        catch(error){
            console.log(error);
        }
},
    
    profile:(req,res)=>{
        return res.render('profile',{
            user:req.session.userLogged
        })
    },
    logout:(req,res)=>{
        res.clearCookie('usuario')
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = userController