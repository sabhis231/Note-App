import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesSandbox } from './../../sandbox/notes.sandbox';
import { NotesService } from './../../service/notes.services';

@Component({
  selector: 'app-note-header',
  templateUrl: './note-header.component.html',
  styleUrls: ['./note-header.component.scss'],
})
export class NoteHeaderComponent implements OnInit, OnDestroy {
  constructor(
    private notesSandbox: NotesSandbox,
    private notesService: NotesService
  ) {}
  searchData: string = '';
  blockAdd: boolean = false;
  isDeleteVisible: boolean = false;
  sub: Subscription[] = [];

  ngOnInit(): void {
    this.sub.push(
      this.notesSandbox.getIsNewAddedComplete().subscribe((data) => {
        this.blockAdd = data;
      })
    );
    this.sub.push(
      this.notesSandbox.getNotes().subscribe((notes) => {
        this.isDeleteVisible = notes.length > 0 ? true : false;
      })
    );
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
  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
