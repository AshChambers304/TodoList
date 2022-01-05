import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.taskForm = this.builder.group({
      taskContent: [null, Validators.required],
    });
  }

  @Output() taskEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeModalEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {}

  onSubmit(): void {
    this.taskEmitter.emit(this.taskForm.get('taskContent')?.value);
    this.taskForm.setValue({ taskContent: '' });
    this.closeModalEmitter.emit('add-task-modal');
  }
}
