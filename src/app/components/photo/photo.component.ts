import { Component, Input, OnInit } from '@angular/core';
import { photoInterface } from 'src/app/interfaces';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() photo:any;

}
