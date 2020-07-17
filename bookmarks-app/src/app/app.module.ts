import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateBookmarkComponent } from './bookmarks-list/create-bookmark/create-bookmark.component';
import { BookmarksListViewComponent } from './bookmarks-list/bookmarks-list-view/bookmarks-list-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { bookmarkReducer } from './bookmarks-list/bookmarks-store/bookmarks-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppState } from './bookmarks-list/models/AppState';
import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './bookmarks-list/bookmarks-store/bookmarks-effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationComponent } from './bookmarks-list/bookmarks-list-view/confirmation/confirmation.component';

const actionsReducerMap: ActionReducerMap<AppState> = {bookmarks: bookmarkReducer};


@NgModule({
  declarations: [
    AppComponent,
    BookmarksListComponent,
    CreateBookmarkComponent,
    BookmarksListViewComponent,
    ConfirmationComponent
  ],
  entryComponents: [ConfirmationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    StoreModule.forRoot(actionsReducerMap),
    EffectsModule.forRoot([BookmarksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
