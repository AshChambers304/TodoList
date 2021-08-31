import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoList } from 'src/app/models/TodoList';

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
  @Input() todoLists: TodoList[] = [];
  @Output() addListEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  addList() {
    console.log(this.todoLists);
    this.addListEmitter.emit('${listForm.value.inputList}');
  }
}
