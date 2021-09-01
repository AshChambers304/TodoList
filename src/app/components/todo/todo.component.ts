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
  @Output() todoContentEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {}

  addTodo(todoContent: string) {
    this.todoContentEmitter.emit(todoContent);
  }

  deleteTodo(id: number): void {
    this.todoToDeleteEmitter.emit(id);
  }

  toggleTodoDone(id: number): void {
    this.toggledDoneTodoEmitter.emit(id);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddTodoDialogComponent);

    dialogRef.componentInstance.addTodoEmitter.subscribe((result) => {
      this.addTodo(result);
    });

    console.log(this.selectedList);
  }
}
