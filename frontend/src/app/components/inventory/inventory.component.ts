import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { NgForm } from '@angular/forms';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  constructor(public inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.inventoryService.getRecords().subscribe({
      next: (res) => {
        this.inventoryService.records = res as Record[];
      },
      error: (err) => console.error(err),
    });
  }

  addRecord(form: NgForm) {
    if (this.inventoryService.selectedRecord._id) {
      this.inventoryService.updateRecord(form.value).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
      });
    } else {
      if (confirm('Are you sure you want to create a record?')) {
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

  calculateBalance(record: Record) {
    // Implement your logic to calculate the balance based on debit and credit values
    // and return the calculated balance.
    // You can access other records and their balances from inventoryService.records.
    return record.debit - record.credit;
  }
}
