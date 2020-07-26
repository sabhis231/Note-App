import { Note } from './../../models/note.model';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnChanges {
  @Input('notes') notes: Note[];
  @Input('selectedNote') selectedNote: Note;
  @Input('searchData') searchData: string;
  @Output('selectedData') selectedData: EventEmitter<Note> = new EventEmitter<
    Note
  >();

  constructor() {}

  ngOnInit(): void {
    // console.log('%%%%%%%%%%%%%::::::::', this.searchData);
  }

  onSelect(event) {
    this.selectedData.emit(event);
    // console.log(event);
  }
  ngOnChanges() {
    // console.log('%%%%%%%%%%%%%::::::::', this.searchData);
  }
}
