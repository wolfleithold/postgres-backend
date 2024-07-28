const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tags with associated Product data
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tags" });
  }
});

// Get a single tag by its `id` with associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tag" });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tag" });
  }
});

// Update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update tag" });
  }
});

// Delete a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete tag" });
  }
});

module.exports = router;
