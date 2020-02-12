import { types } from 'mobx-state-tree';

const Search = types.model({
    Title: types.optional(types.string, ''),
    Year: types.optional(types.string, ''),
    imdbID: types.optional(types.string, ''),
    Type: types.optional(types.string, ''),
    Poster: types.optional(types.string, '')
});

export default types.model({
    Response: types.optional(types.boolean, false),
    totalResults: types.optional(types.number, 0),
    Search: types.array(Search, []),
    Error: types.optional(types.string, '')
});