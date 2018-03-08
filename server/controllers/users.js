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
            .then(user => {
                delete user.dataValues.password;
                delete user.dataValues.updatedAt;
                delete user.dataValues.createdAt;
                response.status(201).send(user);
            })
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

    update(request, response) {


        //this works by first selecting(findOne) the data of the user according to the id
        //then the input will be checked if exists or not
        //if it exists, it will update with the new data
        //if the input is none, or there is no change to the attribute,
        //it will use the old value procured from the first query.
        //STILL NOT SURE IF THIS IS THE CORRECT WAY THOUGH LOL
        return User
        .findOne({
            attributes: ['id','username','fullname','birthdate'],
            where: {
                id: request.params.userId,
            }
        })
        .then(user => {

            //if fullname is given through the HTTP body, it will use the given fullname.
            //if not, it will use the previous user fullname so it does not update to a new value.
            const fullnameNew = (typeof request.body.fullname === 'undefined' || request.body.fullname === "" ? user.dataValues.fullname : request.body.fullname);

            //if birthdate is given it will use the new birthdate as the update value
            //if not, it will use the previous birthdate procured from the database, so it does not update to a new value
            const birthdateNew = (typeof request.body.birthdate ==='undefined' || request.body.birthdate ==="" ? user.dataValues.birthdate : request.body.birthdate);

            //after the value for the update is got, it will execute the update
            return user
                .update({
                    fullname: fullnameNew,
                    birthdate: birthdateNew,
                } , {
                    where: request.params.userId,
                })
                .then(user => response.status(201).send(user))
                .catch(error => {throw error});


        })
        .catch(error => {
            response.status(401).send(error)

        });




    },

    //deleting the user
    delete(request,response){
        return User
            .destroy({
                where: {
                    id: request.body.userId,
                }
            })
            .then(() => response.status(201).send({message: 'delete success'}))
            .catch(error => {
                console.log(error);
                response.status(401).send(error);
            });


    }

}
