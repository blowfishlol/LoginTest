const loginController = require('../controllers').login;
const usersController = require('../controllers').users;
const twootsController = require('../controllers').twoots;

module.exports = (app) => {

    //to allow CORS header
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    //basic bois
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to TWOOTER API',
    }));

    //**********************************************
    //FOR LOGINS
    //**********************************************
    app.post('/api/login', loginController.login);

    //**********************************************
    //FOR USERS
    //**********************************************

    //bodies: username, password, fullname, birthdate
    app.post('/api/user/create', usersController.create);
    //bodies: none required
    app.post('/api/user/showall', usersController.showAllUsers);
    //bodies: none required
    app.post('/api/user/:userId/showuser', usersController.showUser);
    //bodies: fullname, birthdate (not all required)
    app.post('/api/user/:userId/update', usersController.update);
    //bodies: userId
    app.post('/api/user/delete', usersController.delete);

    //**********************************************
    //FOR TWOOTS
    //**********************************************

    //bodies: content
    app.post('/api/twoot/:userId/create',twootsController.create);
    //bodies: none required
    app.get('/api/twoot/:userId/display', twootsController.displayAllTwoots);
    //bodies: none required
    app.get('/api/twoot/:userId/display/:twootId', twootsController.displaySingleTwoot);
    //bodies: twootId, content
    app.post('/api/twoot/update', twootsController.update);
};
