import * as fromNoteAction from '../actions/notes.actions';
import { Note } from './../../models/note.model';

export interface State {
  notes: Note[];
  selectedNote: Note;
  selectedNoteIndex: number;
  isNewAdded: boolean;
  isNewlyUpdates: boolean;
  searchContent: string;
}
const initalState: State = {
  notes: [
    {
      title: 'First post 1',
      timestamp: new Date('2014-04-03'),
      id: 1,
    },
    {
      title: 'Second Post',
      timestamp: new Date('2020-04-03'),
      id: 2,
    },
    { title: 'Third Post', timestamp: new Date('2015-04-03'), id: 3 },
  ],
  selectedNote: null,
  selectedNoteIndex: 0,
  isNewAdded: false,
  isNewlyUpdates: false,
  searchContent: null,
};

export function notesReducer(
  state = initalState,
  action: fromNoteAction.NoteActionType
) {
  switch (action.type) {
    case fromNoteAction.LOAD_NOTE_DONE:
      return {
        ...state,
        notes: action.payload,
      };
    case fromNoteAction.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        selectedNote: action.payload,
        selectedNoteIndex: action.payload.id - 1,
        isNewAdded: true,
        searchContent: null,
        isNewlyUpdates: true,
      };
    case fromNoteAction.SELECT_NOTE:
      let currentNote = [...state.notes].findIndex((data) => {
        return data.id === action.payload.id;
      });
      return {
        ...state,
        selectedNote: action.payload,
        selectedNoteIndex: currentNote,
        isNewAdded: false,
      };
    case fromNoteAction.UPDATE_NOTE:
      let updatedNotes = [...state.notes];
      updatedNotes[state.selectedNoteIndex] = {
        id: state.selectedNoteIndex + 1,
        title: action.payload.title,
        timestamp: action.payload.timestamp,
      };
      return {
        ...state,
        notes: updatedNotes,
        isNewAdded: false,
        selectedNote: updatedNotes[state.selectedNoteIndex],
        searchContent: null,
        isNewlyUpdates: false,
      };
    case fromNoteAction.DELETE_NOTE:
      let data = [...state.notes];
      data.splice(state.selectedNoteIndex, 1);
      return {
        ...state,
        notes: data,
        selectedNote: data[data.length - 1],
        selectedNoteIndex: data.length - 1,
        isNewAdded: false,
        searchContent: null,
        isNewlyUpdates: false,
      };
    case fromNoteAction.SEARCH_NOTE:
      return {
        ...state,
        searchContent: action.payload,
      };

    default:
      return state;
  }
}
