import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CollectionItem } from '../collection-item';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-table-form',
  templateUrl: './collection-table-form.component.html',
  styleUrls: ['./collection-table-form.component.scss'],
})
export class CollectionTableFormComponent implements OnInit, OnDestroy {
  @Input() collectionItems: CollectionItem[];
  @Output() collectionItemEdited = new EventEmitter<CollectionItem>();
  @Output() removeCollectionItemClicked = new EventEmitter<CollectionItem>();

  form: FormGroup;
  formSub: Subscription;

  displayedColumns: string[] = [
    // 'productCode',
    // 'productName',
    'quantity',
    'purchasePrice',
    'purchaseDate',
    'menu',
  ];

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.setCollectionItemForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      collectionItems: this.formBuilder.array([]),
    });
  }

  private setCollectionItemForm() {
    const itemForms = this.form.get('collectionItems') as FormArray;
    this.collectionItems.forEach((collectionItem) => {
      itemForms.push(this.setCollectionItemsFormArray(collectionItem));
    });
  }
  private setCollectionItemsFormArray(collectionItem: CollectionItem) {
    const formGroup = this.formBuilder.group({
      quantity: [collectionItem.quantity],
      purchasePrice: [collectionItem.purchasePrice],
      purchaseDate: [collectionItem.purchaseDate],
    });

    const formSub = formGroup.valueChanges
      .pipe(debounce(() => timer(1000)))
      .subscribe((value) => {
        const formData = { ...collectionItem, ...formGroup.value };

        this.collectionItemEdited.next(formData);
      });

    return formGroup;
  }
  removeCollectionItem(collectionItem: CollectionItem) {
    this.removeCollectionItemClicked.next(collectionItem);
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }
}
