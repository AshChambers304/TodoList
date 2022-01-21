import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { ModalService } from '../../services/modal.service';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements AfterViewInit {
  faTasks = faTasks;

  constructor(
    private modalService: ModalService,
    private renderer: Renderer2
  ) {}

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();
  @Output() listTitleEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit(): void {
    if (this.selectedList) {
      this.setListStyling(this.selectedList.id);
    }
  }

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedListEmitter.emit(newSelectedList);
  }

  setListStyling(elementID: number): void {
    let listElements = document.getElementsByClassName('list');

    for (let i = 0; i < listElements.length; i++) {
      if (i == elementID) {
        this.renderer.addClass(listElements[i], 'active');
      } else this.renderer.removeClass(listElements[i], 'active');
    }
  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  handleCloseModalEmitter(id: string): void {
    this.modalService.close(id);
  }

  handleListTitleEmitter(newList: string) {
    this.listTitleEmitter.emit(newList);
  }
}
