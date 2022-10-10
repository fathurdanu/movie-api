const Movie = require('../src/api/models/MovieModel');
const movie = new Movie(
    "A",
    "Steve McQueen",
    "Biography, Drama, History",
    "56,671,993",
    8.1,
    96,
    640533,
    "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery.",
    "https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_UX67_CR0,0,67,98_AL_.jpg",
    2013,
    "134 min",
    "12 Years a Slave",
    "Chiwetel Ejiofor",
    "Michael Kenneth Williams",
    "Michael Fassbender",
    "Brad Pitt"
)

const attributes = [
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

test('Movie should be object', () => {
    expect(typeof Movie).toBe('function');
})

let str = `''`;
let variab = '';
attributes.forEach(attribute => {
    test(`Should detect ${attribute} as an invalid`, () => {
        const action = () => eval(`new Movie(${str})`);
        expect(action).toThrow(`Required ${attribute} attribute`);
        variab += variab ? `,'${movie[attribute]}'` : `'${movie[attribute]}'`;
        str = variab + `,''`;
    })
})

attributes.forEach(attribute => {
    test(`Movie should have a ${attribute} attribute`, () => {
        expect(movie[attribute]).toBeDefined();
    })
})


