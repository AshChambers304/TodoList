import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss'],
})
export class AddListDialogComponent implements OnInit {
  listForm: FormGroup;

  constructor(private builder: FormBuilder, private todoService: TodoService) {
    this.listForm = this.builder.group({
      inputList: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  addList() {
    this.todoService.addList(this.listForm.get('inputList')?.value);
  }
}
