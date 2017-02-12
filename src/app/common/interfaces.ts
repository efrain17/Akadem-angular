export interface Persona {
  id_persona: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  provincia: string;
  ciudad: string;
  fecha_nacimiento: string;
  telefono: any;
  tipo_usuario: any;
  discapacidad: any; 
  operacion: string;
}

export interface AtributosPersonas {
  discapacidades: {
    descripcion: any,
    id: any
  };
  operadores_telefonicos: {
    descripcion: any,
    id: any
  };
  tipos_usuarios: {
    descripcion: any,
    id: any
  };
  tipos_persona: {
    descripcion: any,
    id: any
  };
}

export interface AtributosEstructuraClase {
  area_academica: any;
  tipo_grado: any;
  grado: any;
  paralelo: any;
  tipo_curso: any;
}
