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

        //find one twoot first to evaluate the previous value
        return Twoot
        .findOne({
            attributes: ['id','content','userId'],
            where: {
                id: request.params.twootId,
            }
        }).then(twoot => {

            //evaluate if the body of the POST have the content or not
            // if it is blank, it will not change the content
            const newContent = (
                (typeof request.body.fullname === 'undefined'  || request.body.content === "") ?
                twoot.dataValues.content : request.body.content
            );

            //actually updating the twoot
            return Twoot
                .update({
                        content: newContent,
                    },{
                        where: {
                            id: request.body.twootId,
                        }
                    },
                )
                .then(twoot =>{
                    console.log(twoot)
                    response.status(201).send(twoot);
                })
                .catch(error => {throw error});

        })
        .catch(error => {
            response.status(401).send(error)

        });
/*
        if(request.body.content && request.body.twootId){

            const newContent = request.body.content;

            if(newContent===''){
                response.status(200).send({message: 'No updates were made.'})
            }

            return Twoot
                .update({
                        content: request.body.content
                    },{
                        where: {
                            id: request.body.twootId,
                        }
                    },
                )
                .then(twoot =>{
                    console.log(twoot)
                    response.status(201).send(twoot);
                })
                .catch(error => response.status(400).send(error));
        } else {
            response.status(401).send({message: 'Body is not complete'});
            return;
        }
        */

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
    delete(request, response) {

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
