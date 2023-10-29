
// Constantes para los tipos de 'valores' que reconoce nuestra gramática.
const TIPO_VALOR = {
	NUMERO:         'VAL_NUMERO',
	IDENTIFICADOR:  'VAL_IDENTIFICADOR',
	CADENA:         'VAL_CADENA',
}

// Constantes para los tipos de 'operaciones' que soporta nuestra gramática.
const TIPO_OPERACION = {
	SUMA:           'OP_SUMA',
	RESTA:          'OP_RESTA',
	MULTIPLICACION: 'OP_MULTIPLICACION',
	DIVISION:       'OP_DIVISION',
	MODULO:         'OP_MODULO',
	NEGATIVO:       'OP_NEGATIVO',
	MAYOR_QUE:      'OP_MAYOR_QUE',
	MENOR_QUE:      'OP_MENOR_QUE',

	MAYOR_IGUAL: 	'OP_MAYOR_IGUAL',
	MENOR_IGUAL:    'OP_MENOR_IGUAL',
	DOBLE_IGUAL:    'OP_DOBLE_IGUAL',
	NO_IGUAL:    	'OP_NO_IGUAL',

	AND:  			'OP_AND',
	OR: 			'OP_OR',
	NOT:   			'OP_NOT',  	

};

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	IMPRIMIR:		'INSTR_IMPRIMIR',
	DECLARACION:	'INSTR_DECLARACION',
	ASIGNACION:		'INSTR_ASIGANCION',
	DECLARACIONYA:		'INSTR_DECLARACIONYA',
	IF:				'INSTR_IF',
	IF_ELSE:		'INSTR_ELSE',
	CREATE_TABLE:	'INSTR_CREATE_TABLE',
	MNAME_TABLE:	'INSTR_MNAME_TABLE',
	ADDCOLUMN_TABLE:	'INSTR_ADDCOLUMN_TABLE',
	DELETECOLUMN_TABLE:	'INSTR_DELETECOLUMN_TABLE',
	NEWCOLUMNNAME_TABLE:	'INSTR_NEWCOLUMNNAME_TABLE', 
	DELETE_TABLE: 	'INSTR_DELETE_TABLE', 
	INSERT_TABLEDATA:	'INSTR_INSERT_TABLEDATA',
	SELECT_COLUMNAS:	'INSTR_SELECT_COLUMNAS',
	SELECT_ALL:		'INSTR_SELECT_ALL', 
	TRUNCATE_TABLE:	'INSTR_TRUNCATE_TABLE', 
	LOWER:			'INSTR_LOWER', 
	UPPER:			'INSTR_UPPER', 
	ROUND:			'INSTR_ROUND', 
	LEN:			'INSTR_LEN',
	TRUNCATE:		'INSTR_TRUNCATE', 
	TYPEOF: 		'INSTR_TYPEOF', 
	WHILE:			'INSTR_WHILE', 
	CASE:			'INSTR_CASE',
	WHENCASE:		'INSTR_WHENCASE',
	DEFAULTCASE:	'INSTR_DEFAULTCASE', 
	AGREGAR_WHEN:	'INSTR_AGREGAR_WHEN',
	AGREGAR_ELSE:	'INSTR_AGREGAR_ELSE', 
	UPDATE:			'INSTR_UPDATE', 
	DELETE:			'INSTR_DELETE', 
	INSTRUCCIONES_BEGIN: 'INSTR_INSTRUCCIONES_BEGIN', 
	FOR : 'INSTR_FOR'

}


function nuevaOperacion(operandoIzq, operandoDer, tipo) {
	return {
		operandoIzq: operandoIzq,
		operandoDer: operandoDer,
		tipo: tipo
	}
}



