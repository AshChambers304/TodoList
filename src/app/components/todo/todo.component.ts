import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.todos = [];

    this.todoForm = this.builder.group({
      inputTodo: [null, Validators.required],
    });
  }

  public todos: Todo[];

  ngOnInit(): void {}

  addTodo() {
    this.todos.push({
      content: this.todoForm.get('inputTodo')?.value,
      completed: false,
    });

    this.todoForm.setValue({ inputTodo: '' });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;
    });
  }
}
