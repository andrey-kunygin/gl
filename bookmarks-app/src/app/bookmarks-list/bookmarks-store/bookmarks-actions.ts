import { createAction, props } from '@ngrx/store';
import { IBookmark } from '../models/IBookmark';
export const getBookmarksAction = createAction(
    '[Bookmarks] Get Bookmarks'
);

export const setBookmarksAction = createAction(
    '[Bookmarks] Set Bookmarks',
    props<{payload: {bookmarks: IBookmark[]}}>()
);

export const createBookmarkAction = createAction(
    '[Bookmarks] Create Bookmark',
    props<{payload: {bookmark: IBookmark}}>()
);

export const removeBookmarkAction = createAction(
    '[Bookmarks] Remove Bookmark',
    props<{payload: {name: string}}>()
);
