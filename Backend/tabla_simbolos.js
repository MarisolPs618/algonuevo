// Constantes para los tipos de datos.
const TIPO_DATO = {
    NUMERO: 'NUMERO',
    STRING: 'STRING',
    DOUBLE: 'DOUBLE',
    INT: 'INT',
    DATE: 'DATE',
    BOOLEAN: 'BOOLEAN'
}



function crearSimbolo(id, tipo, valor) {
    return {
        id: id,
        tipo: tipo,
        valor: valor
    }
}


/**
 * Clase que representa una Tabla de Símbolos.
 */
class TS {

    /**
     * El costructor recibe como parámetro los simbolos de la tabla padre.
     * @param {*} simbolos 
     */
    constructor (simbolos) {
        this._simbolos = simbolos;
    }

    
    agregar(id, tipo) {
        const nuevoSimbolo = crearSimbolo(id, tipo);
        this._simbolos.push(nuevoSimbolo);
    }

    agregarValor(id, tipo, valor) {
        const nuevoSimbolo = crearSimbolo(id, tipo, valor);
        this._simbolos.push(nuevoSimbolo);
    }
    
    actualizar(id, valor) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];
        if (simbolo) {
            simbolo.valor = valor.valor;
        }
        else {
            throw 'ERROR: variable: ' + id + ' no ha sido definida';
        }
    }

    obtener(id) {
        const simbolo = this._simbolos.filter(simbolo => simbolo.id === id)[0];

        if (simbolo) return simbolo; //aqui devolvemos el simbolo completo
        else throw 'ERROR: variable: ' + id + ' no ha sido definida';
    }

    
    get simbolos() {
        return this._simbolos;
    }
}

// Exportamos las constantes y la clase.

module.exports.TIPO_DATO = TIPO_DATO;
module.exports.TS = TS;

