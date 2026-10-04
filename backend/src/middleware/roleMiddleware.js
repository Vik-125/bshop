// For checking the powers of user, i.e for authorization.

const roleMiddleware = (...allowedRoles) =>{
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({       // 401 - unauthorized
                message : "Authentication required"
            });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({       // 403 - Forbidden ( don't have the power )
                message: "Your are not authorized to perform this action"
            });
        }

        next();
    };
};

export default roleMiddleware;