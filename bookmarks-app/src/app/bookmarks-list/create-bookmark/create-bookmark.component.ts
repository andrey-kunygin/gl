import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
  FormGroupDirective } from '@angular/forms';
import { nameOf } from '../../utils/nameOf';
import { IBookmark } from '../models/IBookmark';
import { Subscribing } from '../../common/Subscribing';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { getBookmarkGroupNames, getBookmarkNames } from '../bookmarks-store/bookmarks-selectors';
import { takeUntil, map, first, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { createBookmarkAction } from '../bookmarks-store/bookmarks-actions';
import { MatSnackBar } from '@angular/material/snack-bar';

const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrls: ['./create-bookmark.component.scss']
})
export class CreateBookmarkComponent extends Subscribing implements OnInit {
  public readonly customGroupValue = 'custom';

  public bookmarkForm: FormGroup;
  public bookmarkGroupNames = this.store.pipe(select(getBookmarkGroupNames));
  public isCustomGroup$: Observable<boolean>;
  private isCustomGroup: Subject<boolean> = new Subject();
  private bookmarkNames = this.store.pipe(select(getBookmarkNames));
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar) {
    super();
    this.isCustomGroup$ = this.isCustomGroup.asObservable();
  }

  public ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      [nameOf<IBookmark>('name')]:
        new FormControl(null, [Validators.required, Validators.minLength(4)], [this.isNameUniq(this.bookmarkNames)]),
      [nameOf<IBookmark>('url')]: new FormControl(null, [Validators.required, Validators.pattern(urlReg)]),
      [nameOf<IBookmark>('group')]: new FormControl(null, [Validators.required]),
      newGroup: new FormControl(null, [this.getDependantValidator('group')])
    });

    this.bookmarkForm.get(nameOf<IBookmark>('group')).valueChanges
    .pipe(
      takeUntil(this.Unsubscribe),
      map(val => val === this.customGroupValue),
      distinctUntilChanged()
    ).subscribe(isCustom => this.isCustomGroup.next(isCustom));

  }

  public createBookmark(formDir: FormGroupDirective) {
    const formValue = this.bookmarkForm.value;
    const groupKey = nameOf<IBookmark>('group');
    const bookmark: IBookmark = {
      ...formValue,
      group: formValue[groupKey] === this.customGroupValue
        ? formValue.newGroup
        : formValue[groupKey]
    };
    this.store.dispatch(createBookmarkAction({payload: {bookmark}}));
    this.snackBar.open(`Bookmark "${bookmark.name}" was successfully added`, null, { duration: 2000 });
    formDir.resetForm();
    this.bookmarkForm.reset();
  }

  private getDependantValidator(field: string): ValidatorFn {
    return (control: AbstractControl) => {
      const formGroup = control.parent as FormGroup;
      const targetField = formGroup && formGroup.controls[field];
      if (targetField) {
        return targetField.valid && targetField.value === this.customGroupValue
          ? Validators.required(control)
          : {};
      }
      return {};
    };
  }

  private isNameUniq(list: Observable<string[]>): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return list.pipe(
        map(names => {
          return names.map(name => name.toLowerCase()).includes(control.value.toLowerCase())
            ? { nameExist: {value: true}}
            : null;
        }),
        first()
      );
    };
  }

}
