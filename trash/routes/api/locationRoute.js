const router = require("express").Router();
const locationController = require("../../controllers").LocationController;

// Matches with "/api/locations"
router
  .route("/")
  .get(locationController.findAll)
  .post(locationController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(locationController.findById)
  .put(locationController.update)
  .delete(locationController.remove);

module.exports = router;