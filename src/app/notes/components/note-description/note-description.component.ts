import { NotesSandbox } from './../../sandbox/notes.sandbox';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Note } from './../../models/note.model';

@Component({
  selector: 'app-note-description',
  templateUrl: './note-description.component.html',
  styleUrls: ['./note-description.component.scss'],
})
export class NoteDescriptionComponent implements OnInit, OnChanges {
  @Output('editing') editing: EventEmitter<void> = new EventEmitter<void>();
  selectedNote: Note;
  title: string = '';
  timestamp;
  searchString: string = null;

  constructor(private notesSandbox: NotesSandbox) {}

  ngOnInit() {
    this.notesSandbox.getState().subscribe((stateData) => {
      this.selectedNote = stateData.selectedNote;
      // console.log(this.selectedNote);
      this.searchString = stateData.searchContent;

      if (this.selectedNote) {
        this.title = this.selectedNote.title.replace(/↵/g, '\n');
        this.timestamp = this.selectedNote.timestamp;
      } else {
        this.title = '';
        this.timestamp = '';
      }
    });
  }
  ngOnChanges() {
    if (this.selectedNote)
      this.title = this.selectedNote.title.replace(/↵/g, '\n');
  }
}
