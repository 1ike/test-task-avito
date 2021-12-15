import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryComponent } from './pages/story/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerVerticalComponent } from './components/divider-vertical/divider-vertical.component';
import { RefreshButtonComponent } from './components/refresh-button/refresh-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryComponent,
    DividerVerticalComponent,
    RefreshButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }
