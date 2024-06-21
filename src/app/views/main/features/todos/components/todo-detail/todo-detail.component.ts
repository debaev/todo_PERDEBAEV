import { DatePipe, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { TodoDto } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [MatButton, MatIcon, DatePipe, MatProgressSpinner],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    public location: Location
  ) {}
  todo: TodoDto | null = null;
  loading = false;
  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.getTodoDetail(id!);
  }
  
  getTodoDetail(id: string) {
    this.todoService.getTodoDetail(id).pipe(take(1)).subscribe({
      next: (todo) => {
        this.todo = todo;
      },
      complete: () => this.loading = false
    });
  }
}
