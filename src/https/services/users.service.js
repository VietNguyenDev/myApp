import db from "../../models/index.js";
import { abort } from "../../helper/abort.js";

export async function getAllUsers({ limits, page }) {
  const offset = (page - 1) * limits;

  try {
    const users = await db.models.User.findAndCountAll({ limits, offset });

    return {
      total: users.count,
      data: users.rows,
    };
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function getUserById(userId) {
  try {
    const user = await db.models.User.findByPk(userId);
    if (!user) {
      return abort(404, "User not found");
    }
    return user;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function updateUser({ userId, params, avatar }) {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return abort(404, "User not found");
    }

    const data = await db.models.User.update(
      {
        fullName: params.fullName,
        address: params.address,
        phone: params.phone,
        avatar: avatar,
        roleId: params.roleId,
        dateOfBirth: params.dateOfBirth,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return data;
  } catch (error) {
    return abort(500, error.message);
  }
}

export async function removeUser(userId) {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return abort(404, "User not found");
    }

    await user.destroy();
  } catch (error) {
    return abort(500, error.message);
  }
}
