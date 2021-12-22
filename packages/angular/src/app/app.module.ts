import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoryComponent } from './pages/story/story.component';
import { DividerVerticalComponent } from './components/divider-vertical/divider-vertical.component';
import { RefreshButtonComponent } from './components/refresh-button/refresh-button.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { CommentsComponent } from './pages/story/components/comments/comments.component';
import { CommentComponent } from './pages/story/components/comments/components/comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryComponent,
    DividerVerticalComponent,
    RefreshButtonComponent,
    LayoutComponent,
    CommentsComponent,
    CommentComponent,
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
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatTreeModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
