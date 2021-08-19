import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.todoForm = this.builder.group({
      inputTodo: [null, Validators.required],
    });
  }

  @Input() selectedList: TodoList | null = null;

  ngOnInit(): void {}

  addTodo(): void {
    if (this.selectedList) {
      this.selectedList.todos.push({
        content: this.todoForm.get('inputTodo')?.value,
        completed: false,
      });

      this.todoForm.setValue({ inputTodo: '' });
    }
  }

  deleteTodo(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos = this.selectedList.todos.filter(
        (v, i) => i !== id
      );
    }
  }

  toggleDone(id: number): void {
    if (this.selectedList) {
      this.selectedList.todos.map((v, i) => {
        if (i == id) v.completed = !v.completed;
      });
    }
  }
}
