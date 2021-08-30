import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],
})
export class AddTodoDialogComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private builder: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.builder.group({
      inputTodo: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  addTodo() {
    this.todoService.addTodo(this.todoForm.get('inputTodo')?.value);
  }
}
