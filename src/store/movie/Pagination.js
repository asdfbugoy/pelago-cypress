import { types, getParent } from 'mobx-state-tree';

export default types.model({
    min: types.optional(types.number, 1),
    pageLength: types.optional(types.number, 5)
}).views(self => ({
    get page() {
        return getParent(self).params.page ? parseInt(getParent(self).params.page, 10) : 1;
    },
    get max() {
        const max = parseInt(getParent(self).data.totalResults / 10, 10);
        return getParent(self).data.totalResults % 10 > 0 ? max + 1 : max;
    },
    get diff() {
        return Math.floor(self.pageLength / 2);
    },
    get offset() {
        let offset = self.page - self.diff;
        if (offset < self.min) offset = self.min;
        if (self.page + self.diff >= self.max) offset = self.max - (self.diff * 2);
        if (self.max < self.pageLength) offset = self.min;
        return offset;
    },
    get pages() {
        return Array.from({ length: self.max > self.pageLength ? self.pageLength : self.max }).map((d, i) => i + self.offset);
    }
})).actions(() => ({

}));