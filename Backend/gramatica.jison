/**
 * Ejemplo Intérprete Sencillo con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"--".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"print"			return 'RIMPRIMIR';
"numero"			return 'RNUMERO';
"string"			return 'RSTRING';
"if"				return 'RIF';
"declare"			return 'DECLARE';
"varchar"			return 'VARCHAR';
"int"				return 'INT';
"date"				return 'DATE';
"boolean"			return 'BOOLEAN';
"double" 			return	'DOUBLE';
"null" 				return 'NULL';

"default"			return 'DEFAULT';
"set"				return 'SET';
"create"			return 'CREATE';
"table"				return 'TABLE';
"alter"				return 'ALTER';
"add"				return 'ADD';
"drop"				return 'DROP';
"rename"			return 'RENAME';
"column" 			return 'COLUMN';
"to"				return 'TO';
"insert"			return 'INSERT';
"into"				return 'INTO';
"values"			return 'VALUES';
"select"			return 'SELECT';
"from"				return 'FROM';
"update"			return 'UPDATE';
"where"				return 'WHERE';
"truncate"			return 'TRUNCATE';
"then"				return 'THEN';
"end" 				return 'END';
"else"				return 'ELSE';
"lower"				return 'LOWER';
"upper"				return 'UPPER';
"round"				return 'ROUND';
"len" 				return 'LEN';
"typeof"			return 'TYPEOF';
"case"				return 'CASE';
"when"				return 'WHEN';
"while"				return 'WHILE';
"begin"				return 'BEGIN';
"delete"			return 'DELETE';
"for"				return 'FOR';
"in"				return 'IN';

"and"				return 'AND';
"or"				return 'OR';
"not"					return 'NOT';



":"					return 'DOSPTS';
","					return 'COMA';
";"					return 'PTCOMA';
"{"					return 'LLAVIZQ';
"}"					return 'LLAVDER';
"("					return 'PARIZQ';
")"					return 'PARDER';
"@"					return 'ARROBA';
"."					return 'DOT';



"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"%"					return 'MODULO';
"/"					return 'DIVIDIDO';
"&"					return 'CONCAT';

"<="				return 'MENIGQUE';
">="				return 'MAYIGQUE';
"=="				return 'DOBLEIG';
"!="				return 'NOIG';

"<"					return 'MENQUE';
">"					return 'MAYQUE';
"="					return 'IGUAL';



\'[^\']*\'			{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.					{ console.error('error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{
	const TIPO_OPERACION	= require('./instrucciones').TIPO_OPERACION;
	const TIPO_VALOR 		= require('./instrucciones').TIPO_VALOR;
	const TIPO_DATO			= require('./tabla_simbolos').TIPO_DATO; //para jalar el tipo de dato
	const instruccionesAPI	= require('./instrucciones').instruccionesAPI;
	const crearDato			= require('./pruebas').crearDato;
%}


/* Asociación de operadores y precedencia */
%left 'CONCAT'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO'
%left 'MODULO'
%left UMENOS

%start ini

%% /* Definición de la gramática */

ini
	: instrucciones EOF {
		// cuado se haya reconocido la entrada completa retornamos el AST
		return $1;
	}
;

instrucciones
	: instrucciones instruccion { $1.push($2); $$ = $1; }
	| instruccion		{ $$ = [$1]; }
;

