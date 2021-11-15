//Son funciones de JavaScript y se comunican con la API de Gulp para
//realizar ciertas acciones.


// 1. Utilizamos las dependencias de desarrollo instaladas en el package.json:
//(Va a node_modules y extrae la informacion y se guarda en la variable).
//Esto es sintaxis de node.js
const {src, dest, watch, parallel} = require('gulp');//con la API de gulp se puede retornar multiples funciones
const sass = require('gulp-sass')(require('sass'));//copn gulp-sass solo podemos retornar una funcion.
const plumber =require('gulp-plumber');

const autoprefixer = require('autoprefixer');//Permite que se ejecute en cualquier navegador
const cssnano = require('cssnano');//Comprime nuestro codigo de css
const postcss = require('gulp-postcss');//Hace transformaciones

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');//Se agrega funcion para convertir imgs a webp
const avif = require('gulp-avif');

//2. Definicion de tareas:
function css(done) {
    //1. Se debe identificar el archivo .scss a compilar (Se usa la funcion 'src' de gulp)
    src('src/scss/**/*.scss')//Le pasamos la ubicacion.
    
        .pipe(plumber())

    //2. Se debe compilarlo (Aqui usamos la siguiente funcion 'sass' de gulp)
        .pipe(sass()) 

        .pipe(postcss([autoprefixer(), cssnano()]))

    //3. Se debe Almacenarlo en el disco duro. (Se usa la funcion dest de gulp para almacenar)
        .pipe(dest('build/css'))

        //Los pipe sirven para definir la siguiente accion.


    done();//para que la tarea finalize.
}

//Funcion para conversion de iamgenes a webp
function versionWebp(done) {

    const opciones ={
        quality: 50
    };

    //Entra de forma recursiva a dicha carpeta y busca los archivos con formatos .png y .jpg
    src('src/img/**/*.{png,jpg}') //Aqui identificamos las imagenes
    .pipe(webp(opciones))
    .pipe(dest('build/img')) //Se detalla el lugar en donde se almacenaran


    done();
}

//Funcion para conversion de iamgenes a webp
function versionAvif(done) {

    const opciones ={
        quality: 50
    };

    //Entra de forma recursiva a dicha carpeta y busca los archivos con formatos .png y .jpg
    src('src/img/**/*.{png,jpg}') //Aqui identificamos las imagenes
    .pipe(avif(opciones))
    .pipe(dest('build/img')) //Se detalla el lugar en donde se almacenaran


    done();
}

//Funcion para aligerar imagenes
function imagenes(done) {

    const opciones = {
        optimizationLevel: 3
    };
    
    src('src/img/**/*.{png,jpg}') //Aqui identificamos las imagenes
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))

    done();
}

function javascript(done) {
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}

//Creacion de funcion watch para que lea y guarde los cambios automaticamente
function dev(done) {

    //La funcion watch toma dos parametros, el primer es el archivo al que voy a escuchar o sea, 
    //al que voy hacer cambios. Y cuando suceda cambios en dicho archivo, llamo a la funcion
    //previamente creada 'css'.
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

//3. Se hace disponibles las tareas para su ejecucion:
exports.css = css;
exports.js = javascript;

exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);//Con parallel esta tarea ejecuta varias en una sola.