const User = require('../models').User;
const md5 = require('md5');

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
            console.log(user);
            //check if the query returns a row.
            if(user === null){
                response.status(400).send({'error': 'No account found'});
            }else{
                response.status(201).send(user);
            }

        })
        .catch(error => {
            response.status(401).send(error)
        });




    },

};
