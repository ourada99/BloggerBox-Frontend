import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TopBar } from './components/top-bar/top-bar';
import { provideHttpClient } from '@angular/common/http';
import { AddPost } from './composants/add-post/add-post';
import { PostList } from './composants/post-list/post-list';
import { PostListItem } from './components/post-list-item/post-list-item';

@NgModule({
  declarations: [App, TopBar, PostList, PostListItem, AddPost],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
  bootstrap: [App]
})
export class AppModule { }
