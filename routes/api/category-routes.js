const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get all categories with associated Products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get categories" });
  }
});

// Get one category by its `id` value with associated Products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get category" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create category" });
  }
});

// Update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update category" });
  }
});

// Delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete category" });
  }
});

module.exports = router;
