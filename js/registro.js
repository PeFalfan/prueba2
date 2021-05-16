fn_ocultarErrores();

/*
** Funcion para despejar los errores en los campos por default
*/
function fn_ocultarErrores() {

    $('#lbl_rut_no_ingresado').hide();
    $('#lbl_rut_invalido').hide();
    $('#lbl_nombre').hide();
    $('#lbl_ape_pat').hide();
    $('#lbl_ape_mat').hide();
    $('#lbl_correo').hide();
    $('#lbl_tipo_cuenta').hide();
    $('#lbl_error_servicio').hide();
    $('#lbl_error_largo_rut').hide();

}

/*
** Funcion para limpiar el formulario
** Regresa todos los campos a su valor por defecto
** y se retiran etiquetas de error
*/
function fn_limpiarFormulario() {

    fn_ocultarErrores();

    $('#txt_rut').removeClass('is-invalid');
    $('#txt_rut').removeClass('is-valid');

    $('#txt_nombre').removeClass('is-invalid');
    $('#txt_nombre').removeClass('is-valid');

    $('#txt_ape_pat').removeClass('is-invalid');
    $('#txt_ape_pat').removeClass('is-valid');

    $('#txt_ape_mat').removeClass('is-invalid');
    $('#txt_ape_mat').removeClass('is-valid');

    $('#txt_correo').removeClass('is-invalid');
    $('#txt_correo').removeClass('is-valid');

    $('#cmb_tipo_cuenta').removeClass('is-invalid');
    $('#cmb_tipo_cuenta').removeClass('is-valid');

    $('#lbl_error_servicio').removeClass('is-invalid');
    $('#lbl_error_servicio').removeClass('is-valid');

    $('#lbl_error_largo_rut').removeClass('is-invalid');
    $('#lbl_error_largo_rut').removeClass('is-valid');

}

/* Bloque de Validaciones :
** Para estas primeras validaciones, solo se considera como **malo**
** el campo que se encuentre vacío, o esté conformado solo por un espacio
** a excepcion del rut, que se validará con una api externa
** https://docs.libreapi.cl/es/
*/
function fn_validaCamposVacios() {

    var rut = $('#txt_rut').val();
    var nombre = $('#txt_nombre').val();
    var apePat = $('#txt_ape_pat').val();
    var apeMat = $('#txt_ape_mat').val();
    var correo = $('#txt_correo').val();
    

    $('#lbl_error_servicio').removeClass('is-invalid');
    $('#lbl_error_servicio').removeClass('is-valid');

    //RUT
    if (rut.length === 0 || rut === " ") {
        $('#lbl_rut_no_ingresado').show();
        $('#txt_rut').addClass('is-invalid');
        $('#lbl_error_servicio').hide();

    } else if(rut.length < 8){

        $('#lbl_rut_no_ingresado').hide();
        $('#lbl_error_largo_rut').show();
        $('#txt_rut').addClass('is-invalid');

    }else {

        $('#lbl_error_largo_rut').hide();
        $('#lbl_error_servicio').hide();
        $('#lbl_rut_no_ingresado').hide();

        var consulta = "?rut=" + rut;

        $.getJSON('https://api.libreapi.cl/rut/validate' + consulta, function (data) {

            var response = data;


            if (response.data.valid) {

                $('#lbl_rut').hide();
                $('#txt_rut').removeClass('is-invalid');
                $('#txt_rut').addClass('is-valid');

            } else {

                $('#lbl_rut_no_ingresado').hide();
                $('#lbl_rut').show();
                $('#txt_rut').addClass('is-invalid');

            }

        }).fail(function(){
            $('#lbl_rut_no_ingresado').hide();
            $('#lbl_error_servicio').show();
            $('#txt_rut').addClass('is-invalid');
        });

    }

    //NOMBRE
    if (nombre.length === 0 || nombre === " ") {
        $('#lbl_nombre').show();
        $('#txt_nombre').addClass('is-invalid');
    } else {
        $('#lbl_nombre').hide();
        $('#txt_nombre').removeClass('is-invalid');
        $('#txt_nombre').addClass('is-valid');
    }

    //APELLIDO PATERNO
    if (apePat.length === 0 || apePat === " ") {
        $('#lbl_ape_pat').show();
        $('#txt_ape_pat').addClass('is-invalid');
    } else {
        $('#lbl_ape_pat').hide();
        $('#txt_ape_pat').removeClass('is-invalid');
        $('#txt_ape_pat').addClass('is-valid');
    }
    //APELLIDO MATERNO
    if (apeMat.length === 0 || apeMat === " ") {
        $('#lbl_ape_mat').show();
        $('#txt_ape_mat').addClass('is-invalid');
    } else {
        $('#lbl_ape_mat').hide();
        $('#txt_ape_mat').removeClass('is-invalid');
        $('#txt_ape_mat').addClass('is-valid');
    }
    //CORREO
    if (correo.length === 0 || correo === " ") {
        $('#lbl_correo').show();
        $('#txt_correo').addClass('is-invalid');
    } else {
        $('#lbl_correo').hide();
        $('#txt_correo').removeClass('is-invalid');
        $('#txt_correo').addClass('is-valid');
    }

    //TIPO DE CUENTA
    
}
