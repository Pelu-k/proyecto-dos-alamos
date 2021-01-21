$(function(){
    // Validar que los campos del login no esten vacios antes de llegar al servidor
    $('#getFormularioLogin').on('submit', (e) => {
        // Campos a validar
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if(email === ''){
            e.preventDefault();
            alert('El campo de correo no puede estar vacio');
        } else if(password === '') {
            e.preventDefault();
            alert('El campo de contraseña no puede estar vacio');
        } else {
            $.ajax({
                type: "POST",
                url: "/login"
            });
        }
    });

    // Validar los datos del formulario de registro antes de que llegen al servidor
    $('#getFormularioRegistro').on('submit', (e) => {
        // Campos a validar
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let run = document.getElementById('run').value;
        let address = document.getElementById('address').value;
        let phone = document.getElementById('phone').value;
        let birthday = document.getElementById('birthday').value;
        let password = document.getElementById('password').value;

        if (name === '' || email === '' || run === '' || password === ''
            || address === '' || phone === '' || birthday === '' ) {
            e.preventDefault();
            alert('Todos los campos son obligatorios');
        } else {
            $.ajax({
                type: "POST",
                url: "/register"
            });
        }
    });
})