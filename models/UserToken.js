const Sequelize = require('sequelize')

const generateUserToken = (sequelize) => {
  const UserToken = sequelize.define("tb_user_token", {
    token_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "unknown",
      validate: {
        isIn: [["forgot-password", "verification", "signin", "unknown"]]
      }
    },
    issued_time: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    ttl: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    expiration_time: {
      type: Sequelize.BIGINT,
      allowNull: false
    }
  })

  return UserToken
}

module.exports = generateUserToken