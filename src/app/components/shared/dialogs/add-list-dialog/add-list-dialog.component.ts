import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss'],
})
export class AddListDialogComponent implements OnInit {
  listForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.listForm = this.builder.group({
      inputList: [null, Validators.required],
    });
  }

  @Output() listTitleEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeModalEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {}

  onSubmit(): void {
    this.listTitleEmitter.emit(this.listForm.get('inputList')?.value);
    this.listForm.setValue({ inputList: '' });
    this.closeModalEmitter.emit('new-list-modal');
  }

  onCancel() {
    this.closeModalEmitter.emit('new-list-modal');
  }
}
