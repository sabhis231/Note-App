import { Note } from './../models/note.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotesService {
  allIds: number[] = [];
  selectedNote: Note = null;
  //   maxId: Number = 0;

  storeAllIds(ids: number[]) {
    this.allIds = ids;
  }

  storeSelectedData(note: Note) {
    this.selectedNote = note;
  }

  get maxId() {
    return this.allIds.length > 0 ? Math.max(...this.allIds) : 0;
  }

  get currentObjectId() {
    return this.selectedNote.id;
  }
}