const instruccionesAPI = {

	
	nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
		return nuevaOperacion(operandoIzq, operandoDer, tipo);
	},

	nuevoOperacionUnaria: function(operando, tipo) {
		return nuevaOperacion(operando, undefined, tipo);
	},
	
	nuevoLower: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.LOWER,
			expresionCadena: expresionCadena
		};
	},
	nuevoTypeof: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.TYPEOF,
			expresionCadena: expresionCadena
		};
	},

	nuevoUpper: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.UPPER,
			expresionCadena: expresionCadena
		};
	},

	nuevoRound: function(expresionNumerica, n_decimales) {
		return {
			tipo: TIPO_INSTRUCCION.ROUND,
			expresionNumerica: expresionNumerica,
			n_decimales: n_decimales
		};
	},

	nuevoTruncate: function(expresionNumerica, n_decimales) {
		return {
			tipo: TIPO_INSTRUCCION.TRUNCATE,
			expresionNumerica: expresionNumerica,
			n_decimales: n_decimales
		};
	},

	nuevoLen:function(expresionCadena){
		return {
			tipo: TIPO_INSTRUCCION.LEN,
			expresionCadena: expresionCadena
		};
	},
	
	nuevofor:function(identificador,expresionNumerica,expresionNumerica2,instrucciones){
		return {
			tipo: TIPO_INSTRUCCION.FOR,
			identificador: identificador,
			expresionNumerica: expresionNumerica,
			expresionNumerica2: expresionNumerica2,
			instrucciones: instrucciones
		};
	},

	nuevoDelete: function(nombreTabla, columna,valorBuscar) {
		return {
			tipo: TIPO_INSTRUCCION.DELETE,
			nombreTabla: nombreTabla,
			columna: columna,
			valorBuscar: valorBuscar
		};
	},

	nuevoWhile: function(expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.WHILE,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		}	
	},

	nuevoInstruccionesVarias: function(instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.INSTRUCCIONES_BEGIN,
			instrucciones: instrucciones
		}
	},

	nuevoValor: function(valor, tipo) {
		return {
			tipo: tipo,
			valor: valor
		}
	},

	
	nuevoImprimir: function(expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.IMPRIMIR,
			expresionCadena: expresionCadena
		};
	},

	

	nuevoDeclaracion: function(identificador, tipo) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACION,
			identificador: identificador,
			tipo_dato: tipo
		}
	},

	nuevoDeclaracionYA: function(identificador, tipo_dato, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.DECLARACIONYA,
			identificador: identificador,
			tipo_dato: tipo_dato,
			expresionNumerica: expresionNumerica
		}
	},

	
	nuevoAsignacion: function(identificador, expresionNumerica) {
		return {
			tipo: TIPO_INSTRUCCION.ASIGNACION,
			identificador: identificador,
			expresionNumerica: expresionNumerica
		}
	},

	nuevoCrearTabla: function(nombreTabla,columnas) {
		return {
			tipo: TIPO_INSTRUCCION.CREATE_TABLE,
			nombreTabla: nombreTabla,
			columnas:columnas
		}
	},

	nuevoMnombreTabla: function(nombreAntiguo, nuevoNombre) {
		return {
			tipo: TIPO_INSTRUCCION.MNAME_TABLE,
			nombreAntiguo: nombreAntiguo,
			nuevoNombre: nuevoNombre
		}
	},

	nuevoAddColumnTabla: function(nombreTabla, nombreColumna, tipo) {
		return {
			tipo: TIPO_INSTRUCCION.ADDCOLUMN_TABLE,
			nombreTabla: nombreTabla,
			nombreColumna: nombreColumna,
			tipo_dato: tipo
		}
	},

	nuevoDeleteColumnTabla: function(nombreTabla, nombreColumna) {
		return {
			tipo: TIPO_INSTRUCCION.DELETECOLUMN_TABLE,
			nombreTabla: nombreTabla,
			nombreColumna: nombreColumna
		}
	},

	nuevoNombreColumnTabla: function(nombreTabla, nombreColumna, nuevoNombre) {
		return {
			tipo: TIPO_INSTRUCCION.NEWCOLUMNNAME_TABLE,
			nombreTabla: nombreTabla,
			nombreColumna: nombreColumna,
			nuevoNombre: nuevoNombre
		}
	},

	nuevoBorrarTabla: function(nombreTabla) {
		return {
			tipo: TIPO_INSTRUCCION.DELETE_TABLE,
			nombreTabla: nombreTabla
		}
	},

	nuevoDatosTabla: function(nombreTabla, valores) {
		return {
			tipo: TIPO_INSTRUCCION.INSERT_TABLEDATA,
			nombreTabla: nombreTabla,
			valores: valores
		}
	},

	nuevoSelectColumnas: function(nombreTabla, columnas) {
		return {
			tipo: TIPO_INSTRUCCION.SELECT_COLUMNAS,
			nombreTabla: nombreTabla,
			columnas: columnas
		}
	},

	nuevoSelectAll: function(nombreTabla) {
		return {
			tipo: TIPO_INSTRUCCION.SELECT_ALL,
			nombreTabla: nombreTabla
		}
	},

	nuevoTrucateTable:function(nombreTabla){
		return {
			tipo: TIPO_INSTRUCCION.TRUNCATE_TABLE,
			nombreTabla: nombreTabla
		}
	},

	nuevoWhenCase(expresionLogica, expresionCadena) {
		return {
			tipo: TIPO_INSTRUCCION.WHENCASE,
			expresionLogica: expresionLogica,
			expresionCadena: expresionCadena
		};
	},

	nuevoCase: function(instrucciones, expresion_else) {
		return {
			tipo: TIPO_INSTRUCCION.CASE,
			instrucciones: instrucciones,
			expresion_else: expresion_else
		}
	},

	nuevoUpdate: function(nombreTabla, nombreColumna, valorBuscar, columnaModificar, nuevoValor) {
		return {
			tipo: TIPO_INSTRUCCION.UPDATE,
			nombreTabla: nombreTabla,
			nombreColumna: nombreColumna,
			valorBuscar: valorBuscar,
			columnaModificar: columnaModificar,
			nuevoValor: nuevoValor
		}
	},

		
	
	nuevoIf: function(expresionLogica, instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresionLogica: expresionLogica,
			instrucciones: instrucciones
		}
	},

	nuevoIfElse: function(expresionLogica, instruccionesIf, instruccionesElse) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresionLogica: expresionLogica,
			instruccionesIf: instruccionesIf,
			instruccionesElse: instruccionesElse
		}
	},

    
	
	nuevoOperador: function(operador){
		return operador 
	},
 
	
}
// Exportamos nuestras constantes y nuestra API

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.instruccionesAPI = instruccionesAPI;
