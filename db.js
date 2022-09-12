const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers-choice-react-redux"
);

const Color = conn.define("color", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  rgb: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = {
  conn,
  Color,
};
