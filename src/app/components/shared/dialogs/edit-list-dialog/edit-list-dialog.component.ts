import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TodoList } from 'src/app/models/TodoList';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.scss'],
})
export class EditListDialogComponent implements OnInit {
  editTitleForm: FormGroup;
  faTrash = faTrashAlt;

  constructor(private builder: FormBuilder) {
    this.editTitleForm = this.builder.group({
      inputTitle: [null, Validators.required],
    });
  }

  @Input() selectedList: TodoList | null = null;
  @Output() listRenameEmitter: EventEmitter<{
    title: string;
    ID: number;
  }> = new EventEmitter<{ title: string; ID: number }>();
  @Output() closeModalEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() listToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  ngOnInit(): void {}

  onSubmitTitle() {
    if (this.selectedList) {
      this.listRenameEmitter.emit({
        title: this.editTitleForm.get('inputTitle')?.value,
        ID: this.selectedList.id,
      });
      this.editTitleForm.setValue({ inputTitle: '' });
      this.closeModalEmitter.emit('edit-list-modal');
    }
  }

  onCancel() {
    this.closeModalEmitter.emit('edit-list-modal');
  }

  onDelete() {
    if (this.selectedList) {
      this.listToDeleteEmitter.emit(this.selectedList.id);
      this.closeModalEmitter.emit('edit-list-modal');
    }
  }
}
