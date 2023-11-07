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

export const UserOrder = sequelize.define(
  "user_order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    addressId: {
      field: "address_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartId: {
      field: "cart_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliveryMode: {
      field: "delivery_mode",
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    txhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
