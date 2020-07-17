import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as BookmarksActions from './bookmarks-actions';
import { BookmarkService } from '../services/bookmark.service';
import { Action } from '@ngrx/store';

@Injectable()
export class BookmarksEffects {

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) {

  }
  public getBookmarksEffect: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
        ofType(BookmarksActions.getBookmarksAction),
        switchMap(() => this.bookmarkService.getBookmarks()
        .pipe(
            map(bookmarks => BookmarksActions.setBookmarksAction({payload: {bookmarks}})),
            catchError(() => EMPTY)
        ))
    )
  );

}