instruccion
	: RIMPRIMIR expresion_cadena PTCOMA	{ $$ = instruccionesAPI.nuevoImprimir($2); }
	| IDENTIFICADOR IGUAL expresion_cadena PTCOMA		{ $$ = instruccionesAPI.nuevoAsignacion($1, $3); } 
	| SET ARROBA IDENTIFICADOR IGUAL expresion_cadena PTCOMA { $$ = instruccionesAPI.nuevoAsignacion($3, $5); } 
	| CREATE TABLE IDENTIFICADOR PARIZQ datos_tabla PARDER PTCOMA {$$= instruccionesAPI.nuevoCrearTabla($3, $5);}
	| ALTER TABLE IDENTIFICADOR RENAME TO IDENTIFICADOR PTCOMA {$$=instruccionesAPI.nuevoMnombreTabla($3,$6);}
	| ALTER TABLE IDENTIFICADOR ADD IDENTIFICADOR tipo_dato PTCOMA {$$=instruccionesAPI.nuevoAddColumnTabla($3,$5,$6);}
	| ALTER TABLE IDENTIFICADOR DROP COLUMN IDENTIFICADOR PTCOMA {$$=instruccionesAPI.nuevoDeleteColumnTabla($3, $6);}
	| ALTER TABLE IDENTIFICADOR RENAME COLUMN IDENTIFICADOR TO IDENTIFICADOR PTCOMA  {$$=instruccionesAPI.nuevoNombreColumnTabla($3, $6,$8);}
	| DROP TABLE IDENTIFICADOR PTCOMA {$$=instruccionesAPI.nuevoBorrarTabla($3);}
	| SELECT valores_varios FROM IDENTIFICADOR PTCOMA {$$=instruccionesAPI.nuevoSelectColumnas($4,$2)}
	| SELECT  POR FROM IDENTIFICADOR PTCOMA {$$=instruccionesAPI.nuevoSelectAll($4)}
	| INSERT INTO IDENTIFICADOR PARIZQ valores_varios PARDER VALUES PARIZQ valores_tabla PARDER PTCOMA{$$=instruccionesAPI.nuevoDatosTabla($3,$9);}
	| UPDATE IDENTIFICADOR SET IDENTIFICADOR IGUAL expresion_cadena WHERE IDENTIFICADOR IGUAL expresion_cadena PTCOMA{$$=instruccionesAPI.nuevoUpdate($2,$4, $6,$8, $10);}
	| DELETE FROM IDENTIFICADOR WHERE IDENTIFICADOR IGUAL expresion_cadena PTCOMA {$$=instruccionesAPI.nuevoDelete($3,$5,$7)}
	| TRUNCATE TABLE IDENTIFICADOR PTCOMA{$$=instruccionesAPI.nuevoTrucateTable($3);}
	| RIF expresion_logica THEN BEGIN instrucciones END PTCOMA{ $$ = instruccionesAPI.nuevoIf($2, $5); }
	| SELECT LOWER PARIZQ expresion_cadena PARDER PTCOMA { $$ = instruccionesAPI.nuevoLower($4);}
	| SELECT UPPER PARIZQ expresion_cadena PARDER PTCOMA  { $$ = instruccionesAPI.nuevoUpper($4);}
	| SELECT ROUND PARIZQ expresion_numerica COMA expresion_numerica PARDER PTCOMA {$$= instruccionesAPI.nuevoRound($4, $6);}
	| SELECT LEN  PARIZQ expresion_cadena PARDER PTCOMA {$$= instruccionesAPI.nuevoLen($4);}
	| SELECT TRUNCATE PARIZQ expresion_numerica COMA expresion_numerica PARDER PTCOMA {$$= instruccionesAPI.nuevoTruncate($4, $6);}
	| RIF expresion_logica THEN instrucciones ELSE instrucciones END RIF	PTCOMA	{ $$ = instruccionesAPI.nuevoIfElse($2, $4,$6); }
	| SELECT TYPEOF PARIZQ expresion_cadena PARDER PTCOMA {$$=instruccionesAPI.nuevoTypeof($4);}
	| CASE sentencias_case ELSE expresion_cadena END PTCOMA {$$ = instruccionesAPI.nuevoCase($2,$4)}
	| DECLARE declaracion PTCOMA	{ $$ = $2; }
	| BEGIN instrucciones END { $$ = instruccionesAPI.nuevoInstruccionesVarias($2); }
	| FOR ARROBA IDENTIFICADOR IN expresion_numerica DOT DOT expresion_numerica BEGIN instrucciones END PTCOMA {$$ =instruccionesAPI.nuevofor($3, $5, $8, $10);}
	| WHILE expresion_logica BEGIN instrucciones END PTCOMA {$$= instruccionesAPI.nuevoWhile($2, $4);}
	| error { console.error('error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;



datos_tabla
	: datos_tabla COMA dato_tabla	{ $1.push($3); $$ = $1; }
	| dato_tabla				{ $$ = [$1]; }
;

dato_tabla: IDENTIFICADOR tipo_dato {$$=crearDato($1,$2);}
;

sentencias_case
	: sentencias_case nueva_sentencia	{ $1.push($2); $$ = $1; }
	| nueva_sentencia				{ $$ = [$1]; }
;

nueva_sentencia
	: WHEN expresion_logica THEN expresion_cadena {$$=instruccionesAPI.nuevoWhenCase($2,$4);}
;

valores_varios: valores_varios COMA IDENTIFICADOR{ $1.push($3); $$ = $1; }
		|IDENTIFICADOR     { $$ = [$1]; }
;

valores_tabla: valores_tabla COMA expresion_cadena { $1.push($3); $$ = $1; }
		|expresion_cadena { $$ = [$1]; }

;

declaraciones
	: declaraciones COMA declaracion	{ $1.push($3); $$ = $1; }
	| declaracion				{ $$ = [$1]; }
	;

declaracion
	: ARROBA IDENTIFICADOR tipo_dato	{ $$ = instruccionesAPI.nuevoDeclaracion($2, $3); }
	| ARROBA IDENTIFICADOR tipo_dato DEFAULT expresion_cadena {$$=instruccionesAPI.nuevoDeclaracionYA($2,$3,$5);}
	;


tipo_dato
    : INT { $$ = TIPO_DATO.NUMERO; }
    | VARCHAR { $$ = TIPO_DATO.STRING; }
    | DATE { $$ = TIPO_DATO.DATE; }
	| BOOLEAN { $$ = TIPO_DATO.BOOLEAN; }
	| DOUBLE { $$ = TIPO_DATO.DOUBLE; }
;

expresion_numerica
	: MENOS expresion_numerica %prec UMENOS				{ $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.NEGATIVO); }
	| expresion_numerica MAS expresion_numerica			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA); }
	| expresion_numerica MENOS expresion_numerica		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA); }
	| expresion_numerica POR expresion_numerica			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION); }
	| expresion_numerica DIVIDIDO expresion_numerica	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION); }
	| expresion_numerica MODULO expresion_numerica	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MODULO); }	
	| PARIZQ expresion_numerica PARDER					{ $$ = $2; }
	| ENTERO											{ $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
	| DECIMAL											{ $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
	| ARROBA IDENTIFICADOR										{ $$ = instruccionesAPI.nuevoValor($2, TIPO_VALOR.IDENTIFICADOR); }
	| IDENTIFICADOR										{ $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR); }
;

expresion_cadena
	: expresion_cadena CONCAT expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.CONCATENACION); }
	| CADENA											{ $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA); }
	| expresion_numerica								{ $$ = $1; }
;

expresion_relacional
	: expresion_numerica MAYQUE expresion_numerica		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_QUE); }
	| expresion_numerica MENQUE expresion_numerica		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_QUE); }
	| expresion_numerica MAYIGQUE expresion_numerica	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR_IGUAL); }
	| expresion_numerica MENIGQUE expresion_numerica	{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENOR_IGUAL); }
	| expresion_cadena IGUAL expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DOBLE_IGUAL); }
	| expresion_cadena NOIG expresion_cadena			{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.NO_IGUAL); }
;

expresion_logica
	: expresion_relacional AND expresion_relacional     { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.AND); }
	| expresion_relacional OR expresion_relacional 		{ $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.OR); }
	| NOT expresion_relacional							{ $$ = instruccionesAPI.nuevoOperacionUnaria($2, TIPO_OPERACION.NOT); }
	| expresion_relacional								{ $$ = $1; }
;