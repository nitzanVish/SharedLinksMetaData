const mySqlConnection = require('../config/mysql_connection')

exports.getFavorites = async () => {
    try {
        return await getQueries('SELECT * FROM favorites')
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.addFavorites = async (url) => {
    try {
        return await getQueries('INSERT INTO favorites (url) VALUES (?)', url)
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.deleteFavorite = async (id) => {
    try {
        return await getQueries('DELETE FROM favorites WHERE id = ?', id)
    } catch (err) {
        throw new Error(err.message)
    }
}

async function getQueries(queries, values) {
    return new Promise((resolve, reject) => {
        // Get DB connection
        const pool = mySqlConnection.get()

        pool.query({
            sql: queries,
            values: [values]
        }, function (error, results, fields) {
            if (error) {
                reject(error.message)
            }
            resolve(results)
        });
    })
}