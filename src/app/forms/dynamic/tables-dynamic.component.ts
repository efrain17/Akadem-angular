import { Component, ViewEncapsulation } from '@angular/core';
import { FormsService } from '../forms.service'
import { tableData } from './tables-dynamic.data';
declare var jQuery: any;

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tables-dynamic.style.scss']
})
export class TablesDynamic {
  data: any[] ;

  constructor(private formService: FormsService) {
    this.formService.getPersonas()
      .then(data => {
        this.data = data;
        console.log(this.data)
      });
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }

}
