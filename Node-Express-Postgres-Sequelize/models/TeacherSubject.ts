import { DataTypes } from "sequelize";
import { sequelize } from "../db";



const TeacherSubject = sequelize.define('TeacherSubject', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Subjects',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
  });
  
 export default TeacherSubject;
  