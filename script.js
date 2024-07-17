document.addEventListener("DOMContentLoaded", () => {
    const campoTexto = document.querySelector("#texto-ingresado");
    const campoRespuesta = document.querySelector("#Mensaje-resultado");
    const copiar = document.querySelector("#copiar");
    const sugerencia = document.querySelector("#Mensaje-sugerencia");

    const matriz_code = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"],
    ];

    const desplazamiento = 3;  // Cantidad de caracteres a desplazar en el cifrado César

    function cifradoCesar(texto, desplazamiento) {
        return texto.split('').map(char => {
            let codigo = char.charCodeAt(0);
            if (codigo >= 97 && codigo <= 122) { // Si es una letra minúscula
                codigo = ((codigo - 97 + desplazamiento) % 26) + 97;
            }
            return String.fromCharCode(codigo);
        }).join('');
    }

    function validarTexto(textoRevisado) {
        const regex = /^[a-z\s]*$/; 
        return regex.test(textoRevisado);
    }

    function mostrarError(mensaje) {
        alert(mensaje);
    }

    function transformarTexto(texto, matriz, tipo) {
        if (tipo === 'encriptar') {
            texto = cifradoCesar(texto, desplazamiento);  // Aplicar primero cifrado César
            matriz.forEach(([original, encriptado]) => {
                texto = texto.split(original).join(encriptado);
            });
        } else {
            matriz.slice().reverse().forEach(([original, encriptado]) => {
                texto = texto.split(encriptado).join(original);
            });
            texto = cifradoCesar(texto, -desplazamiento);  // Deshacer el cifrado César
        }
        return texto;
    }

    function encriptar(texto) {
        return transformarTexto(texto, matriz_code, 'encriptar');
    }

    function desencriptar(texto) {
        return transformarTexto(texto, matriz_code, 'desencriptar');
    }

    function buttonEncriptar() {
        if (validarTexto(campoTexto.value)) {
            const texto = encriptar(campoTexto.value);
            campoRespuesta.innerText = texto;
            copiar.style.display = "block";
            sugerencia.style.display = "none";
        } else {
            mostrarError("No se permiten caracteres especiales, solo letras minúsculas y espacios");
        }
    }

    function buttonDesencriptar() {
        if (validarTexto(campoTexto.value)) {
            const texto = desencriptar(campoTexto.value);
            campoRespuesta.innerText = texto;
            copiar.style.display = "block";
            sugerencia.style.display = "none";
        } else {
            mostrarError("No se permiten caracteres especiales, solo letras minúsculas y espacios");
        }
    }

    function copiarTexto() {
        const texto = campoRespuesta.innerText;
        navigator.clipboard.writeText(texto).then(() => {
            alert("Texto copiado al portapapeles");
        }).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    }

    document.querySelector("#boton-encriptar").addEventListener("click", buttonEncriptar);
    document.querySelector("#boton-desencriptar").addEventListener("click", buttonDesencriptar);
    copiar.addEventListener("click", copiarTexto);
});
