import Joi from "joi";
import { update } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";
import uploadImage from "../../../config/cloudinary.config.js";

async function validate({ productId, params, productImg }) {
  try {
    const schema = Joi.object({
      params: Joi.object({
        productName: Joi.string().required(),
        sellingPrice: Joi.number().required(),
        productDescription: Joi.string().required(),
        categoryId: Joi.number().required(),
        productQuantity: Joi.number().required(),
        productSize: Joi.string().required(),
        discount: Joi.number().required(),
      }),
      productId: Joi.number().required(),
      productImg: Joi.string().required(),
    });

    return await schema.validateAsync({ productId, params, productImg });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateController(req, res) {
  try {
    const file = req.file;
    const productImage = await uploadImage(file?.path, file?.filename);
    const productImg = productImage.secure_url;
    const { productId } = req.params;
    const params = req.body;
    await validate({ productId, params, productImg });
    const product = await update(productId, params, productImg);

    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
