import { IBookmark } from 'src/app/bookmarks-list/models/IBookmark';
import { ActionReducer, createReducer, Action, on } from '@ngrx/store';
import * as BookmarksActions from './bookmarks-actions';

export interface IBookmarksState {
    bookmarks: IBookmark[];
}

const initialState: IBookmarksState = {
    bookmarks: null
};

const reducer: ActionReducer<IBookmarksState, Action> = createReducer(initialState,
  on(
    BookmarksActions.getBookmarksAction,
    state => state
  ),
  on(
    BookmarksActions.setBookmarksAction,
    (state, { payload }) => ({
        ...state,
        bookmarks: payload.bookmarks
    })
  ),
  on(
    BookmarksActions.createBookmarkAction,
    (state, { payload }) => ({
      ...state,
      bookmarks: [...state.bookmarks, payload.bookmark]
    })
  ),
  on(
    BookmarksActions.removeBookmarkAction,
    (state, { payload }) => ({
      ...state,
      bookmarks: state.bookmarks.filter(bookmark => bookmark.name !== payload.name)
    })
  )
);

export function bookmarkReducer(state: IBookmarksState, action: Action) {
    return reducer(state, action);
}

