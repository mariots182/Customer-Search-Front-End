import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ICustomers {
  id: number;
  docType: number;
  docNumber: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private httpClient: HttpClient) {}

  getCustomer(docNumber: string, docType: string) {
    const apiURL = 'http://localhost:8090/customer';

    return this.httpClient.get<ICustomers>(apiURL, {
      params: {
        docType,
        docNumber,
      },
    });
  }
}
