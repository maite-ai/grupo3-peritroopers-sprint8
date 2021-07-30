const db = require('../database/models')
const User = db.User

function userLoggedMiddleware(req, res, next){
	res.locals.isLogged = false;
	if(req.session && req.session.userLogged){
		res.locals.isLogged = true;

		res.locals.userLogged = req.session.userLogged;
	}
	next();
}
 /*async function userLoggedMiddleware(req, res, next) {
	try{
		res.locals.isLogged = false;

        let UserEmailInCookie = req.cookies.userEmail;
        if(UserEmailInCookie){
            let userFromCookie = await db.User.findOne({where: {email: UserEmailInCookie}})

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }

            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
        }
        next();
	}
	catch(error){
		console.log(error);
	}
	
}*/

module.exports=userLoggedMiddleware