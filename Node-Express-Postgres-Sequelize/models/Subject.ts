import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import User from "./user";
import TeacherSubject from "./teacherSubject";
import StudentSubject from "./StudentSubject";

const Subject = sequelize.define('Subjects', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  // Define associations in your main model file or wherever you initialize Sequelize

User.belongsToMany(Subject, { through: TeacherSubject, foreignKey: 'userId' });
Subject.belongsToMany(User, { through: TeacherSubject, foreignKey: 'subjectId' });

User.belongsToMany(Subject, { through: StudentSubject, foreignKey: 'userId' });
Subject.belongsToMany(User, { through: StudentSubject, foreignKey: 'subjectId' });
  

export default Subject;
