import { Todo } from './Todo';

export class TodoList {
  constructor(public id: number, public title: string, public todos: Todo[]) {}
}
