import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { MatDialog } from '@angular/material/dialog';
import { AddListDialogComponent } from '../shared/add-list-dialog/add-list-dialog.component';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();
  @Output() listToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  ngOnInit(): void {}

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    this.selectedListEmitter.emit(this.selectedList);
  }

  deleteList(id: number) {
    this.listToDeleteEmitter.emit(id);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddListDialogComponent);

    dialogRef.afterClosed().subscribe(() => {});
  }
}
