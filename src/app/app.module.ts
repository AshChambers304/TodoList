import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material/app.material.module';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { AddListDialogComponent } from './components/shared/add-list-dialog/add-list-dialog.component';
import { TodoService } from './services/todo.service';
import { AddTodoDialogComponent } from './components/shared/add-todo-dialog/add-todo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TodoComponent,
    TodoListsComponent,
    AddListDialogComponent,
    AddTodoDialogComponent,
  ],
  entryComponents: [AddListDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
