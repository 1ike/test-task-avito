import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryComponent } from './pages/story/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerVerticalComponent } from './components/divider-vertical/divider-vertical.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryComponent,
    DividerVerticalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }
