import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { ModalService } from 'src/app/services/modal.service';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  faEllipsisH = faEllipsisH;
  addTaskForm: FormGroup;

  constructor(
    private modalService: ModalService,
    elRef: ElementRef,
    private builder: FormBuilder
  ) {
    this.addTaskForm = this.builder.group({
      inputTask: [null, Validators.required],
    });
  }

  @Input() selectedList: TodoList | null = null;
  @Output() listToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() listRenameEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() todoToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() toggledDoneTodoEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() todoContentEmitter: EventEmitter<{
    todoContent: string;
    id: number;
  }> = new EventEmitter<{ todoContent: string; id: number }>();

  ngOnInit(): void {
    console.log('todo-selected-list: ' + this.selectedList);
  }

  onSubmitTask() {
    if (this.selectedList) {
      this.todoContentEmitter.emit({
        todoContent: this.addTaskForm.get('inputTask')?.value,
        id: this.selectedList.id,
      });
      this.addTaskForm.setValue({ inputTask: '' });
    }
  }

  handleListRenameEmitter(newTitle: { title: string; ID: number }) {
    this.listRenameEmitter.emit(newTitle);
  }

  handleListToDeleteEmitter(id: number) {
    this.listToDeleteEmitter.emit(id);
  }

  handleCloseModalEmitter(id: string): void {
    this.modalService.close(id);
  }

  deleteTodo(id: number): void {
    this.todoToDeleteEmitter.emit(id);
  }

  deleteList(id: number) {
    this.listToDeleteEmitter.emit(id);
  }

  toggleTodoDone(id: number): void {
    this.toggledDoneTodoEmitter.emit(id);
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }
}
