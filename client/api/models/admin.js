const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const AdminSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true}
})

AdminSchema.pre('save', function(next) {
    let admin = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(admin.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err)
                }

                admin.password = hash;
                next()
            })
        })
    } else {
        return next();
    }
})

//Comparing inputted login password with admins password for authentication
//returns boolean
//true if password matches 
//false if password doesn't match 
AdminSchema.methods.comparePassword = function(password, next) {
    let admin = this;
    return bcrypt.compareSync(password, admin.password);
}

module.exports = mongoose.model("Admin", AdminSchema);