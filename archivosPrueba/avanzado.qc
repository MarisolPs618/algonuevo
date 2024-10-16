PRINT 'ARCHIVO DE CALIFICACION AVANZADO';
-- Crear tablas
CREATE TABLE Productos (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
CREATE TABLE Productos2 (
    ProductoID INT,
    Nombre VARCHAR,
    Precio DOUBLE,
    Stock INT
);

CREATE TABLE Ventas2 (
    VentaID INT,
    ProductoID INT,
    Cantidad INT,
    FechaVenta DATE,
    Total DOUBLE,
    MetodoPago VARCHAR,
    EstadoVenta VARCHAR
);
-- Alterar tabla (Modificar columna Precio)
ALTER TABLE Productos
RENAME COLUMN Precio TO PrecioUnitario;

-- Alterar tabla (Agregar columna Categoria)
ALTER TABLE Productos
ADD Categoria VARCHAR;

-- Drop tablas avanzadas
DROP TABLE Ventas2;
DROP TABLE Productos2;


-- Insertar datos
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (1, 'Producto X', 1000.00, 50, 'Electrónicos');
INSERT INTO Productos (ProductoID, Nombre, PrecioUnitario, Stock, Categoria)
VALUES (2, 'Producto Y', 750.50, 30, 'Ropa');

INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (501, 1, 10, '2023-10-17', 10000.00, 'Tarjeta', 'Completado');
INSERT INTO Ventas (VentaID, ProductoID, Cantidad, FechaVenta, Total, MetodoPago, EstadoVenta)
VALUES (502, 2, 5, '2023-10-16', 3752.50, 'Efectivo', 'Pendiente');

-- Seleccionar datos con WHERE (Operaciones lógicas y relacionales)
SELECT ProductoID, Nombre, PrecioUnitario, Categoria
FROM Productos
WHERE Stock > 0 AND PrecioUnitario >= 800.00 AND PrecioUnitario <= 1200.00;

SELECT VentaID, FechaVenta, Total, EstadoVenta
FROM Ventas
WHERE (MetodoPago = 'Tarjeta' OR MetodoPago = 'Efectivo') AND EstadoVenta = 'Completado';

-- Actualizar datos
UPDATE Productos
SET Stock = Stock - 10
WHERE ProductoID = 1;
Select * from Productos;

-- Truncar tabla
TRUNCATE TABLE Ventas;
select * from Ventas;

-- Borrar datos
DELETE FROM Productos WHERE ProductoID = 2;
select * from Productos;

BEGIN
    DECLARE @valor1 INT DEFAULT 55;
    DECLARE @valor2 INT DEFAULT 30;

    IF (@valor1 * @valor2) % 7 = 0 AND (@valor1 - @valor2) > 10 THEN
        PRINT 'El producto es divisible por 7 y la diferencia es mayor que 10';
    ELSE
        PRINT 'Al menos una de las condiciones no se cumple';
    END IF;

    DECLARE @cantidad INT DEFAULT 12;
    DECLARE @precio DOUBLE DEFAULT 18.75;

    IF @cantidad * @precio >= 200 OR (@cantidad % 3 = 0 AND @precio >= 15) THEN
        PRINT 'El total es mayor o igual a 200 o la cantidad es divisible por 3 y el precio es mayor o igual a 15';
    ELSE
        PRINT 'Al menos una de las condiciones no se cumple';
    END IF;
    DECLARE @edad INT DEFAULT 19;
    DECLARE @puntuacion INT DEFAULT 79;

    CASE 
        WHEN @edad >= 18 AND @puntuacion >= 70 AND @puntuacion % 2 = 1 THEN 'Adulto Aprobado e Impar'
        WHEN @edad >= 18 AND @puntuacion < 70 AND @puntuacion % 5 = 0 THEN 'Adulto No Aprobado y Múltiplo de 5'
        WHEN @edad < 18 AND @puntuacion >= 80 AND @puntuacion % 3 = 0 THEN 'Joven Aprobado y Múltiplo de 3'
        WHEN @edad < 18 AND @puntuacion < 80 THEN 'Joven No Aprobado'
        ELSE 'Otro'
    END;

    DECLARE @sumaCuadrados INT DEFAULT 0;
    DECLARE @i INT DEFAULT 1;

    FOR @i IN 1..10
    BEGIN
        SET @sumaCuadrados = @sumaCuadrados + (@i * @i);
    END;
    PRINT 'La suma de los cuadrados de los primeros 10 números naturales es: ' + CAST(@sumaCuadrados AS VARCHAR);

END;
-- procedure
CREATE PROCEDURE figura1 
@n INT
BEGIN
    DECLARE @i INT;
    DECLARE @j INT;
    DECLARE @cadenaFigura VARCHAR;
    
    SET @i = -3 * @n / 2;
    WHILE i <= @n 
    BEGIN
        SET @cadenaFigura = '';
        SET @j = -3 * @n / 2;
        WHILE @j <= 3 * @n / 2 
        BEGIN
            DECLARE @absolutoi INT;
            DECLARE @absolutoj INT;
            
            IF @i < 0 THEN
                SET @absolutoi = -@i;
            ELSE
                SET @absolutoi = @i;
            END IF;
            
            IF @j < 0 THEN
                SET @absolutoj = -@j;
            ELSE
                SET @absolutoj = @j;
            END IF;

            IF (@absolutoi + @absolutoj < @n
                OR ((-@n / 2 - @i) * (-@n / 2 - @i) + (@n / 2 - j) * (@n / 2 - @j) <= @n * @n / 2)
                OR ((-@n / 2 - @i) * (-@n / 2 - @i) + (-@n / 2 - @j) * (-@n / 2 - @j) <= @n * @n / 2)) THEN
                SET @cadenaFigura = @cadenaFigura + '* ';
            ELSE
                SET @cadenaFigura = @cadenaFigura+ '. ';
            END IF;
            
            SET @j = @j + 1;
        END;
        
        SELECT @cadenaFigura;
        SET @i = @i + 1;
    END ;
    
    print 'la figura es un corazón <3';
END;

-- Funciones con parámetros
CREATE FUNCTION Fibonacci(@n INT) RETURNS INT
BEGIN
    DECLARE @resultado INT;
    
    IF n > 1 THEN
    BEGIN
        SET @resultado = Fibonacci(@n - 1) + Fibonacci(@n - 2);
    END;
    
    IF n = 1 THEN
    BEGIN
        SET @resultado = 1;
    END;
    
    IF n = 0 THEN
    BEGIN
        SET @resultado = 0;
    END;
    
    IF n < 0 THEN
    BEGIN
        SET @resultado = NULL;
    END;
    
    RETURN @resultado;
END;
CREATE PROCEDURE SumarNumeros
    @numero1 INT,
    @numero2 INT
AS
BEGIN
    DECLARE @resultado INT;
    SET @resultado = @numero1 + @numero2;
    PRINT 'La suma es: ' + CAST(@resultado AS VARCHAR);
END;

-- Llamadas a procedimientos y funciones con parámetros
CALL figura1(10); 
CALL SumarNumeros(10, 20);
SELECT Fibonacci(10); 