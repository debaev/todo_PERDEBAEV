import { DatePipe, NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';

import { ConfirmDialogComponent } from '../../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { TodoDto } from '../../models/todo.model';
import { TodosStore } from '../../store/todos.store';
import { TodoAddEditComponent } from '../todo-add-edit/todo-add-edit.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, DatePipe, RouterModule, NgStyle],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  constructor(public dialog: MatDialog) {}
  todoStore = inject(TodosStore);
  @Input() todos!: TodoDto[];

  onEditTodo(todo: TodoDto) {
    this.dialog.open(TodoAddEditComponent, { data: todo });
  }

  onDeleteTodo(todoId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      if (!result) return;
      this.todoStore.deleteTodo(todoId);
    });
  }
}
