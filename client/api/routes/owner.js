const router = require('express').Router();
const Owner = require('../models/owner');

const upload = require('../middlewears/upload-photo');

//POST request - creating a new owner into database
router.post('/owners', upload.single('photo'), async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;

        await owner.save();
        res.json({
            status: true,
            message: 'Sucessfully saved'
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//Get Route getting owner by ID
router.get('/owners/:ownerID', async (req, res) => {
    try {
        let owner = await Owner.findById({_id: req.params.ownerID});

        if(owner) {
            res.json({
                success: true,
                owner: owner
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//GET Request - getting all owners from database
router.get('/owners', async ( req, res) => {
    try{
        let owners = await Owner.find();
        res.json({
            success: true,
            owners: owners
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

//GET Request - Gets specific



module.exports = router;