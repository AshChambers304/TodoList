import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  public selectedDate: Date = new Date();

  @Output() taskEmitter: EventEmitter<{
    content: string;
    selectedDate: Date;
  }> = new EventEmitter<{ content: string; selectedDate: Date }>();
  @Output() closeModalEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {}

  handleSelectedDateEmitter(newSelectedDate: Date) {
    this.selectedDate = newSelectedDate;
  }

  onSubmit(): void {
    this.taskEmitter.emit({
      content: this.taskForm.get('taskContent')?.value,
      selectedDate: this.selectedDate,
    });
    this.taskForm.setValue({ taskContent: '' });
    this.closeModalEmitter.emit('add-task-modal');
  }
}
