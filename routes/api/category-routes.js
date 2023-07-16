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

router.get("/:id", async (req, res) => {
  try {
    // Find the category with the matching ID, including its associated products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If the category is not found, send a 404 status with a custom message
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // If the category is found, respond with a 200 status and the category data in JSON format
    res.status(200).json(category);
  } catch (err) {
    // If an error occurs during the database query or processing, handle it gracefully
    res.status(500).json({ message: "Internal server error" });
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category using the data in the request body
    const newCategory = await Category.create(req.body);

    // If the newCategory is found, respond with a 200 status and the new category data in JSON format
    res.status(200).json(newCategory);
  } catch (err) {
    // Handle errors by sending a 400 status with a custom message
    res.status(400).json({ message: "creation failed" });
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    // Update the category with the matching ID using the data in the request body
    const updated = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If the category is not found, send a 404 status with a custom message
    // Otherwise, return the updated data
    !updated[0]
      ? res.status(404).json({ message: "id not found" })
      : res.status(200).json(updated);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: "update failed" });
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    // Delete the category with the matching ID
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    // If the category is not found, send a 404 status with a custom message
    // Otherwise, return the deleted data
    !deleted
      ? res.status(404).json({ message: "id not found" })
      : res.status(200).json(deleted);
  } catch (err) {
    // If there is an error, send a 500 status with the error
    res.status(500).json(err);
  }
});

module.exports = router;
