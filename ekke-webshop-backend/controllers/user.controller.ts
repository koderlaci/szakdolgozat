import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import sha1 from "sha1";

export default class UserController {
  getAllUsers = asyncHandler(async (req, res) => {
    const data = await User.findAll();
    res.send(data);
  });

  createUser = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    if (
      !req.body.name ||
      !req.body.neptun ||
      !req.body.email ||
      !req.body.password
    ) {
      responseDto.error = true;
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await User.create({
        name: req.body.name,
        neptun: req.body.neptun,
        email: req.body.email,
        password: req.body.password,
        permission: 0,
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          responseDto.error = true;
          switch (error.code) {
            case "ER_DUP_ENTRY":
              responseDto.message =
                "A megadott adatokkal már létezik felhasználó.";
              break;
            default:
              responseDto.message = "Hiba történt, kérjük próbáld újra.";
          }
        })
        .finally(() => {
          res.send(responseDto);
        });
    }
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
      authenticated: false,
      message: null,
    };

    if (!req.body.email || !req.body.password) {
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await User.findAll({
        where: {
          email: req.body.email,
          password: sha1(req.body.password),
        },
      })
        .then((result) => {
          console.log(result);
          responseDto.authenticated = true;
        })
        .catch((error) => {
          responseDto.message = "Helytelen email vagy jelszó!";
        })
        .finally(() => {
          res.send(responseDto);
        });
    }
  });

  // getShippingAddressByUserId = asyncHandler(async (req, res) => {
  //   const data = await User.findAll({
  //     where: {

  //     }
  //   });
  //   res.send(data);
  // });
}
