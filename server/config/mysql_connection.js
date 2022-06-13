const mysql = require('mysql')
const config = require('../config/default.json')
let db

module.exports = {
    init: function(){
        if(!db) db = mysql.createPool(config.db);
    },
    get: function() {
      if(!db) throw new Error('The db pool has not been initialized, call init({}) prior to get().')
      return db 
    }
}