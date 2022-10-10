const MoviesRepository = require('../../repositories/MoviesRepository');
const MovieModel = require('../models/MovieModel');

class MoviesController {
    static fields = [
        "certificate",
        "director",
        "genre",
        "gross",
        "imdbRating",
        "metaScore",
        "noOfVotes",
        "overview",
        "posterLink",
        "releasedYear",
        "runtime",
        "seriesTitle",
        "star1",
        "star2",
        "star3",
        "star4"
    ]

    static async getMovies(req) {
        const limit = +req.query.limit || 10;
        const after = req.query.after?.replaceAll("%20", " ");
        const before = req.query.before?.replaceAll("%20", " ");

        if (after && before) {
            const error = new Error("Only select one parameter between 'after' and 'before'");
            error.code = 404;
            throw error;
        }

        if (after) {
            const existingAfter = await MoviesRepository.getBySeriesTitle(after);
            if (!existingAfter) {
                const error = new Error("Movie in 'after' parameter not found");
                error.code = 404;
                throw error;
            }
        } else if (before) {
            const existingbefore = await MoviesRepository.getBySeriesTitle(before);
            if (!existingbefore) {
                const error = new Error("Movie in 'before' parameter not found");
                error.code = 404;
                throw error;
            }
        }

        const { records, pagination } = await MoviesRepository.getMany(limit, after, before);
        let result = {
            records: [],
            pagination: {}
        };

        for (let row of records) {
            const obj = this.parse(row)
            obj.setId(row.id);
            result["records"].push(obj)
        };
        result["pagination"] = pagination;
        return result;
    }

    static async getMovie(req) {
        const id = req.params.id;

        const response = await MoviesRepository.getById(id)

        if (!response) {
            throw new Error(`Id not found`);
        } else {
            const obj = this.parse(response);
            obj.setId(id);
            return obj
        }

    }

    static async createMovie(req) {
        const movieObj = this.parse(req.body);
        const response = await MoviesRepository.create(JSON.parse(JSON.stringify(movieObj)));
        return { id: response.id };
    }

    static async updateMovie(req) {
        const id = req.params.id;
        const existingMovie = await MoviesRepository.getById(id);
        if (!existingMovie) {
            const error = new Error(`Id not found`);
            error.code = 404
            throw error;
        } else {
            const movieObj = this.parse(req.body);
            await MoviesRepository.update(id, JSON.parse(JSON.stringify(movieObj)));
            return { message: "Record updated successfully" };
        }
    }

    static async deleteMovie(req) {
        const id = req.params.id;
        const existingMovie = await MoviesRepository.getById(id)
        if (!existingMovie) {
            const error = new Error(`Id not found`)
            error.code = 404
            throw error;
        } else {
            await MoviesRepository.delete(id);
            return { message: "Record deleted successfully" };
        }
    }

    static parse(movie) {
        if (!movie) throw new Error('Required data');

        const {
            certificate, director, genre, gross,
            imdbRating, metaScore, noOfVotes, overview,
            posterLink, releasedYear, runtime, seriesTitle,
            star1, star2, star3, star4
        } = movie;

        const movieObject = new MovieModel(
            certificate, director, genre, gross,
            imdbRating, metaScore, noOfVotes, overview,
            posterLink, releasedYear, runtime, seriesTitle,
            star1, star2, star3, star4
        );

        return movieObject;
    }

}

module.exports = MoviesController;