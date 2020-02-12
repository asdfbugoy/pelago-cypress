
import { types } from 'mobx-state-tree';

export default types.model({
    apikey: '185c5ebb',
    s: types.optional(types.string, ''),
    page: types.optional(types.string, ''),
    y: types.optional(types.string, ''),
    type: types.optional(types.string, '')
}).actions(self => ({
    setParamsByField(n, v) {
        self[n] = v ? v : '';
    }
}));