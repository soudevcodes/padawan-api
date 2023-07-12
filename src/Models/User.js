const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        selected: false
    }
});

UserSchema.pre('save', async function (next) {
    
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    
    next();
});


module.exports = model('user', UserSchema);