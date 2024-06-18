import Joi from "joi";
import { updateUser } from "../../services/users.service.js";
import { abort } from "../../../helper/abort.js";
import uploadImage from "../../../config/cloudinary.config.js";

async function validate({ userId, params, avatar }) {
  console.log("🚀 ~ validate ~ params:", params);
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      avatar: Joi.string().required(),
      params: Joi.object({
        fullName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        gender: Joi.string().required(),
      }),
    });

    return await schema.validateAsync({ userId, params, avatar });
  } catch (error) {
    return abort(500, "Validate error: " + error.message);
  }
}

export async function updateUserController(req, res) {
  try {
    const { userId } = req.params;
    const params = req.body;

    const file = req.file;
    const image = await uploadImage(file?.path, file?.filename);
    const avatar = image.secure_url;
    await validate({ userId, params, avatar });

    const user = await updateUser({ userId, params, avatar });

    return res.status(200).send({
      message: "Update user success",
      user: user,
    });
  } catch (error) {
    return abort(400, error);
  }
}
