//DEPRECATED, USE LOGINAUTH INSTEAD.
const User = require('../models').User;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const jwtsecret = require('../config/jwtinfo').secret;

module.exports = {

    //to login
    login(request, response) {


        return User
        .findOne({
            attributes: ['username','fullname', 'birthdate', 'id'],
            where: {
                username: request.body.username,
                password: md5(request.body.password),
            }
        }).then(user => {
            //console.log(user);
            //check if the query returns a row.
            if(user === null){
                response.status(400).send({'message': 'No account found'});
            }else{

                //console.log(user);

                response.status(200).send(user);

            }

        })
        .catch(error => {
            console.log(error);
            response.status(400).send(error)
        });




    },

};
