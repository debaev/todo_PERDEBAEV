import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';

import { AddUpdateTodoRequestDto, TodoDto } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

type TodosStore = {
  loading: boolean;
  all: TodoDto[];
  completed: TodoDto[];
  uncompleted: TodoDto[];
};

const initialState: TodosStore = {
  loading: false,
  all: [],
  completed: [],
  uncompleted: [],
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    getTodos() {
      patchState(store, { loading: true });
      todoService.getTodos().pipe(take(1)).subscribe({
        next: ({ results: todoList }) => {
          patchState(store, {
            all: todoList,
            uncompleted: todoList.filter((el) => !el.completed),
            completed: todoList.filter((el) => el.completed),
            loading: false,
          });
        },
        error: () => patchState(store, { loading: false }),
      });
    },
    
    addTodo(todo: AddUpdateTodoRequestDto) {
      patchState(store, { loading: true });
      todoService.addTodo(todo).pipe(take(1)).subscribe({
        next: () => this.getTodos(),
        error: () => patchState(store, { loading: false })
      })
    },
    
    updateTodo(todoId: string, todo: AddUpdateTodoRequestDto) {
      patchState(store, { loading: true });
      todoService.updateTodo(todoId, todo).pipe(take(1)).subscribe({
        next: () => this.getTodos(),
        error: () => patchState(store, { loading: false })
      })
    },
    
    deleteTodo(todoId: string) {
      patchState(store, { loading: true });
      todoService.deleteTodo(todoId).pipe(take(1)).subscribe({
        next: () => this.getTodos(),
        error: () => patchState(store, { loading: false })
      })
    }
  }))
);
