const  {CONNECTION_STRING}  = process.env;
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgress',
})
module.exports = {
    sequelize
}