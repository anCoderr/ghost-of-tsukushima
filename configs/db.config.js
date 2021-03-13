const configs = {
  HOST: "localhost",
  PORT: 5432,
  USERNAME: "everrover",
  PASSWORD: "everrover",
  DATABASE: "iced_beer",
  DIALECT: "postgres",
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

// module.exports = {
//   connect: connectDB(),
//   sequelize
// }


module.exports = configs