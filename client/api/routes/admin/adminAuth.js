const router = require('express').Router()
const Admin = require('../../models/admin');
const verifyAdminToken = require('../../middlewears/verify-token-admin')

const jwt = require('jsonwebtoken');

// Route to Sign Up as admin
// router.post('/admin/signup', async (req, res) => {
//     if(!req.body.name || !req.body.password) {
//         res.json({
//             success: false,
//             message: "Please Enter Name"
//         })
//     } else {
//         try {
//             let newAdmin = new Admin();
//             newAdmin.name = req.body.name,
//             newAdmin.password = req.body.password
//             await newAdmin.save();
//             let token = jwt.sign(newAdmin.toJSON(), process.env.ADMIN_SECRET, {
//                 expiresIn: 604000 //1 week
//             })
//             res.json({success: true, token: token})      
//         } catch (err) {
//             res.status(500).json({
//                 success: false,
//                 message: err.message
//             })
//         }
//     }
// });

//Route to login as Admin
router.post('/auth/admin/login', async (req, res) => {
    try {
        let foundAdmin = await Admin.findOne({name: req.body.name});
        if (!foundAdmin) {
            res.status(403).json({
                success: false,
                message: "Authenication Failed Admin Not Found"
            })
        } else {
            if(foundAdmin.comparePassword(req.body.password)) {
                let token = jwt.sign(foundAdmin.toJSON(), process.env.ADMIN_SECRET, {
                    expiresIn: 604800 // 1 Week
                })
        

                
                res.json({
                    success: true,
                    token: token
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "Authentication failed password or username is incorrect"
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

})

router.get('/admin', verifyAdminToken, async(req, res) => {
    try {
        let foundAdmin = await Admin.findById(req.decoded._id);
        if(foundAdmin) {
            res.json({
                success: true,
                admin: foundAdmin
            })
        } else {
            res.json({
                success: false,
                message: "No Admin Found"
            })
        }
    } catch(err) {
        res.json({
            success: false,
            message: err.message
        })
    }
 
})

module.exports = router;