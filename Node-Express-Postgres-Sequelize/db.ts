import { Sequelize } from 'sequelize'
import dotenv from "dotenv"

dotenv.config()

const db_url = "postgres://postgres:postgres@localhost:5432/auth"

export const sequelize = new Sequelize(db_url)

try {
  sequelize.authenticate()
  console.log('Connection established')
  // Sync models with the database
  sequelize
    .sync()
    .then(() => {
      console.log('Database and tables created')
    })
    .catch((err) => {
      console.error('Error creating tables: ', err)
    })
} catch (e) {
  console.log('Unable to establish connection')
}
