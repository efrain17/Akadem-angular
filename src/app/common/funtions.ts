export function eliminarParametroObj(param, paramArray) {
    return paramArray.filter(data => data !== param);
}

export function deleteParametro(url, parametro, callback, service, messengerDemo) {
    service.deleteAtributosEstrClase(url, parametro)
    .then(data => callback())
    .catch(err => messengerDemo.mensajeError());
}

export function addParametro(url, parametro, callback, formService, messengerDemo) {
    formService.insertAtributosEstrClase(url, parametro)
    .then(data => callback())
    .catch(err => messengerDemo.mensajeError());
}

export function promiseMessage(promise, callback): void {
    promise
    .then(data => callback(data))
    .catch(err => this.messengerDemo.mensajeError());
  }

