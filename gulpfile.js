//Son funciones de JavaScript y se comunican con la API de Gulp para
//realizar ciertas acciones.


//utilizamos las dependencias de desarrollo instaladas en el package.json:
//(Va a node_modules y extrae la informacion y se guarda en la variable).
//Esto es sintaxis de node.js
const {src, dest} = require('gulp');//con la API de gulp se puede retornar multiples funciones
const sass = require('gulp-sass')(require('sass'));//copn gulp-sass solo podemos retornar una funcion.

//Definicion de tareas:
function css(done) {
    //1. Se debe identificar el archivo .scss a compilar (Se usa la funcion 'src' de gulp)
    src('src/scss/app.scss')//Le pasamos la ubicacion.
    //2. Se debe compilarlo (Aqui usamos la siguiente funcion 'sass' de gulp)
        .pipe(sass()) 
    //3. Se debe Almacenarlo en el disco duro. (Se usa la funcion dest de gulp para almacenar)
        .pipe(dest('build/css'))

        //Los pipe sirven para definir la siguiente accion.


    done();//para que la tarea finalize.
}

//Se hace disponibles las tareas para su ejecucion:
exports.css = css;