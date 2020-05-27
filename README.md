# ¡¡ Letters-soup!! :stew:

### Descripcion
**Letters-soup** es una pequeña libreria para crear tableros para jugar a encuentra la palabra.

[![sopa-letras](https://lh3.googleusercontent.com/proxy/LWp3CBH23QY6hFBvNJWhYh1OZogq7xRN2ioDxeJRDMPWI_mGtV6d1wCg2icUReko-TJHdZA9Q96Dqb1PIErBxAq6OC_wilnKxDZ4YZXI3fQSBWRGdRX4 "sopa-letras")](https://lh3.googleusercontent.com/proxy/LWp3CBH23QY6hFBvNJWhYh1OZogq7xRN2ioDxeJRDMPWI_mGtV6d1wCg2icUReko-TJHdZA9Q96Dqb1PIErBxAq6OC_wilnKxDZ4YZXI3fQSBWRGdRX4 "sopa-letras")

### Instalacion
Por ahora solo se puede descargar desde el [tag release](https://github.com/franciscoDev/letters-soup/releases) de este repositorio pronto se creara un paquete para npm.

:point_right:  [letters-soup-alpha-1.0](https://github.com/franciscoDev/letters-soup/releases/ "letters-soup-alpha-1.0")

### Uso

La funcion **init** inicializa el tablero y retorna un objeto **Soup**,recibe dos parametros que son requeridos:
- data : array de string.
- size : un entero positivo que define el tamaño del tablero.

```javascript
const data = ["iguala","cuervo","perro","cocodrilo","delfin"
                    ,"leon","pantera","gato","perico","mono"
                    ,"raton","abeja","zebra","tigre","canguro"];
const size = 10;
var soup =  Soup.init(data,size);
```
> :warning: **Tamaño de las palabras**: la palabras deben tener una longitud variable y menor al tamaño del tablero
ya que podria quedarse en un ciclo infinito tratando de colocar las palabras en el tablero; de igual forma el numero de palabras debe ser proporcional al tamaño del tablero para que tengan una correcta distribucion en el tablero.

#### Generar el tablero

La funcion **generate#** retorna un array con las palabras ingresadas, colocadas aleatoriamente.

```javascript
var soup =  Soup.init(data,size);
var board = soup.generate();
```


La funcion **getSolution#** retorna un array con la pocision de las palabras ingresadas en el tablero .
>:information_source: **Parametro opcional**: si se le pasa a la funcion cualquier palabra ingresada en el tablero retornara solo las pocisciones de esa palabra de lo contrario devolvera todas las pocisiones para todas las palabras ingresadas en el tablero.
```javascript
var soup  =  Soup.init(data,size);
//without param
var solve = soup.getSolution();
//with param
var solveToZebra = soup.getSolution('zebra');
```

La funcion **setSize#** establece un nuevo tamaño para el tablero recibe un valor numerico para el nuevo tamaño.
 
```javascript
var soup  =  Soup.init(data,size);
soup.setSize(10);
```
La funcion **setContent#** establece un nuevo contenido para el tablero recibe un **array** de string para colocar en el tablero.
>:information_source: **Contenido**: el contenido no solo puede ser palabra tambien puede ser combinacion de numeros,caracteres epeciales etc. Tambien se puede enviar un relleno acorde al contenido del tablero en la funcion **init#** o **setFill#** para ocultar los caracteres.
 
```javascript
const data = ["iguala","cuervo","perro","cocodrilo","delfin"
                    ,"leon","pantera","gato","perico","mono"]
//default fill is 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.            
var soup  =  Soup.init(data,size,fill);

const data2 = ["2343","4747","9699","2134","1241"
               ,"1111","0101","3435","5464","0909"];
var fill = "0123456789"; 
soup.setFill(fill);
soup.setContent(data2);

```

La funcion **show#**  retorna un string con todas la pocisiones del tablero.
 
```javascript
var soup  = Soup.init(data,size);
var board = soup.show();
console.log(board);
```
>output:
```
[Y][O][T][K][L][M][C][M][O][N][G][K][O][H][V][A]
[H][R][Z][D][L][N][A][F][C][O][O][B][O][M][Y][B]
[Z][N][V][I][Y][T][A][Q][O][I][F][E][Y][U][C][E]
[K][X][O][U][K][V][V][Y][Z][T][L][U][L][T][I][J]
[Q][B][V][A][I][X][W][F][I][Y][A][A][X][G][R][A]
[M][V][R][A][P][E][R][I][C][O][X][G][W][X][A][F]
[Z][N][E][R][G][P][E][R][R][O][D][O][X][W][R][E]
[I][O][U][E][O][L][I][R][D][O][C][O][C][I][B][S]
[V][T][C][T][C][W][D][T][R][L][O][B][G][G][E][S]
[Y][A][K][N][N][A][X][T][L][C][E][Z][W][U][Z][L]
[J][R][A][A][C][T][N][W][X][B][R][Z][H][A][M][L]
[N][K][F][P][Y][H][N][G][P][L][G][S][Q][L][M][J]
[D][E][L][F][I][N][Y][C][U][U][I][B][Y][A][O][Z]
[B][F][L][Q][E][P][B][W][Q][R][T][O][N][O][M][G]
[A][T][A][M][A][L][O][N][H][R][O][V][M][Q][S][Y]
[Q][P][B][H][Y][H][O][G][E][P][Q][U][G][S][V][V]
```

La funcion **setFill#**  establece un relleno para ocultar las palabras.
>:information_source: **Relleno**: por defecto el relleno es una cadena con todos los caracteres del abecedario 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' pero se puede utlizar cualquier cadena de caracteres acorde al contenido en el tablero.
```javascript
const data = ["2343","4747","9699","2134","1241"
               ,"1111","0101","3435","5464","0909"];
var soup  = Soup.init(data,size);
var fill = "0123456789"; 
soup.setFill(fill);
```

## Full Ejemplo
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button onclick="solve()">solve</button>
    <button onclick="generate()">generate</button>
    <button onclick="setSize()">size</button>
    <script src="./soup.bundle.js"></script>
    <script>
      const data = ["iguala","cuervo","perro","cocodrilo","delfin"
                    ,"leon","pantera","gato","perico","mono"
                    ,"raton","abeja","zebra","tigre","canguro"];

      var soup =  Soup.init(data,16);

      function generate() {
         soup.generate();
         console.log(s.show());
      }

      function solve() {
        console.log(soup.getSolution());
      }

      function setSize() {
        const data2 = ["iguala","cuervo","perro","cocodr","delfin"];
        soup.setContent(data2);
        soup.setSize(10);
      }

    </script>
</body>
</html>
```


