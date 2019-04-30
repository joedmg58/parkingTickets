/**
 *  API TICKETS ROUTE
 * 
 *  GET /tickets                                                                                list all tickets
 * 
 *  GET /tickets/{id}                                                                           list a particular ticket
 * 
 *  GET /tickets/user/{id}                                                                      list all tickets of a given user
 * 
 *  POST /tickets          {userId, date, location, amount, ticketImage}                        creates a new ticket
 * 
 *  PATCH /tickets/{id}    {date, location, amount, ticketImage}                                update a ticket
 * 
 *  DELETE /tickets/{id}                                                                        delete a specific ticket
 * 
 */

const express   = require('express');
const router    = express.Router();
const multer    = require('multer'); //package to allow file upload, parser for file upload


const checkAuth         = require('../middleware/check-auth'); //middleware to check token and allow access
const ticketController    = require('../controllers/ticketController');

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

//Add new ticket
router.post('/', upload.single('ticketImage'), ticketController.create);

//List all tickets
router.get('/', ticketController.getAll);

//List one ticket
router.get('/:id', ticketController.getOne);

//List all tickets of a user
router.get('/user/:userId', ticketController.getAllOfUser);

//Update a ticket
router.patch('/:id', ticketController.update);

//Delete a ticket
router.delete('/:id', ticketController.delete);

module.exports = router;