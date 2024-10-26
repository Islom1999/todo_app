import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { ITodo } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _dataSubject = new BehaviorSubject<ITodo[]>([]);
  readonly _data: Observable<ITodo[]> = this._dataSubject.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.loadAllTasks()
  }

  loadAllTasks(){
    this.http.get<ITodo[]>(`${this.apiUrl}/tasks`)
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
        }),
        catchError(this.handleError<ITodo[]>('getAllTasks', []))
      ).subscribe();
  }

  // GET: Barcha vazifalarni olish
  getAllTasks(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.apiUrl}/tasks`)
      .pipe(
        tap(data => {
          this._dataSubject.next(data);
        }),
        catchError(this.handleError<ITodo[]>('getAllTasks', []))
      );
  }

  // GET: ID bo'yicha vazifani olish
  getTaskById(id: number): Observable<ITodo> {
    const url = `${this.apiUrl}/tasks/${id}`;
    return this.http.get<ITodo>(url)
      .pipe(
        catchError(this.handleError<ITodo>(`getTaskById id=${id}`))
      );
  }

  // POST: Yangi vazifa yaratish
  createTask(task: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${this.apiUrl}/tasks`, task)
      .pipe(
        tap(() => {
          this.loadAllTasks()
        }),
        catchError(this.handleError<ITodo>('createTask'))
      );
  }

  // PUT: Vazifani yangilash
  updateTask(id: number, task: ITodo): Observable<ITodo> {
    const url = `${this.apiUrl}/tasks/${id}`;
    return this.http.put<ITodo>(url, task)
      .pipe(
        tap(() => {
          this.loadAllTasks()
        }),
        catchError(this.handleError<ITodo>('updateTask'))
      );
  }

  // DELETE: ID bo'yicha vazifani o'chirish
  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/tasks/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.loadAllTasks();
      }),
      catchError(this.handleError<void>('deleteTask'))
    );
  }
  

  // Xatolikni boshqarish funksiyasi
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: ITodo): Observable<T> => {
      console.error(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }
}
