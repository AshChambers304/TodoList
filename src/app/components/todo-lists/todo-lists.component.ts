import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoList } from '../../models/TodoList';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
})
export class TodoListsComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  @Input() todoLists: TodoList[] = [];
  @Input() selectedList: TodoList | null = null;
  @Output() selectedListEmitter: EventEmitter<TodoList | null> =
    new EventEmitter<TodoList | null>();
  @Output() listTitleEmitter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {}

  setSelectedList(newSelectedList: TodoList | null): void {
    this.selectedList = newSelectedList;
    this.selectedListEmitter.emit(this.selectedList);
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
