const fields = [
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

class Movie {
    constructor(
        certificate, director, genre, gross,
        imdbRating, metaScore, noOfVotes, overview,
        posterLink, releasedYear, runtime, seriesTitle,
        star1, star2, star3, star4
    ) {
        for (let field of fields) {
            const error = new TypeError(`Required ${field} attribute`);
            error.code = 400;
            if (!field) throw error;
        }

        this.certificate = certificate;
        this.director = director;
        this.genre = genre;
        this.gross = gross;
        this.imdbRating = Number(imdbRating);
        this.metaScore = Number(metaScore);
        this.noOfVotes = Number(noOfVotes);
        this.overview = overview;
        this.posterLink = posterLink;
        this.releasedYear = Number(releasedYear);
        this.runtime = runtime;
        this.seriesTitle = seriesTitle;
        this.star1 = star1;
        this.star2 = star2;
        this.star3 = star3;
        this.star4 = star4;
    }

    setId(id) {
        this.id = id;
    }
}

module.exports = Movie;