import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Teacher','Student'),
      allowNull: false,
      defaultValue: 'Student'
    },
  },
  {
    timestamps: true,
  }
);

export default User;
