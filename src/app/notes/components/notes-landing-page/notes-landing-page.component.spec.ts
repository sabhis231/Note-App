import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesLandingPageComponent } from './notes-landing-page.component';

describe('NotesLandingPageComponent', () => {
  let component: NotesLandingPageComponent;
  let fixture: ComponentFixture<NotesLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
