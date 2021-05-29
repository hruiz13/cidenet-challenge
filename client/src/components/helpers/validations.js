//Funcion para validar tildes, ñ, numeros sin espacios
export function car(string) {
    const char = {
        "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
        "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
        "ñ": "N", "Ñ": "N", "_": "-", "-": "",
        0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '',
        8: '', 9: ''
    }
    const expr = /[0-9áéíóúÁÉÍÓÚÑñ_-]/g;
    if (string) {
        var rd = string.replace(expr, function (e) {
            return char[e]
        }).toUpperCase()
    }
    return (rd ? rd : string)
}

