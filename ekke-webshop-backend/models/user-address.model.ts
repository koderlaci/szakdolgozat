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

export const UserAddress = sequelize.define(
  "user_address",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    zipCode: {
      field: "zip_code",
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    streetName: {
      field: "street_name",
      type: DataTypes.STRING,
    },
    streetType: {
      field: "street_type",
      type: DataTypes.STRING,
    },
    houseNumber: {
      field: "house_number",
      type: DataTypes.STRING,
    },
    apartment: {
      type: DataTypes.STRING,
    },
    floor: {
      type: DataTypes.STRING,
    },
    door: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
