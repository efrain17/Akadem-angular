import { Component, ViewEncapsulation } from '@angular/core';
import { FormsService } from '../forms.service'
import { tableData } from './tables-dynamic.data';
import { Persona } from '../../common/interfaces'
import { MessengerDemo } from '../messenger/messenger.directive'
declare var jQuery: any;

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tables-dynamic.style.scss'], 
  providers: [MessengerDemo]
})
export class TablesDynamic {
  data: any[] ;
  persona_id: string;
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

  constructor(
    private formService: FormsService,
    private messengerDemo: MessengerDemo 
  ) {
    this.formService.getPersonas()
      .then(data => {
        this.data = data;
        console.log(this.data)
      });
  }

  cargarDatos(datos:any):void {
    this.persona_id = datos.id_persona;
    console.log(datos);
    this.persona = datos;
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input, #search-countries');
    let theme = 'air';
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

  updatePersona() :void {
    this.formService.updatePersona(this.persona_id, this.persona)
      .then(data=>  this.messengerDemo.mensajeSucessFull())
      .catch(err => this.messengerDemo.mensajeError())
  }

}
