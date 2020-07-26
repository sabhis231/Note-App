import { NotesService } from './../../service/notes.services';
import { NotesSandbox } from './../../sandbox/notes.sandbox';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-header',
  templateUrl: './note-header.component.html',
  styleUrls: ['./note-header.component.scss'],
})
export class NoteHeaderComponent implements OnInit {
  constructor(
    private notesSandbox: NotesSandbox,
    private notesService: NotesService
  ) {}
  searchData: string = '';
  blockAdd: boolean = false;
  isDeleteVisible: boolean = false;

  ngOnInit(): void {
    this.notesSandbox.getIsNewAddedComplete().subscribe((data) => {
      this.blockAdd = data;
    });
    this.notesSandbox.getNotes().subscribe((notes) => {
      this.isDeleteVisible = notes.length > 0 ? true : false;
    });
  }

  addNewPost() {
    this.notesSandbox.addNote({
      title: '',
      timestamp: new Date(),
      id: this.notesService.maxId + 1,
    });
  }
  deletePost() {
    this.notesSandbox.deleteNote(this.notesService.currentObjectId);
  }
  onSearch() {
    this.notesSandbox.searchNote(this.searchData);
  }
}
