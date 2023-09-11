import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.reactiveForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      feedBack :  new FormControl('')
    });
  }
  onSubmit() {

    console.log('form is valid');
    console.log(this.reactiveForm.value );

  }
}
