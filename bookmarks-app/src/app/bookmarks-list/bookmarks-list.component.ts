import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './models/AppState';
import { getBookmarksAction } from './bookmarks-store/bookmarks-actions';
import { IBookmarksGroup } from './models/IBookmarksGroup';
import { getBookmarkGroups } from './bookmarks-store/bookmarks-selectors';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit {

  public groups = this.store.pipe(select(getBookmarkGroups));
  constructor(private store: Store<AppState>) { }

  public ngOnInit() {
    this.store.dispatch(getBookmarksAction());
  }

}
