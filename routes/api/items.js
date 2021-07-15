const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @description GET All Items
// @access Public
// Instead of using app.get in app.js server, we will use the route from the express.Router method
// Since we defined the route in app.js to /api/items, this would therefore be that starting/home route
// We can use the mongoose sort method to sort out out items by the date descending (look up docs)
router.get("/", (req, res) => {
  Item.find({})
    .sort({ date: -1 })
    .then(foundItems => res.json(foundItems));
});

// @route POST api/items
// @description Create An Item
// @access Public
// - Now we are making a POST request to our route (standards with RESTful API)
//and are creating a new doc to save in our items collection based on our schema
//and showing our saved item in a json format
// - Finally, we will test inside Postman like we did for the GET request and input our Header value content-type and value of application/json
//and we will go into the Body tab and create a one key value JSON pair like how we defined previously
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => console.error(err));
});

// @route POST api/items
// @description Delete An Item
// @access Public
// Have our delete request with an express route param being the id
// From there, we use the below method to locate the id sent in the API and delete
//the corresponding doc from our collections in shoppingListDB and
//send a JSON if successful or an error with 404 status if not
router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
