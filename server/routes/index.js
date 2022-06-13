const favoritesController = require('../controllers/favorites')
const validUrl = require('valid-url');
module.exports = function (app) {

    // Get URL with metaData
    app.get('/favoriteMetadata', async (req, res) => {
        // URL validation
        if(!req.query.url) return res.status(422).send('No URL provided') //422 - Unprocessable Entity
        if(!validUrl.isWebUri(req.query.url)) return res.status(400).send('Bad Request - Invalid URL')

        await favoritesController.getFavoriteMetaData(req, res)
    })

    // URLS list
    app.get('/favorites', async (req, res) => {
        await favoritesController.getFavorites(req, res, app)
    })

    // URLs with metaData
    app.get('/favoritesMetadata', async (req, res) => {
        await favoritesController.getFavoritesWithMetaData(req, res)
    })

    // Add new URL
    app.post('/favorites', async (req, res) => {
        // URL validation
        if (!req.body.url) return res.status(422).send('No URL provided')  
        if(!validUrl.isWebUri(req.body.url)) return res.status(400).send('Invalid URL')

        await favoritesController.addFavorite(req, res)
    })

    // Delete URL
    app.delete('/favorites', async (req, res) => {
        // ID validation
        if (!req.body.id || !Number.isInteger(req.body.id)) return res.status(400).send('Invalid ID')
    
        await favoritesController.deleteFavorite(req, res)
    });
}