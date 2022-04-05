const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongooseAngolia = require('mongoose-algolia');



const ProductSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner: { type: Schema.Types.ObjectId, ref: 'Owner'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    rating: [Number],
    amountSold: Number
},{
    toObject: {virtuals: true},
    toJSON: {virtuals: true }
})
//Getting the average review ratings for a product
ProductSchema.virtual('averageRating').get(function() {
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => {
            return total + review.rating;
        }, 0);
        return Math.round((sum / this.reviews.length) * 10) / 10;
    }

    return 0;
})

ProductSchema.virtual('percentPerStar').get(function() {
    let index={};

    if(this.reviews.length > 0) {
        const total = this.reviews.length;
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;


        for(let i=0; i < this.reviews.length; i++) {
            if(this.reviews[i].rating === 1) {
                one += 1
            } else if(this.reviews[i].rating === 2) {
                two += 1
            } else if (this.reviews[i].rating === 3) {
                three += 1
            } else if (this.reviews[i].rating === 4){
                four += 1
            } else if(this.reviews[i].rating === 5) {
                five += 1
            } else {
                zero += 1
            }
        }
        let zeroPercentage = Math.floor((zero/total) * 100);
        let onePercentage = Math.floor((one/total) * 100);
        let twoPercentage = Math.floor((two/total) * 100);
        let threePercentage = Math.floor((three/total) * 100);
        let fourPercentage = Math.floor((four/total) * 100);
        let fivePercentage = Math.floor((five/total) * 100);

        index["zero"] = zeroPercentage;
        index["one"] = onePercentage;
        index["two"] = twoPercentage;
        index["three"] = threePercentage;
        index["four"] = fourPercentage;
        index["five"] = fivePercentage;

        return index;

    }
    return index;
})

//Adding algolia account info and using algolia for search
ProductSchema.plugin(mongooseAngolia, {
    appId: "BWJUMGS38I",
    apiKey: "245ee9b588506da5a9d7ab5ab1d7bb93",
    indexName: "E-COMMERCE-APP",

    selector : "title _id photo description price rating owner averageRating",
    populate: {
        path: "owner",
        select: "name"
    },
    debug: true
})

const Model = mongoose.model("Product", ProductSchema);
Model.SyncToAlgolia()
Model.SetAlgoliaSettings({
    searchableAttributes: ["title"]
});

let product
function productSchemaExists() {

    try {
        product = mongoose.model('Product')
    } catch(err) {
        product = mongoose.model('Product', ProductSchema)
    }
}

productSchemaExists();


module.exports = product