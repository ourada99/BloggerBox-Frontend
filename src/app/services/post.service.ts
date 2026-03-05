import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { CATEGORIES } from '../data/category';
import { Post, PostCreateInput, POSTS } from '../data/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly postsEndpoint = '/v1/posts';
  private readonly postsStore = new BehaviorSubject<Post[]>(POSTS);

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.postsStore.asObservable();
  }

  createPost(postInput: PostCreateInput): Observable<Post> {
    return this.http
      .post<Post>(this.postsEndpoint, {
        title: postInput.title.trim(),
        content: postInput.content.trim(),
        categoryId: postInput.categoryId,
      })
      .pipe(
        tap((createdPost) => {
          this.postsStore.next([createdPost, ...this.postsStore.value]);
        }),
        catchError(() => {
          const category = CATEGORIES.find(
            (existingCategory) => existingCategory.id === postInput.categoryId,
          );

          if (!category) {
            return throwError(() => new Error('The selected category was not found.'));
          }

          const localPost: Post = {
            id: crypto.randomUUID(),
            title: postInput.title.trim(),
            content: postInput.content.trim(),
            createdDate: new Date(),
            category,
          };

          this.postsStore.next([localPost, ...this.postsStore.value]);
          return of(localPost);
        }),
      );
  }
}
