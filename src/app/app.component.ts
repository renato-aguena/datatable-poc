import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dtOptions: any;
  clients: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        console.log('dataTablesParameters', dataTablesParameters)
        this.http.post('https://angular-datatables-demo-server.herokuapp.com/', dataTablesParameters, {})
          .subscribe((response) => {
            console.log(response)
            const result = {}
            result.recordsTotal = response.recordsTotal;
            result.recordsFiltered = response.recordsFiltered;
            result.data = response.data;
            console.log('result', result)
            callback(result)
          });
      },
      columns: [
        {
          title: 'ID',
          data: 'id'
        },
        {
          title: 'Nome',
          data: 'firstName'
        },
        {
          title: 'Sobrenome',
          data: 'lastName'
        }
      ],
      lengthMenu: [10, 20, 50, 100, 500]
      // Declare the use of the extension in the dom parameter
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
        'print',
        'excel',
        'csv',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('Button activated');
          }
        }
      ],
      responsive: true
    };
  }
}
