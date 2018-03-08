const Twoot = require('../models').Twoot;
const User = require('../models').User;


module.exports = {

    //to create new account
    create(request, response) {
        //create a new user
        return Twoot
            .create({
                content: request.body.content,
                userId: request.params.userId,
            })
            .then(twoot => response.status(201).send(twoot))
            .catch(error => response.status(400).send(error));

    },

    //to update twoots
    //required body: content, twootId
    update(request, response) {

        return Twoot
            .update({
                    content: request.body.content
                },{
                    where: {
                        id: request.body.twootId,
                    }
                },
            )
            .then(twoot => response.status(201).send(twoot))
            .catch(error => response.status(400).send(error));

    },

    //returns 1 user object with a single twoot inside.
    //required body: -
    //using param :twootId , :userId from the route
    displaySingleTwoot(request, response) {

        return User
        .findOne({
            include: [{
                model: Twoot,
                as: 'twoots',
                where: {
                    id: request.params.twootId,
                }
            }],
            where: {
                    id: request.params.userId,
            }
        }).then(user => {
            console.log(user);
            response.status(201).send(user);
        })
        .catch(error => {
            console.log(error);
            response.status(401).send(error);
        });
    },

    //returns all twoots from a users
    //using param :userId
    displayAllTwoots(request, response) {

        return User
        .findOne({
            attributes: ['id','username','fullname','birthdate'],
            include: [{
                model: Twoot,
                as: 'twoots',
            }],
            where: {
                    id: request.params.userId,
            }
        }).then(user => {
            console.log("\n\n\n\n\n\n\n",user, "\n\n\n\n\n\n");
            response.status(201).send(user);
        })
        .catch(error => {
            console.log("\n\n\n\n\n\n\n",error,"\n\n\n\n\n\n\n");
            response.status(401).send(error);
        });
    },

    //delete the twoot specified by the id
    deleteTwoot(request, response) {

        return Twoot
            .destroy({
                where: {
                    id: request.body.twootId,
                }
            })
            .then(() => response.status(201).send({message: 'tweet deletion success'}))
            .catch(error => {response.status(401).send(error)
        });
    }


}
