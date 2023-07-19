import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Record } from 'src/app/models/record';
import html2pdf from 'html2pdf.js';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  constructor(public inventoryService: InventoryService) { }

  protected balance = 0;

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.inventoryService.getRecords().subscribe({
      next: (res) => {
        this.inventoryService.records = res;
      },
      error: (err) => console.error(err),
    });
  }

  addRecord(form: NgForm) {
    if (this.inventoryService.selectedRecord._id) {
      this.inventoryService.updateRecord(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.inventoryService.selectedRecord = emptyReg;
        },
        error: (err) => console.error(err),
      });
    } else if (confirm('Are you sure you want to create a record?')) {
      this.inventoryService.createRecord(form.value).subscribe({
        next: (res) => {
          this.getRecords();
          form.reset();
          console.log(res);
        },
        error: (err) => console.error(err),
      });
    }
  }

  deleteRecord(_id: string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.inventoryService.deleteRecord(_id).subscribe({
        next: (res) => {
          this.getRecords();
          console.log(res);
        },
        error: (err) => console.error(err),
      });
    }
  }

  editRecord(record: Record) {
    this.inventoryService.selectedRecord = record;
  }

  calculateBalance(records: Record[], record: Record) {
    const index = records.indexOf(record);
    let balance = 0;

    for (let i = 0; i <= index; i++) {
      balance += records[i].debit - records[i].credit;
    }

    return balance;
  }

  saveAsPdf() {
    const tableElement = document.querySelector('.table') as HTMLElement;
    html2pdf().from(tableElement).set(pdfOptions).save();
  }

  printTable() {
    const tableElement = document.querySelector('.table') as HTMLElement;
    const printContainer = document.createElement('div');
    printContainer.classList.add('print-container');
    printContainer.appendChild(tableElement.cloneNode(true));
    document.body.appendChild(printContainer);
    window.print();
    document.body.removeChild(printContainer);
  }
}

const emptyReg = {
  _id: '',
  description: '',
  debit: 0,
  credit: 0,
};
const pdfOptions = {
  margin: 10,
  filename: 'table.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
};

function wait(ms: any) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
