import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CATEGORIES, Category } from '../data/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesEndpoint = '/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesEndpoint)
      .pipe(catchError(() => of(CATEGORIES)));
  }
}
