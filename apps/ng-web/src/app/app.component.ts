import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  COLOR_GRID_ITEMS,
  ColorGridSelectComponent,
} from '@brew/ng/ui/components';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,

    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,

    ColorGridSelectComponent,
  ],
  selector: 'brew-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);
  public newColors: string[] = [];
  public allColors: string[] =[];
  public readonly form = this._fb.group({
    search: this._fb.control(''),
    color: this._fb.control(COLOR_GRID_ITEMS[2], {
      validators: [Validators.required],
    }),
  });

  Submit(){
    this.allColors = [...this.newColors,...this.extractRGB(this.form.value.search)];
    this.newColors = this.removeDuplicates(this.allColors);
  }

  removeDuplicates(array: any[]): any[] {
    return Array.from(new Set(array));
  }
  extractRGB(input: any): string[] {
    const regex = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    const matches: string[] = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        matches.push(match[0]);
    }

    return matches;
}
}
