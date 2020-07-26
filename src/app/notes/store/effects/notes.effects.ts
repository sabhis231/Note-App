import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromNoteAction from '../actions/notes.actions';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class NotesEffects {
  constructor(private action$: Actions) {}

  @Effect({ dispatch: false })
  saveNotes = this.action$.pipe(
    ofType(fromNoteAction.ADD_NOTE),
    tap((data: fromNoteAction.AddNotes) => {
      let oldLocal = localStorage.getItem('newData');
      let newData = [];
      if (oldLocal) {
        newData = JSON.parse(localStorage.getItem('newData'));
      }
      newData.push(data.payload);
      localStorage.setItem('newData', JSON.stringify(newData));
    })
  );

  @Effect()
  loadNotes = this.action$.pipe(
    ofType(fromNoteAction.LOAD_NOTE),
    map(() => {
      let oldLocal = localStorage.getItem('newData');
      let newData = [];
      if (oldLocal) {
        newData = JSON.parse(localStorage.getItem('newData'));
      }
      return new fromNoteAction.LoadNotesDone(newData);
    })
  );

  @Effect({ dispatch: false })
  updateNotes = this.action$.pipe(
    ofType(fromNoteAction.UPDATE_NOTE),
    tap((data: fromNoteAction.UpdateNote) => {
      let updatedNotes = JSON.parse(localStorage.getItem('newData'));
      //   console.log(updatedNotes);
      //   console.log(data.payload.note.id);
      let index = updatedNotes.findIndex((resData) => {
        // console.log(resData.id !== data.payload.note.id);
        return resData.id === data.payload.note.id;
      });
    //   console.log(index);
      let updateNote = updatedNotes[index];
      updateNote = {
        ...updateNote,
        title: data.payload.title,
        timestamp: new Date(),
      };
      updatedNotes[index] = updateNote;
      localStorage.setItem('newData', JSON.stringify(updatedNotes));
    })
  );
  @Effect({ dispatch: false })
  deleteNotes = this.action$.pipe(
    ofType(fromNoteAction.DELETE_NOTE),
    tap((data: fromNoteAction.DeleteNote) => {
      let updatedNotes = JSON.parse(localStorage.getItem('newData'));
      //   console.log(updatedNotes);
      //   console.log(data.payload.note.id);
      let index = updatedNotes.findIndex((resData) => {
        // console.log(resData.id !== data.payload);
        return resData.id === data.payload;
      });
    //   console.log(index);
      updatedNotes.splice(index, 1);
      //   updateNote = {
      //     ...updateNote,
      //     title: data.payload.title,
      //     timestamp: new Date(),
      //   };
      //   updatedNotes[index] = updateNote;
      localStorage.setItem('newData', JSON.stringify(updatedNotes));
    })
  );
}
