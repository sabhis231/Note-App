import { SelectNote } from './../store/actions/notes.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Note } from './../models/note.model';
import * as fromNotesAction from '../store/actions/notes.actions';

@Injectable({ providedIn: 'root' })
export class NotesSandbox {
  constructor(private store: Store<fromApp.AppState>) {}

  getState() {
    return this.store.select('note');
  }

  getNotes() {
    return this.getState().pipe(
      map((stateData) => {
        return stateData.notes;
      })
    );
  }

  getIsNewAddedComplete() {
    return this.getState().pipe(
      map((stateData) => {
        return stateData.isNewlyUpdates;
      })
    );
  }

  loadNotes() {
    this.store.dispatch(new fromNotesAction.LoadNotes());
  }

  selectedNotes(note: Note) {
    this.store.dispatch(new fromNotesAction.SelectNote(note));
  }

  addNote(note: Note) {
    this.store.dispatch(new fromNotesAction.AddNotes(note));
  }

  deleteNote(id:number) {
    this.store.dispatch(new fromNotesAction.DeleteNote(id));
  }

  searchNote(searchString: string) {
    this.store.dispatch(new fromNotesAction.SearchNote(searchString));
  }

  updateNote(title: string, note: Note) {
    this.store.dispatch(
      new fromNotesAction.UpdateNote({
        title: title,
        timestamp: new Date(),
        note:note
      })
    );
  }
}
