class Tabla {
    constructor(nombreTabla) {
        this.nombre = nombreTabla;
        this.columnas = [];
    }

    // Método para agregar una columna a la tabla
    agregarColumna(nombreColumna, tipoDato) {
        this.columnas.push({ nombre: nombreColumna, tipo: tipoDato, valores: [] });
    }
    // Método para imprimir la estructura de la tabla
    imprimirEstructura() {
        console.log(`Datos de la tabla "${this.nombre}":`);
    
        // Imprimir encabezados de las columnas
        const encabezados = this.columnas.map((columna) => columna.nombre);
        console.log(encabezados.join('\t'));
    
        // Obtener el número de registros (la cantidad de valores en una columna)
        const numeroRegistros = this.columnas.length > 0 ? this.columnas[0].valores.length : 0;
    
        // Imprimir los valores de cada columna
        for (let i = 0; i < numeroRegistros; i++) {
            const fila = this.columnas.map((columna) => columna.valores[i]);
            console.log(fila.join('\t'));
        }
        
    }
}

const baseDeDatos = {};

function crearTabla(nombreTabla, columnas) {
    if (!baseDeDatos[nombreTabla]) {
        baseDeDatos[nombreTabla] = new Tabla(nombreTabla);
        // Agregar las columnas a la tabla
        columnas.forEach((columna) => {
            baseDeDatos[nombreTabla].agregarColumna(columna.nombre, columna.tipo);
        });
    } else {
        console.error(`La tabla "${nombreTabla}" ya existe.`);
    }
}

function modificarNombreTabla(nombreAntiguo, nuevoNombre) {
    if (baseDeDatos[nombreAntiguo]) {
        if (!baseDeDatos[nuevoNombre]) {
            // Crear una nueva tabla con el nuevo nombre y copiar las columnas
            baseDeDatos[nuevoNombre] = new Tabla(nuevoNombre);
            baseDeDatos[nuevoNombre].columnas = baseDeDatos[nombreAntiguo].columnas;

            // Eliminar la tabla anterior
            delete baseDeDatos[nombreAntiguo];

            console.log(`Se ha modificado el nombre de la tabla "${nombreAntiguo}" a "${nuevoNombre}".`);
        } else {
            console.error(`El nuevo nombre "${nuevoNombre}" ya está en uso.`);
        }
    } else {
        console.error(`La tabla "${nombreAntiguo}" no existe.`);
    }
}

