import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from './../../models/note.model';
import { NotesSandbox } from './../../sandbox/notes.sandbox';
import { NotesService } from './../../service/notes.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-landing-page',
  templateUrl: './notes-landing-page.component.html',
  styleUrls: ['./notes-landing-page.component.scss'],
})
export class NotesLandingPageComponent implements OnInit, OnDestroy {
  constructor(
    private notesSandbox: NotesSandbox,
    private notesService: NotesService
  ) {}

  notes: Note[] = [];
  descriptionData: string;
  selectedNote: Note = null;
  selIndex: number = -1;
  setItem = false;
  lastCount = -1;
  searchData: string = null;
  sub: Subscription[] = [];
  ngOnInit() {
    this.notesSandbox.loadNotes();

    this.sub.push(
      this.notesSandbox.getState().subscribe((stateData) => {
        // console.log(stateData);
        this.notes = [...stateData.notes];
        this.searchData = stateData.searchContent;
        if (this.notes) {
          this.notes.sort((a: Note, b: Note) => {
            return (
              new Date(b['timestamp']).getTime() -
              new Date(a['timestamp']).getTime()
            );
          });
        }
        if (this.lastCount != this.notes.length) {
          this.lastCount = this.notes.length;
          this.onSelectData(this.notes[0]);
        } else if (!this.setItem) {
          this.setItem = true;
          this.selIndex = stateData.selectedNoteIndex;
          this.onSelectData(this.notes[0]);
        }
        let allIds = stateData.notes.map((notesDatat) => notesDatat.id);
        this.notesService.storeAllIds(allIds);
        this.notesService.storeSelectedData(this.notes[0]);
        this.selIndex = stateData.selectedNoteIndex;
      })
    );
  }

  onSelectData(eventData) {
    this.notesSandbox.selectedNotes(eventData);
    this.selectedNote = eventData;
  }
  custom_sort(a, b) {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  }

  ngOnDestroy() {
    //console.log(this.sub);
    this.sub.forEach((s) => s.unsubscribe());
  }
}
