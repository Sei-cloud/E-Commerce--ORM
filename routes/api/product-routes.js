const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// Get all products, including associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single product by its `id`, including associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // If there are tagIds in the request body, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a product by its `id`
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If there are tagIds in the request body, update associations in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIds = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });
      
      const currentTagIds = productTagIds.map(({ tag_id }) => tag_id);

      const newTagIds = req.body.tagIds
        .filter((tag_id) => !currentTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const removedTagIds = productTagIds
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await ProductTag.destroy({ where: { id: removedTagIds } });
      await ProductTag.bulkCreate(newTagIds);
    }

    res.json(await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag }
      ]
    }));
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a product by its `id`
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id }
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json({ message: 'Product deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
