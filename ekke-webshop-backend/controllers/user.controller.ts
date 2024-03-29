import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import CartController from "../controllers/cart.controller.js";
import { Op } from "sequelize";
import sha1 from "sha1";

const cartController = new CartController();

export default class UserController {
  getAllUsers = asyncHandler(async (req, res) => {
    const data = await User.findAll({
      attributes: ["id", "name", "neptun", "email"],
    });
    res.send(data);
  });

  getUserById = asyncHandler(async (req, res) => {
    const data = await User.findOne({
      attributes: ["id", "name", "neptun", "email"],
      where: {
        id: req.query.id,
      },
    });
    res.send(data);
  });

  createUser = asyncHandler(async (req, res) => {
    let responseDto = {
      userId: null,
      isAdmin: false,
      message: null,
    };

    if (
      !req.body.name ||
      !req.body.neptun ||
      !req.body.email ||
      !req.body.password
    ) {
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
      return;
    }

    const neptunAlreadyExists = await User.findOne({
      where: {
        neptun: req.body.neptun,
      },
    });
    if (neptunAlreadyExists) {
      responseDto.message = "A megadott neptun kóddal már létezik felhasználó.";
      res.send(responseDto);
      return;
    }

    const emailAlreadyExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailAlreadyExists) {
      responseDto.message = "A megadott email címmel már létezik felhasználó.";
      res.send(responseDto);
      return;
    }

    await User.create({
      name: req.body.name,
      neptun: req.body.neptun,
      email: req.body.email,
      password: req.body.password,
      permission: 0,
    })
      .then(async (result) => {
        if (result) {
          responseDto.userId = result.getDataValue("id");
          responseDto.message = "Felhasználó sikeresen létrehozva!";
          await cartController.createCartForUser(responseDto.userId);
        }
      })
      .catch((error) => {
        console.log(error);
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  editUser = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    const neptunAlreadyExists = await User.findOne({
      where: {
        id: {
          [Op.not]: req.body.id,
        },
        neptun: req.body.neptun,
      },
    });
    if (neptunAlreadyExists) {
      responseDto.error = true;
      responseDto.message = "A megadott neptun kóddal már létezik felhasználó.";
      res.send(responseDto);
      return;
    }

    const emailAlreadyExists = await User.findOne({
      where: {
        id: {
          [Op.not]: req.body.id,
        },
        email: req.body.email,
      },
    });
    if (emailAlreadyExists) {
      responseDto.error = true;
      responseDto.message = "A megadott email címmel már létezik felhasználó.";
      res.send(responseDto);
      return;
    }

    await User.update(
      {
        name: req.body.name,
        neptun: req.body.neptun,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        responseDto.message = "Sikeres módosítás!";
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  editPassword = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    const passwordValid = await User.findOne({
      where: {
        id: req.body.id,
        password: sha1(req.body.password),
      },
    });
    if (!passwordValid) {
      responseDto.error = true;
      responseDto.message = "Helytelen jelszó!";
      res.send(responseDto);
      return;
    }

    await User.update(
      {
        password: req.body.newPassword,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        responseDto.message = "Sikeres módosítás!";
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  deleteUser = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await User.update(
      {
        name: null,
        neptun: null,
        email: null,
        password: null,
        permission: null,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        responseDto.message = "Sikeres törlés!";
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
      })
      .finally(() => {
        res.send(responseDto);
      });
  });

  login = asyncHandler(async (req, res) => {
    let responseDto = {
      userId: null,
      isAdmin: false,
      message: null,
    };

    if (!req.body.email || !req.body.password) {
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await User.findOne({
        where: {
          email: req.body.email,
          password: sha1(req.body.password),
        },
      })
        .then((result) => {
          if (result) {
            responseDto.userId = result.getDataValue("id");
            responseDto.isAdmin = result.getDataValue("permission") === 1;
          } else {
            responseDto.message = "Helytelen email vagy jelszó!";
          }
        })
        .catch(() => {
          responseDto.message = "Helytelen email vagy jelszó!";
        })
        .finally(() => {
          res.send(responseDto);
        });
    }
  });
}
