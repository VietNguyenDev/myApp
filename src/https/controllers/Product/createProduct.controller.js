import Joi from "joi";
import { create } from "../../services/products.service.js";
import { abort } from "../../../helper/abort.js";
import uploadImage from "../../../config/cloudinary.config.js";

async function validate({ params, productImg }) {
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
      productImg: Joi.string().required(),
    });

    return await schema.validateAsync({ params, productImg });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function createController(req, res) {
  try {
    const file = req.file;
    const productImage = await uploadImage(file?.path, file?.filename);
    const productImg = productImage.secure_url;
    const params = req.body;
    await validate({ params, productImg });

    const product = await create({
      params,
      productImg,
    });

    if (product) {
      return res.status(200).send({
        message: "Create product success",
        product: product,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return abort(400, error);
  }
}
