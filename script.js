document.addEventListener("DOMContentLoaded", function () {
    const ageForm = document.getElementById("ageForm");
    const listaEdades = document.getElementById("listaEdades");

    let contador = 1;

    ageForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const edad = parseInt(document.getElementById("edad").value);

        if (!isNaN(edad)) {
            // Crear una nueva fila en la tabla
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${contador}</td>
                <td>${edad}</td>
            `;
            listaEdades.appendChild(newRow);

            // Incrementar el contador
            contador++;

            // Limpiar el campo de entrada
            document.getElementById("edad").value = "";
        } else {
            alert("Ingrese una edad válida.");
        }
    });
});
