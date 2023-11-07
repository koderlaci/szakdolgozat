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

export const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
