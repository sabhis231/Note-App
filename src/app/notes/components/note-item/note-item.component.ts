import { Note } from './../../models/note.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit, OnChanges {
  @Input('note') note: Note;
  @Input('searchData') searchData: string;
  title: string;
  description: string;

  constructor() {}

  ngOnInit(): void {
    
    let maxlength =
      this.note.title.indexOf('↵') > 0
        ? this.note.title.indexOf('↵')
        : this.note.title.indexOf('\n') > 0
        ? this.note.title.indexOf('\n')
        : this.note.title.indexOf('\r') > 0
        ? this.note.title.indexOf('\n')
        : this.note.title.length;
    this.title =
      maxlength > 0 ? this.note.title.slice(0, maxlength) : 'New Post';
    this.description =
      maxlength === this.note.title.length
        ? 'No Additionl Text'
        : this.note.title.slice(maxlength);
  }
  ngOnChanges() {}
}
