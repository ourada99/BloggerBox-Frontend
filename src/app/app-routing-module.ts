import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPost } from './composants/add-post/add-post';
import { PostList } from './composants/post-list/post-list';

const routes: Routes = [
  { path: '', component: PostList },
  { path: 'add-post', component: AddPost },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
