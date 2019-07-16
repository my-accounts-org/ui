import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message, action) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
