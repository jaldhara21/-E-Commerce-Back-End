const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products,including its associated Category and Tag data
router.get("/", (req, res) => {
  // Find all products in the 'Product' model
  Product.findAll({
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    // Include related data from the 'Category' and 'Tag' models in the response
    include: [
      {
        // Include the 'Category' model data associated with each product
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        // Include the 'Tag' model data associated with each product

        model: Tag,
        attributes: ["id", "tag_name"],
      },
    ],
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get("/:id", (req, res) => {
  // Find one product in the 'Product' model with the given 'id'
  Product.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "product_name", "price", "stock", "category_id"],
    // Include related data from the 'Category' and 'Tag' models in the response
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"], // Specify the attributes of the 'Category' model to include
      },
      {
        model: Tag,
        attributes: ["id", "tag_name"], // Specify the attributes of the 'Tag' model to include
      },
    ],
  })
    // If the product with the given 'id' is found, send the product data as the response
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data in the 'product' model
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all existing 'ProductTag' records related to the product with the given 'id'
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // If an error occurs during the process, send a 400 (Bad Request) response with the error details
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      // Check if the product was found and deleted successfully
      if (!dbProductData) {
        res.status(404).json({ message: "Product Not Found" });
        return;
      }
      // If the product is successfully deleted, send the deleted product data as the response
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
