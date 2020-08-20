import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Collection } from '../collection';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss'],
})
export class CollectionFormComponent implements OnInit {
  @Input() collection: Collection;
  @Output() formSaved = new EventEmitter<Collection>();
  form: FormGroup;
  get name() {
    return this.form.get('name');
  }
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.formBuilder.group({
      name: [
        this.collection ? this.collection.name : '',
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }
  onSubmit() {
    if (this.form.dirty && this.form.valid) {
      const updateCollection = { ...this.collection, ...this.form.value };

      this.formSaved.next(updateCollection);
    }
  }
}
