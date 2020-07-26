import { Note } from './../models/note.model';
import { NotesSandbox } from './../sandbox/notes.sandbox';
import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appcontenteditable]',
  host: {
    '(keyup)': 'onKeyup()',
  },
})
export class Contenteditable {
  @Input('appcontenteditable') model: Note;
  @Output('appcontenteditableChange') update = new EventEmitter();

  /**
   * By updating this property on keyup, and checking against it during
   * ngOnChanges, we can rule out change events fired by our own onKeyup.
   * Ideally we would not have to check against the whole string on every
   * change, could possibly store a flag during onKeyup and test against that
   * flag in ngOnChanges, but implementation details of Angular change detection
   * cycle might make this not work in some edge cases?
   */
  private lastViewModel: string;

  constructor(private elRef: ElementRef, private notesSandbox: NotesSandbox) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (
  //     changes['model'] &&
  //     changes['model'].currentValue != this.lastViewModel
  //   ) {
  //     // console.log("new value");
  //     this.lastViewModel = this.model;
  //     this.refreshView();
  //   }
  // }

  /** This should probably be debounced. */
  onKeyup() {
    // console.log(this.model);
    var value = this.elRef.nativeElement.value;
    this.lastViewModel = value;
    this.notesSandbox.updateNote(value, this.model);
    this.update.emit(value);
  }

  private refreshView() {
    this.elRef.nativeElement.innerText = this.model;
  }
}
