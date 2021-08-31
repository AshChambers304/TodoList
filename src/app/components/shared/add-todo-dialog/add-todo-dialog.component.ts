import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.scss'],
})
export class AddTodoDialogComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.todoForm = this.builder.group({
      inputTodo: [null, Validators.required],
    });
  }

  @Output() addTodoEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  addTodo() {
    this.addTodoEmitter.emit(this.todoForm.get('inputTodo')?.value);
  }
}
