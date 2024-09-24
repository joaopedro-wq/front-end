import { Injectable, EventEmitter } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../api/usuario';
import { HttpPersonService } from './http-person.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usuariosList: User[] = [];
  private formUsuario!: User;

  
  obsListUsuarios: EventEmitter<User[]> = new EventEmitter<User[]>();
  obsLoadUsuario: EventEmitter<User> = new EventEmitter<User>();
  obsSaveUsuario: EventEmitter<any> = new EventEmitter<any>();
  obsDeleteUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpPersonService) {}

  loadUsuarios(): Observable<any> {
    return this.http.get('/api/usuarios').pipe(
      tap((res: any) => {
        if (res.success) {
          this.usuariosList = res.data;
          this.obsListUsuarios.emit(this.usuariosList);
        }
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(() => new Error(error.message || error));
      })
    );
  }

  loadUsuario(id: number): Observable<any> {
    return this.http.get(`/api/usuarios/${id}`).pipe(
     
      tap((res: any) => {
        if (res.success) {
          this.obsLoadUsuario.emit(res.data);
        }
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  createUsuario(formUsuario: User): Observable<any> {
  
    return this.http.post('/api/usuarios', formUsuario).pipe(
     
      tap((res: any) => {
        this.obsSaveUsuario.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  login(formUsuario: User): Observable<any> {
   
    return this.http.post('/api/usuarios/login', formUsuario).pipe(
    
      tap((res: any) => {
        this.obsSaveUsuario.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  updateUsuario(formUsuario: User): Observable<any> {
   
    return this.http.put(`/api/usuarios/${formUsuario.id}`, formUsuario).pipe(
      
      tap((res: any) => {
        this.obsSaveUsuario.emit(res); 
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  deleteUsuario(id: number): Observable<any> {
   
    return this.http.delete(`/api/usuarios/${id}`).pipe(
     
      tap((res: any) => {
        this.obsDeleteUsuario.emit(res);
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  public setformUsuario(formUsuario: User) {
   
    this.formUsuario = formUsuario;
  }
}
