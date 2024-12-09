// Selección del formulario y sus campos
const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#email"); // Corregido
const mensaje = document.querySelector("#mensaje");

// Función para validar el formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir el envío por defecto
  console.log("El evento submit está funcionando."); // Depuración

  // Verificar que los campos no estén vacíos
  if (
    nombre.value.trim() === "" ||
    correo.value.trim() === "" ||
    mensaje.value.trim() === ""
  ) {
    alert("Por favor, completa todos los campos.");
    console.log("Alerta: faltan campos por completar."); // Depuración en la consola
    return;
  }

  // Validar formato de correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correo electrónico
  if (!correoRegex.test(correo.value)) {
    alert("Por favor, ingresa un correo válido.");
    console.log("Alerta: el correo no es válido.");
    return;
  }

  alert("¡Formulario enviado con éxito!");
  console.log("Formulario enviado correctamente.");
  formulario.reset(); // Limpiar el formulario
});

// Resalta los productos al pasar el mouse
const tarjetas = document.querySelectorAll(".tarjeta");
tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener("mouseenter", () => {
    tarjeta.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    tarjeta.style.transform = "scale(1.05)";
  });

  tarjeta.addEventListener("mouseleave", () => {
    tarjeta.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    tarjeta.style.transform = "scale(1)";
  });
});

// Obtener tasa de cambio y actualizar precios y función para actualizar precios

async function actualizarPrecios() {
  try {
    // Consumir API de tasas de cambio
    const respuesta = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const datos = await respuesta.json();

    // Tasa de cambio de dólar a pesos argentinos
    const tasaCambio = datos.rates.ARS;
    console.log("Tasa de cambio obtenida:", tasaCambio); // Depuración

    // Actualizar precios en las tarjetas
    const preciosUSD = document.querySelectorAll(".precio-usd");
    const preciosARS = document.querySelectorAll(".precio-ars");

    preciosUSD.forEach((precioUSD, index) => {
      const valorUSD = parseFloat(precioUSD.dataset.usd); // esto lee precio en USD del atributo data-usd
      const valorARS = (valorUSD * tasaCambio).toFixed(2); // Convertir a pesos argentinos

      // Actualizar el contenido con las divisas
      precioUSD.textContent = `$${valorUSD.toFixed(2)} USD`;
      preciosARS[index].textContent = `$${valorARS} ARS`;
    });
  } catch (error) {
    console.error("Error al obtener la tasa de cambio:", error);
  }
}

// Llamar a la función al cargar la página
actualizarPrecios();
