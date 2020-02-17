import React from 'react';
import { types, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import Pagination from './movie/Pagination';
import Params from './movie/Params';
import { Data, Search } from './movie/Data';

const Store = types.model({
    url: 'https://www.omdbapi.com/?',
    loading: types.optional(types.boolean, false),
    advanced: types.optional(types.boolean, false),
    params: types.maybe(Params),
    data: types.maybe(Data),
    types: types.frozen(['movie', 'series', 'episode']),
    pagination: types.maybe(Pagination),
    detailed: types.maybe(Search)
}).views(() => ({

})).actions(self => ({
    afterCreate() {
        self.params = Params.create();
        self.data = Data.create();
        self.pagination = Pagination.create();
        self.detailed = Search.create();
    },
    getQuery(d) {
        return self.url + Object.keys(d)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(d[k]))
            .join('&');
    },
    setAdvanced() {
        self.advanced = !self.advanced;
        self.params = self.advanced ? self.params : Params.create({
            s: self.params.s
        });
    },
    setLoading(v) {
        self.loading = v;
    },
    fetchDetail: flow(function* fetchDetail(id) {
        self.setLoading(true);
        try {
            const response = yield fetch(self.getQuery({ apikey: self.params.apikey, i: id }), {
                // method: 'POST', // or 'PUT'
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(params),
            });

            const data = yield response.json();
            // self.data.Search.map(d => d.setById(data));
            applySnapshot(self.detailed, {
                ...data,
                Response: data.Response === 'True' ? true : false,
            });
            self.setLoading(false);
            return response;
        } catch (error) {
            console.log(error.message);
            applySnapshot(self.detailed, {
                Error: error.message,
                Response: false
            });
            self.setLoading(false);
        }
    }),
    fetchAPI: flow(function* fetchAPI() {
        self.setLoading(true);
        try {
            const response = yield fetch(self.getQuery(getSnapshot(self.params)), {
                // method: 'POST', // or 'PUT'
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(params),
            });

            const d = yield response.json();
            applySnapshot(self.data, {
                ...d,
                totalResults: d.totalResults ? parseInt(d.totalResults, 10) : 0,
                Response: d.Response === 'True' ? true : false,
                Error: d.Error ? d.Error : ''
            });
            self.setLoading(false);

            return response;
        } catch (error) {
            applySnapshot(self.data, {
                totalResults: 0,
                Response: false,
                Error: error.message
            });
            self.setLoading(false);
        }
    })
}));
/**
 * thinking of moving below code to custom hooks
 */
export const store = Store.create();

const StoreContext = React.createContext();

export const Provider = StoreContext.Provider;

export function useMst() {
    const store = React.useContext(StoreContext);
    if (store === null) throw new Error('Store cannot be null, please add a context provider');
    return store;
}