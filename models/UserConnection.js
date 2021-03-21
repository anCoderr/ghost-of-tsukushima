const Sequelize = require('sequelize')

/**
 * Used to manage the external auth connections
 */
const generateUserConnection = (sequelize) => {
  const UserConnection = sequelize.define("tb_user_connection", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    connection_type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["facebook", "github", "google"]]
      }
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    is_complete: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  })
 
  return UserConnection
}


module.exports = generateUserConnection