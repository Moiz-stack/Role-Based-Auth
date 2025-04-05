const authorizeRoles=(...allowedRoles)=>{

    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                status: "fail",
                message: "You are not allowed to access this route",
            });
        }
        next();
    }

}

module.exports= authorizeRoles;