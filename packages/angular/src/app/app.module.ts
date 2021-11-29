import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryComponent } from './pages/story/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }
