const loginController = require('../controllers').login;
const usersController = require('../controllers').users;
const twootsController = require('../controllers').twoots;
const loginauthController = require('../controllers').loginauth;

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
    //app.post('/api/login', loginController.login);
    app.post('/api/login', loginauthController.login);

    //**********************************************
    //FOR USERS
    //**********************************************

    //bodies: username, password, fullname, birthdate
    app.post('/api/user/create' ,usersController.create);
    //bodies: none required
    app.post('/api/user/showall', loginauthController.auth ,usersController.showAllUsers);
    //bodies: none required
    app.post('/api/user/:userId/showuser',loginauthController.auth , usersController.showUser);
    //bodies: fullname, birthdate (not all required)
    app.post('/api/user/:userId/update',loginauthController.auth , usersController.update);
    //bodies: userId
    app.post('/api/user/delete',loginauthController.auth , usersController.delete);

    //**********************************************
    //FOR TWOOTS
    //**********************************************

    //bodies: content
    app.post('/api/twoot/:userId/create',loginauthController.auth ,twootsController.create);
    //bodies: none required
    app.get('/api/twoot/:userId/display', loginauthController.auth ,twootsController.displayAllTwoots);
    //bodies: none required
    app.get('/api/twoot/:userId/display/:twootId',loginauthController.auth , twootsController.displaySingleTwoot);
    //bodies: twootId, content
    app.post('/api/twoot/update',loginauthController.auth , twootsController.update);
    //bodies: twootId
    app.post('/api/twoot/delete',loginauthController.auth , twootsController.delete);
};
