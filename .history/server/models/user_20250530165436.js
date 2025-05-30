import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


class Users extends Model {}


Users.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 15]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,


  },
  userType: {
    type: DataTypes.ENUM,
    values: ['normal', 'pro'],
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});


export {Users};