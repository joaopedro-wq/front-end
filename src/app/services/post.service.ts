import { Injectable, EventEmitter } from '@angular/core'; 
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Post } from '../api/post';
import { HttpPersonService } from './http-person.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public postsList: Post[] = []; 
  private formPost!: Post; 

  obsListPosts: EventEmitter<Post[]> = new EventEmitter<Post[]>();
  obsLoadPost: EventEmitter<Post> = new EventEmitter<Post>(); 
  obsSavePost: EventEmitter<any> = new EventEmitter<any>(); 
  obsDeletePost: EventEmitter<any> = new EventEmitter<any>(); 

  constructor(private http: HttpPersonService) {}

  loadPosts(): Observable<any> {
    return this.http.get('/api/postagens').pipe(
    
      tap((res: any) => {
        if (res.success) {
          this.postsList = res.data; 
          this.obsListPosts.emit(this.postsList); 
        }
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(() => new Error(error.message || error));
      })
    );
  }

  loadPost(id: number): Observable<any> {
    return this.http.get(`/api/postagens/${id}`).pipe(
      
      tap((res: any) => {
        if (res.success) {
          this.obsLoadPost.emit(res.data); 
        }
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  createPost(formPost: Post): Observable<any> {
    return this.http.post('/api/postagens', formPost).pipe(
   
      tap((res: any) => {
        this.obsSavePost.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  updatePost(formPost: Post): Observable<any> {
    return this.http.put(`/api/postagens/${formPost.id}`, formPost).pipe(
      
      tap((res: any) => {
        this.obsSavePost.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`/api/postagens/${id}`).pipe(
      
      tap((res: any) => {
        this.obsDeletePost.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  public setformPost(formPost: Post) {
   
    this.formPost = formPost;
  }
}
