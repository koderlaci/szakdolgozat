import { UserAddress } from "../models/user-address.model.js";
import asyncHandler from "express-async-handler";

export default class AddressController {
  getAllUserAddresses = asyncHandler(async (req, res) => {
    const data = await UserAddress.findAll();
    res.send(data);
  });

  getUserAddressByUserId = asyncHandler(async (req, res) => {
    const data = await UserAddress.findOne({
      where: {
        userId: req.query.userId,
      },
    });
    res.send(data);
  });

  createUserAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    if (
      !req.body.userId ||
      !req.body.country ||
      !req.body.zipCode ||
      !req.body.city ||
      !req.body.streetName ||
      !req.body.streetType ||
      !req.body.houseNumber
    ) {
      responseDto.error = true;
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await UserAddress.create({
        userId: req.body.userId,
        country: req.body.country,
        zipCode: req.body.zipCode,
        city: req.body.city,
        streetName: req.body.streetName,
        streetType: req.body.streetType,
        houseNumber: req.body.houseNumber,
        apartment: req.body.apartment,
        floor: req.body.floor,
        door: req.body.door,
      })
        .then(() => {
          responseDto.message = "Sikeres módosítás!";
          res.send(responseDto);
        })
        .catch((error) => {
          console.log(error);
          responseDto.error = true;
          responseDto.message = "Hiba történt, kérjük próbáld újra.";
          res.send(responseDto);
        });
    }
  });

  editUserAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await UserAddress.update(
      {
        userId: req.body.userId,
        country: req.body.country,
        zipCode: req.body.zipCode,
        city: req.body.city,
        streetName: req.body.streetName,
        streetType: req.body.streetType,
        houseNumber: req.body.houseNumber,
        apartment: req.body.apartment,
        floor: req.body.floor,
        door: req.body.door,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        responseDto.message = "Sikeres módosítás!";
        res.send(responseDto);
      })
      .catch((error) => {
        console.log(error);
        responseDto.error = true;
        responseDto.message = "Hiba történt, kérjük próbáld újra.";
        res.send(responseDto);
      });
  });

  deleteUserAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await UserAddress.destroy({
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
}
