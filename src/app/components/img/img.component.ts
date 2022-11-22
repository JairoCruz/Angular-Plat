import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // con @Input recibe datos del padre
  @Input() img: string = '';
  // con @Output envia datos del hijo al padre
  @Output() loaded = new EventEmitter<string>();

  imageDefault = './assets/no-photo.png';

  constructor() {
    console.log('constructor', 'imgValue =>', this.img);
   }
  ngOnDestroy(): void {
    // delete component
    console.log('ngOnDestroy');
  }
  ngAfterViewInit(): void {
    // after render
    // handler children
    console.log('ngOnInt', 'imgValue =>', this.img);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // before render
    // changes inputs -- time
    console.log('ngOnChanges', 'imgValue => ', this.img);
  }

  ngOnInit(): void {

    // before render
    // async - fetch -- once time run

    console.log('ngOnInit', 'imgValue => ', this.img);

  }

 
  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log de hijo');
    this.loaded.emit(this.img);
  }

}
