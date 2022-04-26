import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchForm: FormGroup;
  submitted = false;
  docTypesList = [
    { value: '', name: 'Selecciona un tipo' },
    { value: 'C', name: 'Cédula de ciudadanía' },
    { value: 'P', name: 'Pasaporte' },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      docType: new FormControl('', [Validators.required]),
      docNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
      ]),
    });
  }

  changeDocType(e: any) {
    this.docType?.setValue(e.target.value);
  }

  get docType() {
    return this.searchForm.get('docType');
  }

  changeDocNumber(e: any) {
    if (e.target.value.length << 10) {
      if (!this.searchForm.controls.docNumber.hasError('minlength')) {
        this.searchForm.controls.docNumber.setErrors({ minlength: true });
      }
    }
    if (e.target.value.length >= 10) {
      if (this.searchForm.controls.docNumber.hasError('minlength')) {
        this.searchForm.controls.docNumber.setErrors(null);
      }
    }
  }

  search() {
    this.submitted = true;
    if (this.searchForm.valid) {
      this.submitted = false;
      this.router.navigateByUrl('detail', {
        state: {
          docType: this.searchForm.value.docType,
          docNumber: this.searchForm.value.docNumber,
        },
      });
    } else {
      this.submitted = false;
    }
  }
}
