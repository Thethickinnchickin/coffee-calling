const router = require('express').Router();
const axios = require('axios')


router.get('/countries', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all'
    }

    axios.request(options).then(function (response) {
        
        res.send(response.data)

    }).catch(function (error) {
        console.error(error);
    })

    

})

module.exports = router