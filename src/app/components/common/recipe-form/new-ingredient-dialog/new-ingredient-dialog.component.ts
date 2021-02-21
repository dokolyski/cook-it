import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Ingredient} from 'src/models/ingredient';

@Component({
  selector: 'app-new-ingredient-dialog',
  templateUrl: './new-ingredient-dialog.component.html',
  styleUrls: ['./new-ingredient-dialog.component.scss']
})
export class NewIngredientDialogComponent implements OnInit {
  nameControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]);
  quantityControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]);

  constructor(
    private dialogRef: MatDialogRef<NewIngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean, current: Ingredient}) {
    if (data?.current != null) {
      this.nameControl.setValue(data.current.name);
      this.quantityControl.setValue(data.current.quantity);
    }
  }

  ngOnInit(): void {
  }

  addIngredient(): void {
    if (!this.nameControl.invalid && !this.quantityControl.invalid) {
      this.dialogRef.close(new Ingredient(this.nameControl.value, this.quantityControl.value));
    }
  }
}
