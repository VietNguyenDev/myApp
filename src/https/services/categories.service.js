import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function getAllCategories({ limits, page }) {
  const offset = (page - 1) * limits;
  const limit = parseInt(limits);
  try {
    const categories = await db.models.Category.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    return categories;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getDetailCategory(categoryId) {
  try {
    const category = await db.models.Category.findByPk(categoryId);

    if (!category) {
      return abort(404, "Category not found");
    }

    return category;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function createCategory(categoryName) {
  try {
    const isExistCategory = await db.models.Category.findOne({
      where: {
        categoryName: categoryName,
      },
    });

    if (isExistCategory) {
      return abort(400, "Category already exists");
    }

    const category = await db.models.Category.create({
      categoryName: categoryName,
    });

    return category;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function updateCategory(categoryId, params) {
  try {
    const category = await db.models.Category.findByPk(categoryId);

    if (!category) {
      return abort(404, "Category not found");
    }

    const isExistCategory = await db.models.Category.findOne({
      where: {
        categoryName: params.categoryName,
      },
    });

    if (isExistCategory) {
      return abort(400, "Category already exists");
    }

    const data = await db.models.Category.update(
      {
        categoryName: params.categoryName,
      },
      {
        where: {
          id: categoryId,
        },
      }
    );

    return category;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function deleteCategory(categoryId) {
  try {
    const category = await getDetailCategory(categoryId);

    if (!category) {
      return abort(404, "Category not found");
    }

    await db.models.Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return "delete success";
  } catch (error) {
    return abort(500, error.message);
  }
}
