const router = require("express").Router();
const { Category, Product } = require("../../models");

// Get all categories and their associated products

router.get("/", async (req, res) => {
  try {
    // Use the Category model to find all categories and include their associated products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with a 200 status code and send the retrieved categories as JSON
    res.status(200).json(categories);
  } catch (err) {
    // If an error occurs, respond with a 500 status code and send a custom error message
    res.status(500).json({ message: "not found!" });
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
