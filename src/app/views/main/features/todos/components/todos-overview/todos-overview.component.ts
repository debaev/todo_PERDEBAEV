import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { TodosStore } from '../../store/todos.store';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todos-overview',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, TodoListComponent, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './todos-overview.component.html',
  styleUrl: './todos-overview.component.scss'
})
export class TodosOverviewComponent {
  constructor(public dialog: MatDialog) {}
  todoStore = inject(TodosStore);
  ngOnInit(): void {
    this.todoStore.getTodos();
  }

  addTodo() {
    this.dialog.open(TodoAddEditComponent);
  }
}
