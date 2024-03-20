import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRepresentanteLegalService } from './dialog-representante-legal-service.service';


describe('DialogRepresentanteLegalService', () => {
  let service: DialogRepresentanteLegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogRepresentanteLegalService],
      imports: [MatDialogModule]
    });
    service = TestBed.inject(DialogRepresentanteLegalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
