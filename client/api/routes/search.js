const router = require('express').Router();

const algoliaSearch = require('algoliasearch');

const client = algoliaSearch(
    "BWJUMGS38I",
    "245ee9b588506da5a9d7ab5ab1d7bb93"
)

//mongoose algolia --> sync document to your algolia database
//algoliasearch ==> search data in your algolia database

const index = client.initIndex('E-COMMERCE-APP');

router.post('/search', async (req, res) => {
    try {
        let results = await index.search(req.body.title);
        for(let i=0; i < results.hits.length; i++) {
            let averageRating = getAverageRating(results.hits[i].rating);
            results.hits[i].averageRating = averageRating;          
        }

        res.json(results.hits);
    } catch (err) {
        res.json(err.message);
    }
})

//accepts array of ratings and 
//:return the average rating of the item
function getAverageRating(ratings) {
    if(ratings.length > 0) {
        let sum = ratings.reduce((total, rating) => {
            return total + rating;
        }, 0);
        return sum / ratings.length;
    }
    return 0;
}

module.exports = router;