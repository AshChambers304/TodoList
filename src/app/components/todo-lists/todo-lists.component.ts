import { Component, OnInit, Input } from '@angular/core';
import { TodoList } from '../../models/TodoList';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  constructor() {}

  @Input() todoList: TodoList[] = [];

  ngOnInit(): void {
    this.todoList = [
      { title: 'One', todos: [{ content: 'Content', completed: false }] },
      { title: 'two', todos: [{ content: 'Content2', completed: true }] },
    ];
  }
}
