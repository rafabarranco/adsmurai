import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory', { logging: false });

class Employee extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public hireDate!: Date;
  public dismissalDate!: Date | null;
  public department!: 'finance' | 'engineering' | 'customer success';
  public salary!: number;
  public picture!: string;
  public role!: 'user' | 'admin' | 'superadmin';
}

Employee.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dismissalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    department: {
      type: DataTypes.ENUM('finance', 'engineering', 'customer success'),
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'superadmin'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
  },
);

export default sequelize;
export { Employee };
