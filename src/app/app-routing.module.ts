import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesLandingPageComponent } from './notes/components/notes-landing-page/notes-landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotesLandingPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
