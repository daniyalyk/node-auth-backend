import Subject from "./subject";
import TeacherSubject from "./teacherSubject";
import User from "./user";

User.belongsToMany(Subject, { through: TeacherSubject, foreignKey: 'userId' });
Subject.belongsToMany(User, { through: TeacherSubject, foreignKey: 'subjectId' })