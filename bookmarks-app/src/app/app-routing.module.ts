import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';


const routes: Routes = [
  {
    path: '', component: BookmarksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
