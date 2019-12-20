const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]

export = require('knex')(config)