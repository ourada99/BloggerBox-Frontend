import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../../data/category';
import { PostCreateInput } from '../../data/post';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  categories$: Observable<Category[]> = of([]);
  submitted = false;

  postForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    categoryId: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.maxLength(2500)]],
  });

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  get title() {
    return this.postForm.controls.title;
  }

  get categoryId() {
    return this.postForm.controls.categoryId;
  }

  get content() {
    return this.postForm.controls.content;
  }

  isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || this.submitted);
  }

  isValid(control: AbstractControl): boolean {
    return control.valid && (control.touched || this.submitted);
  }

  close(): void {
    void this.router.navigate(['/']);
  }

  onSubmit(): void {
    this.submitted = true;
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) {
      this.showToast('error', 'Please review your post');
      return;
    }

    const postCreateInput: PostCreateInput = {
      title: this.title.value,
      categoryId: this.categoryId.value,
      content: this.content.value,
    };

    this.postService.createPost(postCreateInput).subscribe({
      next: () => {
        this.showToast('success', 'Post Submitted Successfully');
        this.postForm.reset({ title: '', categoryId: '', content: '' });
        this.submitted = false;
        void this.router.navigate(['/']);
      },
      error: () => {
        this.showToast('error', 'Unable to submit your post');
      },
    });
  }

  private showToast(icon: SweetAlertIcon, title: string): void {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    void toast.fire({ icon, title });
  }
}
