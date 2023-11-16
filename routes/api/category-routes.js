const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: Product
  })
  res.json(categories)
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const catID  = req.params.id
  const category = await Category.findByPk(catID, {include: Product})
   res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = req.body
  const newCategory = await Category.create(categoryData)
  res.json(newCategory)
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((updatedCategory) => {
    res.json(updatedCategory)
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteID = req.params.id
  Category.destroy({
    where: {
      id: deleteID
    }
  })
  res.json({
    message: "Category deleted successfully."
  })
});

module.exports = router;
