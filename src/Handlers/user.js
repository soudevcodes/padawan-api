const mongoose = require('mongoose');
const Middy = require('@middy/core')

const UserModel = require('../Models/User');
const Middlewares = require('../Middleware');


const create = async (event) => {

    const conn = await mongoose.connect('mongodb+srv://padawan:padawan@cluster0.oztpgoq.mongodb.net/?retryWrites=true&w=majority');

    const { body } = event;

    const userCreated = await UserModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
    });

    if (!userCreated) {
        Promise.reject({ message: 'não foi possivel criar o usuário' });
    }

    return { data: userCreated };
};

const get = async (event) => {

};


module.exports = {
    create: Middy(create).use([Middlewares.jsonBodyParse, Middlewares.APIResponse]),
}