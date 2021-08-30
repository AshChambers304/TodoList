import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../shared/add-todo-dialog/add-todo-dialog.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(public todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  toggleTodoDone(id: number): void {
    this.todoService.toggleTodoDone(id);
  }

  openDialog(): void {
    this.dialog.open(AddTodoDialogComponent);
  }
}
