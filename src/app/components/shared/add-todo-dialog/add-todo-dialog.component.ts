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

  @Output() todoContentEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() closeModalEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {}

  onSubmit() {
    this.todoContentEmitter.emit(this.todoForm.get('inputTodo')?.value);
    this.todoForm.setValue({ inputTodo: '' });
    this.closeModalEmitter.emit('new-todo-modal');
  }
}
