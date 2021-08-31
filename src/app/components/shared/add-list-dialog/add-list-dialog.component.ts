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

  @Output() addListEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  addList() {
    this.addListEmitter.emit(this.listForm.get('inputList')?.value);
  }
}
