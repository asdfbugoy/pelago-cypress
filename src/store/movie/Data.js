import { types, applySnapshot } from 'mobx-state-tree';

// const Search = types.model({
//     Title: types.optional(types.string, ''),
//     Year: types.optional(types.string, ''),
//     imdbID: types.optional(types.string, ''),
//     Type: types.optional(types.string, ''),
//     Poster: types.optional(types.string, '')
// });

export const Search = types.model({
    Title: types.optional(types.string, ''),
    Year: types.optional(types.string, ''),
    Rated: types.optional(types.string, ''),
    Released: types.optional(types.string, ''),
    Runtime: types.optional(types.string, ''),
    Genre: types.optional(types.string, ''),
    Director: types.optional(types.string, ''),
    Writer: types.optional(types.string, ''),
    Actors: types.optional(types.string, ''),
    Plot: types.optional(types.string, ''),
    Language: types.optional(types.string, ''),
    Country: types.optional(types.string, ''),
    Awards: types.optional(types.string, ''),
    Poster: types.optional(types.string, ''),
    Ratings: types.frozen(),
    Metascore: types.optional(types.string, ''),
    imdbRating: types.optional(types.string, ''),
    imdbVotes: types.optional(types.string, ''),
    imdbID: types.optional(types.string, ''),
    Type: types.optional(types.string, ''),
    DVD: types.optional(types.string, ''),
    BoxOffice: types.optional(types.string, ''),
    Production: types.optional(types.string, ''),
    Website: types.optional(types.string, ''),
    Response: types.optional(types.boolean, false),
    Error: types.optional(types.string, '')
}).actions(self => ({
    setById(d) {
        applySnapshot(self, d);
    }
}));

export const Data =  types.model({
    Response: types.optional(types.boolean, false),
    totalResults: types.optional(types.number, 0),
    Search: types.array(Search, []),
    Error: types.optional(types.string, '')
}).actions(self => ({
    getById(id) {
        return self.Search.find(d => d.imdbID === id);
    }
}));