const Sequelize = require('sequelize')

const generateUserProfile = (sequelize) => {
  const UserProfile = sequelize.define("tb_user_profile", {
    profile_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profile_photo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    nationality: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bg_photo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "unknown",
      validate: {
        isIn: [["male", "female", "dont-say", "unknown"]]
      }
    }
  })

  return UserProfile
}

module.exports = generateUserProfile