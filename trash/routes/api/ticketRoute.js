const router = require("express").Router();
const ticketController = require("../../controllers").TicketController;


// Matches with "/api/tickets/:id"
router
    .route('/:userId')
    .get(ticketController.findByUserId)
    .post(ticketController.create);

router
    .route('/:userId/:ticketIndex')
    .put(ticketController.update)
    .delete(ticketController.remove);

module.exports = router;