import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { IBookmarksState } from './bookmarks-reducer';
import { groupBy } from '../../utils/groupBy';
import { IBookmarksGroup } from '../models/IBookmarksGroup';


export const fs = createFeatureSelector<AppState, IBookmarksState>('bookmarks');
export const getBookmarks = createSelector(fs, s => s.bookmarks);

export const getBookmarkGroups = createSelector(getBookmarks, bookmarks => {
    if (bookmarks == null) {
        return null;
    }
    const groupedMap = groupBy(bookmarks, 'group');
    return Object.keys(groupedMap).map(key => ({name: key, bookmarks: groupedMap[key]} as IBookmarksGroup));
});

export const getBookmarkNames = createSelector(getBookmarks, bookmarks => bookmarks == null ? null : bookmarks.map(b => b.name));

export const getBookmarkGroupNames = createSelector(getBookmarkGroups, groups => {
    if (groups == null) {
        return null;
    }
    return groups.map(gr => gr.name);
});

