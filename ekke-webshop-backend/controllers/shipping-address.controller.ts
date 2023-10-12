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
      !req.body.zip_code ||
      !req.body.city ||
      !req.body.street_name ||
      !req.body.street_type ||
      !req.body.house_number
    ) {
      responseDto.error = true;
      responseDto.message = "Kérjük minden adatot adj meg.";
      res.send(responseDto);
    } else {
      await ShippingAddress.create({
        country: req.body.country,
        zip_code: req.body.zip_code,
        city: req.body.city,
        street_name: req.body.street_name,
        street_type: req.body.street_type,
        house_number: req.body.house_number,
        apartment: req.body.apartment,
        floor: req.body.floor,
        door: req.body.door,
      })
        .then(async (result) => {
          const user = await User.findByPk(req.body.user_id);
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
        zip_code: req.body.zip_code,
        city: req.body.city,
        street_name: req.body.street_name,
        street_type: req.body.street_type,
        house_number: req.body.house_number,
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