function agregarColumnaATabla(nombreTabla, nombreColumna, tipoDato) {
    if (baseDeDatos[nombreTabla]) {
        // La tabla existe, por lo que podemos agregar la columna.
        baseDeDatos[nombreTabla].agregarColumna(nombreColumna, tipoDato);
        console.log(`Se ha agregado la columna "${nombreColumna}" de tipo "${tipoDato}" a la tabla "${nombreTabla}".`);
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}

function eliminarColumnaDeTabla(nombreTabla, nombreColumna) {
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;
        const columnaIndex = columnas.findIndex((columna) => columna.nombre === nombreColumna);
        if (columnaIndex !== -1) {
            // La columna existe en la tabla, por lo que la eliminamos.
            columnas.splice(columnaIndex, 1);
            console.log(`Se ha eliminado la columna "${nombreColumna}" de la tabla "${nombreTabla}".`);
        } else {
            console.error(`La columna "${nombreColumna}" no existe en la tabla "${nombreTabla}".`);
        }
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}

function cambiarNombreColumna(nombreTabla, nombreColumna, nuevoNombreColumna) {
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;
        const columnaExistente = columnas.find((columna) => columna.nombre === nombreColumna);

        if (columnaExistente) {
            // Cambiamos el nombre de la columna existente.
            columnaExistente.nombre = nuevoNombreColumna;
            console.log(`Se ha cambiado el nombre de la columna "${nombreColumna}" a "${nuevoNombreColumna}" en la tabla "${nombreTabla}".`);
        } else {
            console.error(`La columna "${nombreColumna}" no existe en la tabla "${nombreTabla}".`);
        }
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}

function insertarDatosEnTabla(nombreTabla, datos) {
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        if (datos.length === columnas.length) {
            for (let i = 0; i < datos.length; i++) {
                // Insertar el valor y tipo en la columna correspondiente
                columnas[i].valores.push(datos[i].valor); // Guardar el valor
                columnas[i].tipo = datos[i].tipo; // Guardar el tipo
            }

            console.log(`Se han insertado los datos en la tabla "${nombreTabla}".`);
        } else {
            console.error(`La cantidad de datos proporcionados no coincide con el número de columnas en la tabla "${nombreTabla}".`);
        }
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}


function imprimirEstructuraTablas() {
    console.log("Estructura de las tablas en la base de datos:");

    for (const nombreTabla in baseDeDatos) {
        if (baseDeDatos.hasOwnProperty(nombreTabla)) {
            const tabla = baseDeDatos[nombreTabla];
            tabla.imprimirEstructura();
        }
    }
}

function crearDato(nombre, tipo) {
    return { nombre, tipo };
}

function modificarTablaConCondicion(nombreTabla, columnaCondicion, valorCondicion, columnaModificar, nuevoValor) {
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        // Encontrar el índice de la columna de condición
        const columnaCondicionIndex = columnas.findIndex((columna) => columna.nombre === columnaCondicion);

        if (columnaCondicionIndex !== -1) {
            // Encontrar el índice de la columna a modificar
            const columnaModificarIndex = columnas.findIndex((columna) => columna.nombre === columnaModificar);

            if (columnaModificarIndex !== -1) {
                // Recorrer todas las filas de la tabla
                for (let i = 0; i < columnas[columnaCondicionIndex].valores.length; i++) {
                    const valorFila = columnas[columnaCondicionIndex].valores[i];

                    // Verificar si el valor de la fila coincide con el valor de condición
                    if (
                        valorFila &&
                        valorFila.tipo === valorCondicion.tipo &&
                        valorFila.valor === valorCondicion.valor
                    ) {
                        // Modificar el valor de la columna deseada
                        const nuevoValorCopiado = { ...nuevoValor };
                        columnas[columnaModificarIndex].valores[i] = nuevoValorCopiado;
                    }
                }
                console.log(`Se han modificado los datos en la tabla "${nombreTabla}" basados en la condición.`);
            } else {
                console.error(`La columna "${columnaModificar}" no existe en la tabla "${nombreTabla}".`);
            }
        } else {
            console.error(`La columna "${columnaCondicion}" no existe en la tabla "${nombreTabla}".`);
        }
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}


function borrarFilaConCondicion(nombreTabla, columnaCondicion, valorCondicion) {
    if (baseDeDatos[nombreTabla]) {
        const tabla = baseDeDatos[nombreTabla];
        const columnas = tabla.columnas;

        // Encontrar el índice de la columna de condición
        const columnaCondicionIndex = columnas.findIndex((columna) => columna.nombre === columnaCondicion);

        if (columnaCondicionIndex !== -1) {
            // Crear una lista de índices para las filas que coinciden con la condición
            const filasAEliminar = [];

            for (let i = 0; i < columnas[columnaCondicionIndex].valores.length; i++) {
                const valorFila = columnas[columnaCondicionIndex].valores[i];

                // Verificar si el valor de la fila coincide con la condición
                if (
                    valorFila.tipo === valorCondicion.tipo &&
                    valorFila.valor === valorCondicion.valor
                ) {
                    filasAEliminar.push(i);
                }
            }

            // Eliminar las filas correspondientes de todas las columnas
            filasAEliminar.reverse(); // Reversar el orden para evitar problemas al eliminar
            filasAEliminar.forEach((filaIndex) => {
                columnas.forEach((columna) => {
                    columna.valores.splice(filaIndex, 1);
                });
            });

            console.log(`Se han borrado las filas en la tabla "${nombreTabla}" basadas en la condición.`);
        } else {
            console.error(`La columna "${columnaCondicion}" no existe en la tabla "${nombreTabla}".`);
        }
    } else {
        console.error(`La tabla "${nombreTabla}" no existe.`);
    }
}






// Imprimir la estructura de la tabla "Clientes"

module.exports = {
    Tabla,
    baseDeDatos,
    crearTabla,
    crearDato,
    imprimirEstructuraTablas, 
    modificarNombreTabla, 
    agregarColumnaATabla, 
    eliminarColumnaDeTabla,
    cambiarNombreColumna, 
    insertarDatosEnTabla, 
    modificarTablaConCondicion, 
    borrarFilaConCondicion
};