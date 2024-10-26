import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ITodo } from '../../../interfaces';
import { environment } from '../../../environments';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const mockTodos: ITodo[] = [
    { id: 1, title: 'Todo 1', description: 'Description 1', completed: 0 },
    { id: 2, title: 'Todo 2', description: 'Description 2', completed: 1 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});