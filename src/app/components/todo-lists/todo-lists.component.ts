import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  listForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.listForm = this.builder.group({
      inputList: [null, Validators.required],
    });
  }

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList = null;
  @Output() selectedListEmitter: EventEmitter<TodoList> =
    new EventEmitter<TodoList>();

  ngOnInit(): void {}

  setSelectedList(newSelectedList: TodoList) {
    this.selectedList = newSelectedList;
    console.log(this.selectedList);

    this.selectedListEmitter.emit(newSelectedList);
  }

  addList() {
    this.todoLists.push({
      title: this.listForm.get('inputList')?.value,
      todos: [],
    });

    this.listForm.setValue({ inputList: '' });
  }

  deleteList(id: number) {
    this.todoLists = this.todoLists.filter((v, i) => i !== id);
  }
}
