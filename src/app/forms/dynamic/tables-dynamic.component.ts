import { Component, ViewEncapsulation } from '@angular/core';
import { FormsService } from '../forms.service'
import { tableData } from './tables-dynamic.data';
import { Persona } from '../../common/interfaces'
declare var jQuery: any;

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tables-dynamic.style.scss']
})
export class TablesDynamic {
  data: any[] ;
  persona: Persona = {
    id_persona: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    provincia:'',
    ciudad: '', 
    fecha_nacimiento: ''
  };
  dateMask = {
    mask: [/\d/, /\d/,
      '/', /\d/, /\d/,
      '/', /[1-9]/, /\d/, /\d/, /\d/]
  };

  constructor(private formService: FormsService) {
    this.formService.getPersonas()
      .then(data => {
        this.data = data;
        console.log(this.data)
      });
  }
  cargarDatos(datos:any):void {
    console.log(datos);
    this.persona = datos;
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
  unmask(event) {
    return event.replace(/\D+/g, '');
  }

}
