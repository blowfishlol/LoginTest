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
                const payload = user.dataValues;
                console.log(payload);
                var token = jwt.sign(payload, jwtsecret, {
                    expiresIn: 60*60*24, //expire in 24 hrs
                });
                response.status(200).send({user,token});

            }

        })
        .catch(error => {
            console.log(error);
            response.status(400).send(error)
        });




    },

    auth(request, response, next) {

        var token = request.body.token || request.query.token || request.headers['x-access-token'];

        if(token) {

            jwt.verify(token, jwtsecret, function (error, decoded) {
                if(error) {
                    response.status(401).send(error)
                }else{
                    request.decoded = decoded;
                    next();
                }
            });

        } else {

            response.status(401).send({
                message: 'No token found.',
            })

        }

    },

    teapot(request,response){
        response.status(418).send({message: 'im a teapot'});
    }

};
