import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { AddListDialogComponent } from './components/shared/dialogs/add-list-dialog/add-list-dialog.component';
import { TodoService } from './services/todo.service';
import { AddTodoDialogComponent } from './components/shared/dialogs/add-todo-dialog/add-todo-dialog.component';
import { ModalModule } from './components/shared/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TodoComponent,
    TodoListsComponent,
    AddListDialogComponent,
    AddTodoDialogComponent,
  ],
  entryComponents: [AddListDialogComponent, AddTodoDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
