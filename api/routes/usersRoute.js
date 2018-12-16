/**
 *  API USER ROUTES
 * 
 *  POST /user/login    {email, password}                                                       log the user in
 * 
 *  POST /user/signup   {email, password, firstName, lastName, phoneNo, carPlate, userImage}    creates a user
 * 
 *  GET /user                                                                                   list all users
 * 
 *  GET /user/{id}                                                                              list a particular user
 * 
 *  PATCH /user/{id}    {email, firstName, lastName, phoneNo, carPlate, userImage}              update a specific user
 * 
 *  DELETE /user/{id}                                                                           delete a specific user
 */

const express   = require('express');
const router    = express.Router();
const multer    = require('multer'); //package to allow file upload, parser for file upload


const checkAuth         = require('../middleware/check-auth'); //middleware to check token and allow access
const userController    = require('../controllers/userController');

const storage = multer.diskStorage({            //executed by multer every time file is received

    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    //reject a file, dont save it cb(null, false)
    //accept the file cb(null, true)
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(new Error('File type not accepted. Only jpeg or png.'), false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 3  //limit file size up to 3 MB
    },
    fileFilter: fileFilter
});

//Register new user
router.post('/signup', upload.single('userImage'), userController.signup);

//Login an existing user
router.post('/login', userController.login);

//List all users
router.get('/', checkAuth, userController.getAll);

//List selected user
router.get('/:userId', checkAuth, userController.getOne);

//Update an existing user
router.patch('/:userId', checkAuth, userController.updateOne);

//Delete an existing user
router.delete('/:userId', checkAuth, userController.deleteOne);

module.exports = router;