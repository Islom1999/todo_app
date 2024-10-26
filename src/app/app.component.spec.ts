import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component yaratilishi kerak', () => {
    expect(component).toBeTruthy();
  });
});