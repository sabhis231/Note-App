import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDescriptionComponent } from './note-description.component';

describe('NoteDescriptionComponent', () => {
  let component: NoteDescriptionComponent;
  let fixture: ComponentFixture<NoteDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
