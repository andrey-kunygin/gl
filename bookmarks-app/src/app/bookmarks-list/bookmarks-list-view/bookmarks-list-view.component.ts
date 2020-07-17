import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { IBookmarksGroup } from '../models/IBookmarksGroup';
import { Store } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { removeBookmarkAction } from '../bookmarks-store/bookmarks-actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-bookmarks-list-view',
  templateUrl: './bookmarks-list-view.component.html',
  styleUrls: ['./bookmarks-list-view.component.scss']
})
export class BookmarksListViewComponent implements OnInit {

  @Input() public bookmarkGroups: IBookmarksGroup[];
  public expandCollapseMap = {};

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog) { }

  public ngOnInit() {
  }

  public navigateBookmark(url: string) {
    window.open(url, '_blank');
  }

  public removeBookmark(name: string) {
    const dialogRef =  this.dialog.open(ConfirmationComponent, {data: { name }});
    dialogRef.afterClosed()
    .pipe(take(1), filter(res => res))
    .subscribe(_ => {
      this.store.dispatch(removeBookmarkAction({payload: {name}}));
    });
  }

}
