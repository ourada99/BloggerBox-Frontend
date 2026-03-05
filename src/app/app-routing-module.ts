import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostList } from './composants/post-list/post-list';

const routes: Routes = [
  { path: '', component:PostList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
