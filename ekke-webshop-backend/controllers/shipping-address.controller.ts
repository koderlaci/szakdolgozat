import { ShippingAddress } from "../models/shipping-address.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export default class ShippingAddressController {
  getAllShippingAddresses = asyncHandler(async (req, res) => {
    const data = await ShippingAddress.findAll();
    res.send(data);
  });

  createShippingAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    if (
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
      await ShippingAddress.create({
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
        .then(async (result) => {
          const user = await User.findByPk(req.body.userId);
          if (user) {
            await user.update({ shipping_address: result.getDataValue("id") });
          } else {
            responseDto.error = true;
            responseDto.message = "A felhasználó nem található.";
          }
        })
        .catch((error) => {
          console.log(error);
          responseDto.error = true;
          responseDto.message = "Hiba történt, kérjük próbáld újra.";
        })
        .finally(() => {
          res.send(responseDto);
        });
    }
  });

  editShippingAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await ShippingAddress.update(
      {
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

  deleteShippingAddress = asyncHandler(async (req, res) => {
    let responseDto = {
      error: false,
      message: null,
    };

    await ShippingAddress.destroy({
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
