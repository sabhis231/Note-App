import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteDescriptionComponent } from './notes/components/note-description/note-description.component';
import { NoteHeaderComponent } from './notes/components/note-header/note-header.component';
import { NoteItemComponent } from './notes/components/note-item/note-item.component';
import { NoteListComponent } from './notes/components/note-list/note-list.component';
import { NotesLandingPageComponent } from './notes/components/notes-landing-page/notes-landing-page.component';
import { Contenteditable } from './notes/directives/contenteditable.directive';
import { ResizableDirective } from './notes/directives/resizable.directive';
import { StringSearchShortPipe } from './notes/pipes/string-search-short.pipe';
import { NotesEffects } from './notes/store/effects/notes.effects';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDescriptionComponent,
    NoteItemComponent,
    NotesLandingPageComponent,
    NoteHeaderComponent,
    Contenteditable,
    StringSearchShortPipe,
    ResizableDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([NotesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
