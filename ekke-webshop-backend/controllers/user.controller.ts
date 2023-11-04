import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import CartController from "../controllers/cart.controller.js";
import sha1 from "sha1";

const cartController = new CartController();

export default class UserController {
  getAllUsers = asyncHandler(async (req, res) => {
    const data = await User.findAll();
    res.send(data);
  });

  getUserById = asyncHandler(async (req, res) => {
    const data = await User.findOne({
      where: {
        id: req.query.id,
      },
    });
    res.send(data);
  });

  createUser = asyncHandler(async (req, res) => {
    let responseDto = {
      userId: null,
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

    await User.update(
      {
        name: req.body.name,
        neptun: req.body.neptun,
        email: req.body.email,
        password: req.body.password,
        permission: 0,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        console.log(result);
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

    await User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        console.log(result);
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
