import * as fromNotes from '../notes/store/reducers/notes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  note: fromNotes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  note: fromNotes.notesReducer,
};
