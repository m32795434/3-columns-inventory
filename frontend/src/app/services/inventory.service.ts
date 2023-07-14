import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  URL_API = 'http://localhost:3000/api/records';

  selectedRecord: Record = {
    _id: '',
    description: '',
    debit: 0,
    credit: 0,
  };

  records!: Record[];

  constructor(private http: HttpClient) {}

  getRecords() {
    return this.http.get<Record[]>(this.URL_API);
  }

  createRecord(record: Record) {
    return this.http.post(this.URL_API, record);
  }

  updateRecord(record: Record) {
    return this.http.put(`${this.URL_API}/${record._id}`, record);
  }

  deleteRecord(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
