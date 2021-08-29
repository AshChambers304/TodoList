import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddListDialogComponent } from '../shared/add-list-dialog/add-list-dialog.component';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  listForm: FormGroup;

  constructor(private builder: FormBuilder, public dialog: MatDialog) {
    this.listForm = this.builder.group({
      inputList: [null, Validators.required],
    });
  }

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();

  ngOnInit(): void {}

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    console.log(this.selectedList);

    this.selectedListEmitter.emit(newSelectedList);
  }

  addList(): void {
    this.todoLists.push({
      title: this.listForm.get('inputList')?.value,
      todos: [],
    });

    this.listForm.setValue({ inputList: '' });
  }

  deleteList(id: number): void {
    this.todoLists = this.todoLists.filter((v, i) => i !== id);

    this.selectedList = null;

    console.log('todo-lists-comp: ' + this.selectedList);

    this.setSelectedList(null);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddListDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog Result: ${result}');
    });
  }
}
