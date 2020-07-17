import { Injectable } from '@angular/core';
import { IBookmark } from '../models/IBookmark';
import { Observable, of } from 'rxjs';
import { dummyBookmarks } from '../../common/dummy-bookmarks';

@Injectable({providedIn: 'root'})
export class BookmarkService {
    public getBookmarks(): Observable<IBookmark[]> {
        return of(dummyBookmarks);
    }
}
