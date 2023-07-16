const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
    // Retrieve all tags from the database, including their associated products
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    // If tags are found, respond with a 200 status and return the tag data in JSON format
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Tags not found!" });
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find the tag with the matching ID, including its associated products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // If the tag is not found, send a 404 status with a custom message
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }
    // If the tag is found, respond with a 200 status and return the tag data in JSON format
    res.status(200).json(tagData);
  } catch (err) {
    // Handle errors that occurred during the database query or processing by sending a 500 status with a custom message
    res.status(500).json({ message: "Tag not found!" });
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag in the database using the data provided in the request body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Tag creation failed" });
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
     // Update the tag with the matching ID using the data in the request body
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "No tag found with this id!" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Tag update failed" });
  }
});

// delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    // Delete the tag with the matching ID from the database
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "No tag found with this id!" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Tag deletion failed" });
  }
});
// Export the router 
module.exports = router;