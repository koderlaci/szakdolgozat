import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.NODE_ENV ? process.env.DATABASE_USERNAME : "ekke-webshop",
  process.env.NODE_ENV ? process.env.DATABASE_USERNAME : "root",
  process.env.NODE_ENV ? process.env.DATABASE_PASSWORD : "",
  {
    host: process.env.NODE_ENV ? process.env.DATABASE_URL : "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
  }
);

export const OrderAddress = sequelize.define(
  "order_address",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      field: "zip_code",
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetName: {
      field: "street_name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetType: {
      field: "street_type",
      type: DataTypes.STRING,
      allowNull: false,
    },
    houseNumber: {
      field: "house_number",
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
