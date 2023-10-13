import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("ekke-webshop", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

export const ShippingAddress = sequelize.define(
  "shipping_address",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apartment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    door: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
