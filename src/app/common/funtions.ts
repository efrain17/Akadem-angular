export function eliminarParametroObj(param, paramArray) {
  return paramArray.filter(data => data !== param);
}

export function deleteParametro(url, parametro, callback, service, messengerDemo) {
  service.deleteAtributosEstrClase(url, parametro)
  .then(data => {
    messengerDemo.mensajeSucessFull()
    callback()
  })
  .catch(err => messengerDemo.mensajeError());
}

export function addParametro(url, parametro, callback, formService, messengerDemo) {
  formService.insertAtributosEstrClase(url, parametro)
  .then(data => {
    messengerDemo.mensajeSucessFull()
    callback()
  })
  .catch(err => messengerDemo.mensajeError());
}

export function promiseMessage(promise, messengerDemo, callback): void {
  promise
  .then(data => callback(data))
  .catch(err => messengerDemo.mensajeError());
}

export function cargarLista(lista, data): void {
  lista = [];
  data.map(date => lista.push(date.descripcion));
  return lista;
}
