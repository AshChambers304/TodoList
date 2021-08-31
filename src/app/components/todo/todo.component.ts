import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../shared/add-todo-dialog/add-todo-dialog.component';
import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @Input() selectedList: TodoList | null = null;
  @Output() todoToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() toggledDoneTodoEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  ngOnInit(): void {}

  deleteTodo(id: number): void {
    this.todoToDeleteEmitter.emit(id);
  }

  toggleTodoDone(id: number): void {
    this.toggledDoneTodoEmitter.emit(id);
  }

  openDialog(): void {
    this.dialog.open(AddTodoDialogComponent);
  }
}
