import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserService } from '../../../../../auth/services/user.service';
import { TodoDto } from '../../models/todo.model';
import { TodosStore } from '../../store/todos.store';

@Component({
  selector: 'app-todo-add-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './todo-add-edit.component.html',
  styleUrl: './todo-add-edit.component.scss',
})
export class TodoAddEditComponent {
  constructor(
    public dialog: MatDialogRef<TodoAddEditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public todo: TodoDto,
    private userService: UserService
  ) {}
  todoStore = inject(TodosStore);
  todoAddUpdateForm!: FormGroup;

  ngOnInit(): void {
    this.initTodoForm();
  }

  initTodoForm(): void {
    this.todoAddUpdateForm = new FormGroup({
      title: new FormControl(this.todo?.title || '', Validators.required),
      completed: new FormControl(this.todo?.completed || false),
    });
  }

  onCreateTodo() {
    if (this.todoAddUpdateForm.invalid) return;
    const user = this.userService.getUserId();
    this.todoStore.addTodo({ user, ...this.todoAddUpdateForm.value });
    this.dialog.close();
  }

  onUpdateTodo(todoId: string) {
    if (this.todoAddUpdateForm.invalid) return;
    const user = this.userService.getUserId();
    this.todoStore.updateTodo(todoId, { user, ...this.todoAddUpdateForm.value });
    this.dialog.close();
  }
}
