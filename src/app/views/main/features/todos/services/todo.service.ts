import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddUpdateTodoRequestDto, TodoDto, TodoResponse } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  
  getTodos(): Observable<TodoResponse> {
    return this.http.get<TodoResponse>('/api/todo/');
  }
  
  addTodo(todoDto: AddUpdateTodoRequestDto): Observable<TodoDto> {
    return this.http.post<TodoDto>('/api/todo/', todoDto);
  }
  
  updateTodo(todoId: string, todoDto: AddUpdateTodoRequestDto): Observable<TodoDto> {
    return this.http.put<TodoDto>(`/api/todo/${todoId}/`, todoDto);
  }
  
  getTodoDetail(todoId: string): Observable<TodoDto> {
    return this.http.get<TodoDto>(`/api/todo/${todoId}/`);
  }
  
  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(`/api/todo/${todoId}`);
  }
}
