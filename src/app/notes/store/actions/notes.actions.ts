import { Action } from '@ngrx/store';
import { Note } from './../../models/note.model';

export const LOAD_NOTE = '[Notes] LOAD_NOTE';
export const LOAD_NOTE_DONE = '[Notes] LOAD_NOTE_DONE';
export const ADD_NOTE = '[Notes] ADD_NOTE';
export const DELETE_NOTE = '[Notes] DELETE_NOTE';
export const SELECT_NOTE = '[Notes] SELECT_NOTE';
export const UPDATE_NOTE = '[Notes] UPDATE_NOTE';
export const SEARCH_NOTE = '[Notes] SEARCH_NOTE';

export class LoadNotes implements Action {
  readonly type = LOAD_NOTE;
}
export class LoadNotesDone implements Action {
  readonly type = LOAD_NOTE_DONE;
  constructor(public payload: Note[]) {}
}

export class AddNotes implements Action {
  readonly type = ADD_NOTE;
  constructor(public payload: Note) {}
}

export class DeleteNote implements Action {
  readonly type = DELETE_NOTE;
  constructor(public payload: number) {}
}

export class SelectNote implements Action {
  readonly type = SELECT_NOTE;
  constructor(public payload: Note) {}
}

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;
  constructor(public payload: { title: string; timestamp: Date; note: Note }) {}
}
export class SearchNote implements Action {
  readonly type = SEARCH_NOTE;
  constructor(public payload: string) {}
}

export type NoteActionType =
  | AddNotes
  | UpdateNote
  | SelectNote
  | DeleteNote
  | SearchNote
  | LoadNotes
  | LoadNotesDone;
