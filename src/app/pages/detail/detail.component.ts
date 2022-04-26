import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  customer: any;
  errorMessage = '';

  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {
    let docNumber = this.router.getCurrentNavigation()?.extras.state?.docNumber;
    let docType = this.router.getCurrentNavigation()?.extras.state?.docType;

    this.customersService.getCustomer(docNumber, docType).subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {
        if (error.status == 404) {
          this.errorMessage = 'No se encontró el cliente';
        } else if (error.status == 500) {
          this.errorMessage = 'Ocurrió un error en el servidor';
        } else if (error.status == 400) {
          this.errorMessage = 'Ocurrio un error en la petición';
        }
      }
    );
  }

  backRef() {
    this.router.navigate(['home']);
  }
}
