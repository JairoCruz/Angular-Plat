import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('');
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl('');

  categoryField = new FormControl('');
  tagField = new FormControl('');

  agreeField = new FormControl('false');

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    })
  }

}
