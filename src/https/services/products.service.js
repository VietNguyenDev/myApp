import db from "../../models/index.js";
import { abort } from "../../helper/abort.js  ";

export async function getDetail(productId) {
  try {
    const product = await db.models.Product.findByPk(productId);

    if (!product) {
      return abort(404, "Product not found");
    }

    return product;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getList({ limits, page }) {
  const offset = (page - 1) * limits;
  const limit = parseInt(limits);
  console.log("🚀 ~ getList ~ limit:", limit);
  try {
    const products = await db.models.Product.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    return {
      total: products.count,
      data: products.rows,
    };
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function create({ params, productImg }) {
  try {
    const isExistProduct = await db.models.Product.findOne({
      where: {
        productName: params.productName,
      },
    });

    if (isExistProduct) {
      return abort(400, "Product already exists");
    }

    const product = await db.models.Product.create({
      productName: params.productName,
      productDescription: params.productDescription,
      sellingPrice: params.sellingPrice,
      discount: params.discount,
      productImage: productImg,
      productQuantity: params.productQuantity,
      productSize: params.productSize,
      categoryId: params.categoryId,
    });

    return product;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function update(productId, params) {
  try {
    const product = await getDetail(productId);

    if (!product) {
      return abort(404, "Product not found");
    }

    const data = await db.models.Product.update(
      {
        productName: params.productName,
        productDescription: params.productDescription,
        sellingPrice: params.sellingPrice,
        discount: params.discount,
        productImg: params.productImage,
        productQuantity: params.productQuantity,
        productCategoryId: params.productCategoryId,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    return "update success";
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function remove(productId) {
  try {
    const product = await getDetail(productId);

    if (!product) {
      return abort(404, "Product not found");
    }

    await product.destroy();

    return "delete success";
  } catch (error) {
    return abort(500, error.message);
  }
}
