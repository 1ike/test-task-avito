import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent as Home } from './pages/home/home.component';
import { StoryComponent as Story } from './pages/story/story.component';

const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full', data: { title: 'Hacker news' } },
  { path: ':id', component: Story },
  { path: '**',  redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
