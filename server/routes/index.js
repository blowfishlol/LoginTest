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

    //FOR LOGINS
    app.post('/api/login', loginController.login);

    //FOR USERS
    app.post('/api/user/create', usersController.create);
    app.post('/api/user/showall', usersController.showAllUsers);
    app.post('/api/user/:userId/showuser', usersController.showUser);

    //FOR TWOOTS
    app.post('/api/twoot/:userId/create',twootsController.create);
    app.post('/api/twoot/:userId/display', twootsController.displayAllTwoots);
    app.post('/api/twoot/:userId/display/:twootId', twootsController.displaySingleTwoot);
    app.post('/api/twoot/update', twootsController.update);
};
