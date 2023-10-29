
// Constantes para operaciones, instrucciones y valores
const TIPO_INSTRUCCION = require('./instrucciones').TIPO_INSTRUCCION;
const TIPO_OPERACION = require('./instrucciones').TIPO_OPERACION;
const TIPO_VALOR = require('./instrucciones').TIPO_VALOR;
const TS = require('./tabla_simbolos').TS;
// Tabla de Simbolos
const TIPO_DATO = require('./tabla_simbolos').TIPO_DATO;
const { Tabla, baseDeDatos, imprimirEstructuraTablas, modificarNombreTabla, agregarColumnaATabla, eliminarColumnaDeTabla, cambiarNombreColumna} = require('./pruebas.js');
const {insertarDatosEnTabla, modificarTablaConCondicion, borrarFilaConCondicion} = require('./pruebas.js');


exports.procesarBloque=function(instrucciones, tablaDeSimbolos) {
    let results=''
    instrucciones.forEach(instruccion => {
   
        if (instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR) {
            // Procesando Instrucción Imprimir
             
             if(procesarImprimir(instruccion, tablaDeSimbolos)==undefined){
                results+='';
             }else{
                results +=procesarImprimir(instruccion, tablaDeSimbolos) +'\n';
             }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            // Procesando Instrucción Declaración
            procesarDeclaracion(instruccion, tablaDeSimbolos);
        } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            // Procesando Instrucción Asignación
            procesarAsignacion(instruccion, tablaDeSimbolos);
        } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACIONYA) {
            // Procesando Instrucción Declaración y Asignación
            procesarDeclaracionYA(instruccion, tablaDeSimbolos);
        } else if(instruccion.tipo===TIPO_INSTRUCCION.CREATE_TABLE){
            // Procesando Instrucción Crear Tabla
            procesarCreateTable(instruccion, tablaDeSimbolos);

        }else if(instruccion.tipo===TIPO_INSTRUCCION.MNAME_TABLE){
            // Procesando Instrucción Modificar Nombre de Tabla
            procesarMnameTable(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.ADDCOLUMN_TABLE){
            // Procesando Instrucción Agregar Columna a Tabla
            procesarAgregarColumna(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.DELETECOLUMN_TABLE){
            // Procesando Instrucción Eliminar Columna de Tabla
            procesarEliminarColumna(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.NEWCOLUMNNAME_TABLE){
            // Procesando Instrucción Cambiar Nombre de Columna de Tabla
            procesarNnameColumnTable(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.DELETE_TABLE){
            // Procesando Instrucción Eliminar Tabla
            procesarBorrarTabla(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.INSERT_TABLEDATA){
            // Procesando Instrucción Insertar Datos en Tabla
            procesarInsertarDatos(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.SELECT_COLUMNAS){
            // Procesando Instrucción Seleccionar Columnas
            procesarSelectColumnas(instruccion, tablaDeSimbolos);
            console.log(procesarSelectColumnas(instruccion, tablaDeSimbolos));
            results +=procesarSelectColumnas(instruccion, tablaDeSimbolos) +'\n';
            results+=''; 
        }else if(instruccion.tipo===TIPO_INSTRUCCION.SELECT_ALL){
          
            procesarSelectAll(instruccion, tablaDeSimbolos);
            console.log(procesarSelectAll(instruccion, tablaDeSimbolos));
            results +=procesarSelectAll(instruccion, tablaDeSimbolos) +'\n';
            results+=''; 
        }else if(instruccion.tipo===TIPO_INSTRUCCION.TRUNCATE_TABLE){
            // Procesando Instrucción Truncar Tabla
            procesarTruncateTable(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.LOWER){
            // Procesando Instrucción Lower
            results +=procesarLower(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.UPPER){
            // Procesando Instrucción Upper
            results +=procesarUpper(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.WHILE){
            // Procesando Instrucción While
           results +=procesarWhile(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.CASE){
            // Procesando Instrucción Case
            results +=procesarCase(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.DELETE){
            // Procesando Instrucción Delete
            procesarDelete(instruccion, tablaDeSimbolos);
        }else if(instruccion.tipo===TIPO_INSTRUCCION.INSTRUCCIONES_BEGIN){
            // Procesando Instrucción Begin
            results +=procesarInstruccionesVarias(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.FOR){
            // Procesando Instrucción For
            results +=procesarFor(instruccion, tablaDeSimbolos) +'\n';
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
            // Procesando Instrucción If
           if(procesarIf(instruccion, tablaDeSimbolos)==undefined){
            results+='';
           }else{
            results +=procesarIf(instruccion, tablaDeSimbolos) +'\n';
           }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.ROUND){
            // Procesando Instrucción Round
            results +=procesarRound(instruccion, tablaDeSimbolos) +'\n';
        } else if(instruccion.tipo === TIPO_INSTRUCCION.LEN){
            // Procesando Instrucción Len
            results +=procesarLen(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo === TIPO_INSTRUCCION.TRUNCATE){
            // Procesando Instrucción Truncate
            results +=procesarTruncate(instruccion, tablaDeSimbolos) +'\n';    
        }else if(instruccion.tipo === TIPO_INSTRUCCION.TYPEOF){
            // Procesando Instrucción Typeof
            results +=procesarTypeOf(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.WHILE){
            // Procesando Instrucción While
            results +=procesarWhile(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.CASE){
            // Procesando Instrucción Case
            results +=procesarCase(instruccion, tablaDeSimbolos) +'\n';
        }else if(instruccion.tipo===TIPO_INSTRUCCION.UPDATE){
            // Procesando Instrucción Update
            procesarUpdate(instruccion, tablaDeSimbolos);
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
            // Procesando Instrucción If-Else
            if(procesarIfelse(instruccion, tablaDeSimbolos)==undefined){
                results+='';
               }else{
                results +=procesarIfelse(instruccion, tablaDeSimbolos) +'\n';
               }
        }
        else {
            throw 'ERROR: tipo de instrucción no válido: ' + instruccion;
        }
        
    });
    return results;
}

function procesarSelectAll(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        // Crear una fila para encabezados de columnas
        const encabezados = columnas.map((columna) => columna.nombre).join('\t');

        // Crear un arreglo para almacenar las filas de datos
        const filas = [];

        // Obtener el número de registros (la cantidad de valores en una columna)
        const numeroRegistros = columnas.length > 0 ? columnas[0].valores.length : 0;

        // Iterar sobre los registros y seleccionar todas las columnas de la tabla
        for (let i = 0; i < numeroRegistros; i++) {
            const fila = columnas.map((columna) => {
                return columna.valores[i];
            });
            filas.push(fila.join('\t'));
        }

        // Formatear la salida
        const resultado = `Tabla: ${nombreTabla}\n${encabezados}\n${filas.join('\n')}`;

        // Retornar la tabla completa como una cadena
        return resultado;
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
        return null;
    }


}   

function procesarCreateTable(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    const columnas = instruccion.columnas;

    if (baseDeDatos[nombreTabla]) {
        throw `ERROR: La tabla "${nombreTabla}" ya existe.`;
    }

   
    const nuevaTabla = new Tabla(nombreTabla);
    columnas.forEach((columna) => {
        nuevaTabla.agregarColumna(columna.nombre, columna.tipo);
    });

    // Agrega la tabla a la base de datos
    baseDeDatos[nombreTabla] = nuevaTabla;
    //nuevaTabla.imprimirEstructura();
    imprimirEstructuraTablas();
    return nuevaTabla;
}

function procesarTruncateTable(instruccion){
    const nombreTabla=instruccion.nombreTabla;
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        // Borrar los valores de cada columna
        columnas.forEach((columna) => {
            columna.valores = [];
        });
        console.log(`Se han borrado todos los registros de la tabla "${nombreTabla}".`);
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
    imprimirEstructuraTablas();
}

function procesarMnameTable(instruccion, tablaDeSimbolos) {
    modificarNombreTabla(instruccion.nombreAntiguo, instruccion.nuevoNombre);
    imprimirEstructuraTablas();
}

function procesarNnameColumnTable(instruccion, tablaDeSimbolos) {
    cambiarNombreColumna(instruccion.nombreTabla, instruccion.nombreColumna, instruccion.nuevoNombre);
    imprimirEstructuraTablas();
}

function procesarAgregarColumna(instruccion, tablaDeSimbolos) {
    agregarColumnaATabla(instruccion.nombreTabla, instruccion.nombreColumna, instruccion.tipo_dato);
    imprimirEstructuraTablas();
}

function procesarInsertarDatos(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    const valores = instruccion.valores;
    insertarDatosEnTabla(nombreTabla, valores);
    console.log(valores)
    imprimirEstructuraTablas();
}

function procesarBorrarTabla(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    if (baseDeDatos[nombreTabla]) {
        delete baseDeDatos[nombreTabla];
        console.log(`Se ha borrado la tabla "${nombreTabla}".`);
    } else {
        throw `ERROR: La tabla "${nombreTabla}" no existe.`;
    }
    imprimirEstructuraTablas();
}

function procesarEliminarColumna(instruccion, tablaDeSimbolos) {
    eliminarColumnaDeTabla(instruccion.nombreTabla, instruccion.nombreColumna);
    imprimirEstructuraTablas();
}

function procesarExpresionNumerica(expresion, tablaDeSimbolos) {
    if (expresion.tipo === TIPO_OPERACION.NEGATIVO) {
       
        const valor = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos).valor;     // resolvemos el operando
        
        const res= valor * -1;
        return {valor: res, tipo: TIPO_DATO.NUMERO};
    } else if (expresion.tipo === TIPO_OPERACION.SUMA 
        || expresion.tipo === TIPO_OPERACION.RESTA
        || expresion.tipo === TIPO_OPERACION.MULTIPLICACION
        || expresion.tipo === TIPO_OPERACION.MODULO
        || expresion.tipo === TIPO_OPERACION.DIVISION) {
        // Es una operación aritmética.
        // En este caso necesitamos procesar los operandos antes de realizar la operación.
        // Para esto incovacmos (recursivamente) esta función para resolver los valores de los operandos.
        let valorIzq = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        let valorDer = procesarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        if(valorIzq.tipo!==TIPO_DATO.NUMERO || valorDer.tipo!==TIPO_DATO.NUMERO){
            throw 'ERROR: se esperaban expresiones numericas para ejecutar la: ' + expresion.tipo;
        }else{
            valorIzq=valorIzq.valor;
            valorDer=valorDer.valor;
        }
        if (expresion.tipo === TIPO_OPERACION.SUMA){
            const res= valorIzq + valorDer;
            return {valor: res, tipo: TIPO_DATO.NUMERO };
        }
        if (expresion.tipo === TIPO_OPERACION.RESTA) {
            const res= valorIzq - valorDer;
            return {valor: res, tipo: TIPO_DATO.NUMERO };
        }
        if (expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
            const res= valorIzq * valorDer;
            return {valor: res, tipo: TIPO_DATO.NUMERO };
        }
        if(expresion.tipo===TIPO_OPERACION.MODULO){
            const res= valorIzq % valorDer;
            return {valor: res, tipo: TIPO_DATO.NUMERO };
        }
        if (expresion.tipo === TIPO_OPERACION.DIVISION) {
            if(valorDer === 0){
                throw 'ERROR: la division entre 0 da como resultado: '+valorIzq/valorDer;
            }else{
                const res= valorIzq / valorDer;
                return {valor: res, tipo: TIPO_DATO.NUMERO };
            }
        };

    } else if (expresion.tipo === TIPO_VALOR.NUMERO) {
        // Es un valor numérico.
        // En este caso únicamente retornamos el valor obtenido por el parser directamente.
        return {valor: expresion.valor, tipo: TIPO_DATO.NUMERO };
    } else if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        // Es un identificador.
        // Obtenemos el valor de la tabla de simbolos
        const sym = tablaDeSimbolos.obtener(expresion.valor);
        return {valor: sym.valor, tipo: sym.tipo};
    } else {
        throw 'ERROR: expresión numérica no válida: ' + expresion;
    }
}


function procesarExpresionCadena(expresion, tablaDeSimbolos) {
    if (expresion.tipo === TIPO_OPERACION.CONCATENACION) {
        // Es una operación de concatenación.
        // En este caso necesitamos procesar los operandos antes de realizar la concatenación.
        // Para esto invocamos (recursivamente) esta función para resolver los valores de los operandos.
        const cadIzq = procesarExpresionCadena(expresion.operandoIzq, tablaDeSimbolos).valor;      // resolvemos el operando izquierdo.
        const cadDer = procesarExpresionCadena(expresion.operandoDer, tablaDeSimbolos).valor;      // resolvemos el operando derecho.
        // Retornamos el resultado de la operación de concatenación.
        const res=cadIzq + cadDer;
        return {valor: res, tipo: TIPO_DATO.STRING};   

    } else if (expresion.tipo === TIPO_VALOR.CADENA) {
        // Es una cadena.
        // En este caso únicamente retornamos el valor obtenido por el parser directamente.
        return {valor: expresion.valor, tipo: TIPO_DATO.STRING };
    } else {
        // Es una epresión numérica.
        // En este caso invocamos la función que se encarga de procesar las expresiones numéricas
        // y retornamos su valor en cadena.
        return procesarExpresionNumerica(expresion, tablaDeSimbolos);
    }
}


function procesarExpresionRelacional(expresion, tablaDeSimbolos) {
    // En este caso necesitamos procesar los operandos antes de realizar la comparación.
    let valorIzq = procesarExpresionNumerica(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
    let valorDer = procesarExpresionNumerica(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
    if(valorIzq.tipo!==TIPO_DATO.NUMERO || valorDer.tipo!==TIPO_DATO.NUMERO){
        throw 'ERROR: se esperaban expresiones numericas para ejecutar la: ' + expresion.tipo;
    }else{
        valorIzq=valorIzq.valor;
        valorDer=valorDer.valor;
    }

    if (expresion.tipo === TIPO_OPERACION.MAYOR_QUE) return valorIzq > valorDer;
    if (expresion.tipo === TIPO_OPERACION.MENOR_QUE) return valorIzq < valorDer;
    if (expresion.tipo === TIPO_OPERACION.MAYOR_IGUAL) return valorIzq >= valorDer;
    if (expresion.tipo === TIPO_OPERACION.MENOR_IGUAL) return valorIzq <= valorDer;
    if (expresion.tipo === TIPO_OPERACION.DOBLE_IGUAL) return valorIzq === valorDer;
    if (expresion.tipo === TIPO_OPERACION.NO_IGUAL) return valorIzq !== valorDer;
}


function procesarExpresionLogica(expresion, tablaDeSimbolos) {

    if (expresion.tipo === TIPO_OPERACION.AND) { 
        const valorIzq = procesarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionRelacional(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        return valorIzq && valorDer;
    }
    if (expresion.tipo === TIPO_OPERACION.OR) { 
        const valorIzq = procesarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        const valorDer = procesarExpresionRelacional(expresion.operandoDer, tablaDeSimbolos);      // resolvemos el operando derecho.
        return valorIzq || valorDer;
    }
    if (expresion.tipo === TIPO_OPERACION.NOT) { 
        const valor = procesarExpresionRelacional(expresion.operandoIzq, tablaDeSimbolos);      // resolvemos el operando izquierdo.
        return !valor;
    }
    return procesarExpresionRelacional(expresion, tablaDeSimbolos);
}


function procesarSelectColumnas(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    const columnasSeleccionadas = instruccion.columnas;

    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        const encabezados = columnasSeleccionadas.join('\t');

       
        const filas = [];

        // Obtener el número de registros (la cantidad de valores en una columna)
        const numeroRegistros = columnas.length > 0 ? columnas[0].valores.length : 0;

        // Iterar sobre los registros y seleccionar las columnas especificadas
        for (let i = 0; i < numeroRegistros; i++) {
            const fila = columnasSeleccionadas.map((columnaSeleccionada) => {
                const columna = columnas.find((col) => col.nombre === columnaSeleccionada);

                if (columna) {
                    return columna.valores[i];
                } else {
                    return 'N/A'; // No se encontró la columna
                }
            });
            filas.push(fila.join('\t'));
        }

        // Formatear la salida
        const resultado = `Tabla: ${nombreTabla}\n${encabezados}\n${filas.join('\n')}`;
        
        // Retornar los datos seleccionados en el formato requerido
        return resultado;
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
        return null;
    }
}




function procesarImprimir(instruccion, tablaDeSimbolos) {
    const cadena = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor;
    console.log('> ' + cadena);
    return cadena;
}

function procesarDeclaracion(instruccion, tablaDeSimbolos) { //aqui cambiamos para que acepte el tipo_dato de la declaracion
    tablaDeSimbolos.agregar(instruccion.identificador, instruccion.tipo_dato);
}

function procesarDeclaracionYA(instruccion,tablaDeSimbolos){
    const valor = procesarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos);
    tablaDeSimbolos.agregarValor(instruccion.identificador, instruccion.tipo_dato, valor.valor);
}


function procesarAsignacion(instruccion, tablaDeSimbolos) {
    const valor = procesarExpresionCadena(instruccion.expresionNumerica, tablaDeSimbolos); //aqui quiero que retorne: tipo y valor
    tablaDeSimbolos.actualizar(instruccion.identificador, valor);//se crea el valor
}



function procesarIf(instruccion, tablaDeSimbolos) {
    const valorCondicion = procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);

    if (valorCondicion) {
        const tsIf = new TS(tablaDeSimbolos.simbolos);
        const {procesarBloque} =require('./interprete'); //evitar dependencia circular
        return procesarBloque(instruccion.instrucciones, tsIf);
    }
}

function procesarLower(instruccion, tablaDeSimbolos) {
    const valor = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor;
    return valor.toLowerCase();
}

function procesarRound(instruccion, tablaDeSimbolos) {
    const valor=procesarExpresionNumerica(instruccion.expresionNumerica, tablaDeSimbolos).valor;
    const n_decimales=procesarExpresionNumerica(instruccion.n_decimales, tablaDeSimbolos).valor;
    return valor.toFixed(n_decimales);
}

function procesarLen(instruccion, tablaDeSimbolos) {
    const valor = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor;
    const longitud= valor.length;
    return "La longitud de la cadena es: "+longitud;
}

function procesarTruncate(instruccion, tablaDeSimbolos) {
    const valor = procesarExpresionNumerica(instruccion.expresionNumerica, tablaDeSimbolos).valor;
    const n_decimales = procesarExpresionNumerica(instruccion.n_decimales, tablaDeSimbolos).valor;

    const numeroTruncado = truncarNumero(valor, n_decimales);

    return numeroTruncado;
}

function truncarNumero(numero, decimales) {
    const factor = Math.pow(10, decimales);
    return Math.trunc(numero * factor) / factor;
}

function procesarUpper(instruccion, tablaDeSimbolos) {
    const valor = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor;
    return valor.toUpperCase();
}

function procesarTypeOf(instruccion, tablaDeSimbolos) {
    // Reconoce el tipo de dato
    const valor = procesarExpresionCadena(instruccion.expresionCadena, tablaDeSimbolos).valor;
    let respuesta = typeof valor; // Usamos 'let' en lugar de 'const'

    if (respuesta === 'number') {
        // Distinguir entre int y float
        if (Number.isInteger(valor)) {
            respuesta = 'int';
        } else {
            respuesta = 'double';
        }
    }

    return respuesta;
}

function procesarWhile(instruccion, tablaDeSimbolos) {
    let valorCondicion = procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);
    let resultados = ''; // Inicializamos una cadena para almacenar los resultados

    while (valorCondicion) {
        const tsWhile = new TS(tablaDeSimbolos.simbolos);
        const { procesarBloque } = require('./interprete'); // Evitar dependencia circular
        const resultadoBloque = procesarBloque(instruccion.instrucciones, tsWhile); // Procesar bloque del "while"
        resultados += resultadoBloque + '\n'; // Agregamos el resultado al registro
        valorCondicion = procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos); // Actualizar la condición
    }
    return resultados; // Devolvemos los resultados acumulados
}

function procesarInstruccionesVarias(instruccion, tablaDeSimbolos) {
    let resultados = ''; // Inicializamos una cadena para almacenar los resultados
    const tsVarias = new TS(tablaDeSimbolos.simbolos);
    const { procesarBloque } = require('./interprete');
    const resultadoBloque = procesarBloque(instruccion.instrucciones, tsVarias); 
    resultados += resultadoBloque + '\n';
    return resultados;
}

function procesarCase(instruccion, tablaDeSimbolos) {
    const casos=instruccion.instrucciones;
    const ValorElse= (instruccion.expresion_else).valor;
    
    for (const caso of casos) {
        const expresionLogica = caso.expresionLogica;
        const expresionCadena = caso.expresionCadena;

        const valorCondicion = procesarExpresionLogica(expresionLogica, tablaDeSimbolos);

        if (valorCondicion) {
            // Si se cumple la condición, imprime la expresión de cadena y sale del CASE
            return procesarExpresionCadena(expresionCadena, tablaDeSimbolos).valor;
        }
    }

    return ValorElse;
}

function procesarUpdate(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    const nombreColumna = instruccion.columnaModificar;
    const valorBuscar = instruccion.nuevoValor;
    const columnaModificar = instruccion.nombreColumna;
    const nuevoValor = instruccion.valorBuscar;
    modificarTablaConCondicion(nombreTabla, nombreColumna, valorBuscar, columnaModificar, nuevoValor);
    // console.log("nombre tabla",nombreTabla);
    // console.log("columna buscar ",nombreColumna);
    // console.log("valor buscar ",valorBuscar);
    // console.log("columna modificar ",columnaModificar);
    // console.log("nuevo valor ",nuevoValor);
    imprimirEstructuraTablas();
}

function procesarDelete(instruccion, tablaDeSimbolos) {
    const nombreTabla = instruccion.nombreTabla;
    const nombreColumna = instruccion.columna;
    const valorBuscar = instruccion.valorBuscar;
    borrarFilaConCondicion(nombreTabla, nombreColumna, valorBuscar);
    console.log("nombre tabla",nombreTabla);
    console.log("columna buscar ",nombreColumna);
    console.log("valor buscar ",valorBuscar);
    imprimirEstructuraTablas();
}

function procesarFor(instruccion, tablaDeSimbolos) {
    const tsFor = new TS(tablaDeSimbolos.simbolos);
    const { procesarBloque } = require('./interprete'); // Evitar dependencia circular
    const resultadoBloque = procesarBloque(instruccion.instrucciones, tsFor); // Procesar bloque del "for"
    return resultadoBloque;
}


function procesarIfelse(instruccion, tablaDeSimbolos) {
    const valorCondicion = procesarExpresionLogica(instruccion.expresionLogica, tablaDeSimbolos);

    if (valorCondicion) {
        const tsIf = new TS(tablaDeSimbolos.simbolos);
        const {procesarBloque} = require('./interprete'); // Evitar dependencia circular
        return procesarBloque(instruccion.instruccionesIf, tsIf); // Procesar bloque del "if"
    } else {
        const tsElse = new TS(tablaDeSimbolos.simbolos);
        const {procesarBloque} = require('./interprete'); // Evitar dependencia circular
        return procesarBloque(instruccion.instruccionesElse, tsElse); // Procesar bloque del "else"
    }
}

