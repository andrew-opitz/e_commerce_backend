const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
const tags = await Tag.findAll({
  include: Product
})
res.json(tags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagID = req.params.id
  const tag = await Tag.findByPk(tagID,
    {include: Product})
    res.json(tag)
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagData = req.body
  const newTag = await Tag.create(tagData)
  res.json(newTag)
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then((tag) => {
    res.json(tag)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const deleteID = req.params.id
  Tag.destroy({
    where: {
      id: deleteID
    }
  })
  res.json({
    message: "Category deleted successfully."
  })
});

module.exports = router;
