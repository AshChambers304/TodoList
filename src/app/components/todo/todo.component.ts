import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TodoList } from 'src/app/models/TodoList';
import { ModalService } from 'src/app/services/modal.service';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  faEllipsisH = faEllipsisH;

  constructor(private modalService: ModalService, elRef: ElementRef) {}

  @Input() selectedList: TodoList | null = null;
  @Output() listToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() todoToDeleteEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() toggledDoneTodoEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() todoContentEmitter: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {
    console.log('todo-selected-list: ' + this.selectedList);
  }

  handleTodoContentEmitter(todoContent: string) {
    this.todoContentEmitter.emit(todoContent);
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
