const Sequelize = require('sequelize')

const generateUserFile = sequelize => UserFile = sequelize.define("tb_user_file", {
  file_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    unique: false
  },
  file_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  file_type: {
    type: Sequelize.STRING,
    allowNull: true
  },
  access: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["public", "private", "static"]]
    }
  }
})

module.exports = generateUserFile