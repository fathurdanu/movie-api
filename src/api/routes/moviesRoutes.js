const moviesRoutes = require("express").Router();
const MoviesController = require("../controllers/MoviesController");
const { writeRequestHandler, readRequestHandler } = require('../utils/requestHandler');
const { authorization } = require('../utils/authorization');

moviesRoutes.get('/', async (req, res) => {
    await readRequestHandler(res, async () => {
        return await MoviesController.getMovies(req);
    })
});
moviesRoutes.get('/:id', async (req, res) => {
    await readRequestHandler(res, async () => {
        return await MoviesController.getMovie(req);
    })
});
moviesRoutes.post('/', async (req, res) => {
    await readRequestHandler(res, async () => {
        return await MoviesController.createMovie(req);
    })
});
moviesRoutes.put('/:id', authorization, async (req, res) => {
    await readRequestHandler(res, async () => {
        return await MoviesController.updateMovie(req);
    })
});
moviesRoutes.delete('/:id', authorization, async (req, res) => {
    await readRequestHandler(res, async () => {
        return await MoviesController.deleteMovie(req);
    })
});

module.exports = moviesRoutes;