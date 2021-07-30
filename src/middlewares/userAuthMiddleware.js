function userAuthMiddleware(req,res,next){
    if(req.session.userLogged.userCategoryId != 1){
        return res.redirect('../../users/profile')
    }
    next()
}
module.exports=userAuthMiddleware