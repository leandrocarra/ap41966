import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})

/*Componente to upload a single file
Returns a File object*/

export class UploadFileComponent implements OnInit, OnDestroy {

  @ViewChild('fileLoader', { static: true })
  fileLoader!: ElementRef;

  @Input()
  buttonTitle: string | undefined;

  @Input()
  multipleFiles: boolean = false;
  
  @Output()
  output = new EventEmitter();

  files: File[] = [];

  constructor() { }

  ngOnInit() {
  }

  addFiles(event: any) {
    this.fileLoader.nativeElement.click();
  }

  uploadFile(fileInput: any) {
    if (fileInput && fileInput.target.files) {
      this.files = fileInput.target.files;
      this.output.emit(this.files);
    }
  }

  ngOnDestroy(): void {
  }

}


