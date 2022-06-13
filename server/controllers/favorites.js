const favoritesModel = require('../models/favorites')
const metaFetcher = require('meta-fetcher')

exports.getFavoriteMetaData = async (req, res) => {
    try {
        res.send(await getMetaData(req.query.url))
    } catch (err) {
        res.status(404).send(err.message)
    }
}

// List of Urls without metaData
exports.getFavorites =  async (req, res) => {
    try {
        res.send(await favoritesModel.getFavorites())
    } catch (err) {
        res.status(404).send(err.message)
    }
}

// List of Urls with metaData
exports.getFavoritesWithMetaData = async (req, res) => {
    try {
        // Get URLS from DB
        const urlList = await favoritesModel.getFavorites()
        let promises = []
        for (const url in urlList) {
             // Get metadata for each URL
            promises.push(getMetaData(urlList[url].url, urlList[url].id))
        }
        const values = await Promise.allSettled(promises)
        //  Res with metadata
        res.send({values, token: req.token})
    } catch (err) {
        res.status(404).send(err.message)
    }
}

exports.addFavorite = async (req, res) => {
    try {
        const result = await getMetaData(req.body.url)
        //URL was not found
        if (!result || !result.metadata) return res.status(404).send('URL was not found')
        // Add this url to DB 
        const addUrl = await favoritesModel.addFavorites(req.body.url)
        // Res with metadata
        if (addUrl.affectedRows > 0) {
            result.id = addUrl.insertId
            return res.status(200).send({message: 'URL was added successfully', metaData: result})
        }
        return res.status(404).send('URL was not found')
    } catch (err) {
        res.send(err.message)
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const deleteUrl = await favoritesModel.deleteFavorite(req.body.id)
        const message = deleteUrl.affectedRows > 0 ? 'Url was deleted successfully' : 'Something went wrong, url was not deleted'
        const status = deleteUrl.affectedRows > 0 ? 200 : 404
        res.status(status).send(message)
    } catch (err) {
        res.send(err.message)
    }
}
// Get metadata by metaFetcher
async function getMetaData(url, id) {
    try {
        const res = await metaFetcher(url)
        res.id = id
        return res
    } catch (err) {
        console.log('Error occurred while getting metadata ' + err.message)
        return 
    }
}