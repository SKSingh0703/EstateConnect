import User from "../models/usermodel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';



export const test = (req,res) =>{
    res.json({
        message:"Hello World",
    });
};

// export const updateUser = async (req,res,next) =>{
//     if(req.user.id !=req.params.id){
//         return next(errorHandler(401,"You can only update your own account"));
//     } 
//     try {
//         if (req.body.password) {
//             req.body.password = bcryptjs.hashSync(req.body.password,10);
//         }
//         const updatedUser = await User.findByIdAndUpdate(req.params.id , {
//             $set : {
//                 username:req.body.username,
//                 email:req.body.email,
//                 password:req.body.password,
//                 avatar:req.body.avatar,
//             }
//         } , { new:true })
//         const { password , ...rest} = updatedUser._doc;
//         res.status(200).json({ rest });
//     } catch (error) {
//         next(error);
//     }
// };


export const updateUser = async (req, res, next) => {
    // Ensure user is updating their own account
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"));
    }

    try {
        // Prepare the update fields
        const updateFields = {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar
        };

        // Hash password if it is being updated
        if (req.body.password) {
            updateFields.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateFields }, 
            { new: true }
        );

        // Check if the user was found and updated
        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        // Exclude password from the response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

