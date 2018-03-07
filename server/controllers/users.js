const User = require('../models').User;
const md5 = require('md5');

module.exports = {

    //to create new account
    create(request, response) {

        //check if pass or username is empty
        if(request.body.password.length <= 0 || request.body.username.length <= 0){
            response.status(400).send({'error': 'Password/Username Empty'});
            return;
        }

        //create a new user
        return User
            .create({
                username: request.body.username,
                password: md5(request.body.password),
                fullname: request.body.fullname,
                birthdate: request.body.birthdate,
            })
            .then(user => response.status(201).send(user))
            .catch(error => response.status(400).send(error));

    },

    showAllUsers(request, response) {


        return User
        .findAll({
            attributes: ['id','username','fullname','birthdate'],
        }).then(user => {

            //gets the first row of the result
            response.status(201).send(user);

        })
        .catch(error => {
            response.status(401).send(error)
        });




    },

    showUser(request, response) {


        return User
        .findOne({
            attributes: ['id','username','fullname','birthdate'],
            where: {
                id: request.params.userId,
            }
        }).then(user => {

            //gets the first row of the result
            response.status(201).send(user);

        })
        .catch(error => {
            response.status(401).send(error)
        });




    },

    //todo update users

}
