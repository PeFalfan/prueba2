fn_ocultarErrores();
fn_temperatura();
fn_indicadores();

/*
**Funcion de errores posibles
*/
function fn_ocultarErrores(){
    
    $('#lbl_dolar0').hide();
    $('#lbl_euro0').hide();
    $('#lbl_uf0').hide();

}

/*
** Funcion que actualiza la temperatura actual
** como punto de mejora se puede obtener la info de
** ingreso a esta pagina por el navegador, y dar una 
** localizacion mas exacta, por ahora se considera 
** la temperatura leída en Santiago, Quinta Normal
*/

function fn_temperatura(){

    $('#txt_temp').val("Cargando...");

    var respuesta = "Temperatura Actual: ";

    $.getJSON('https://api.libreapi.cl/weather/stations?code=330020', function(data){

        respuesta += data.data.temperature + '°';

        $('#txt_temp').val(respuesta);
    });

}

/*
**Metodo que recoge el indicador economico del DOLAR, EURO Y UF
** y las presenta en pantalla.
*/

function fn_indicadores(){

    $('#txt_indicadores').val("Cargando...");

    $.getJSON('https://api.libreapi.cl/economy/indicators', function(data){

        var dolar = data.data.dolar;
        var euro = data.data.euro;
        var uf = data.data.uf;

        $('#txt_indicadores').val("Dolar: $" + dolar + " - Euro: €" + euro + " - UF: $" + uf );

        if(dolar == 0){
            $('#lbl_dolar0').show();
        }else{
            $('#lbl_dolar0').hide();
        }

        if(euro == 0){
            $('#lbl_euro0').show();
        }else{
            $('#lbl_euro0').hide();
        }

        if(uf == 0){
            $('#lbl_uf0').show();
        }else{
            $('#lbl_uf0').hide();
        }


    }).fail(function(){
        $('#txt_indicadores').val("Indicador economico no responde como se esperaba");
    });

}