const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para calcular el descuento basado en el monto total de compras
function calcularDescuento(totalCompras) {
  if (totalCompras > 100) {
    return 0.1; // 10% de descuento
  } else {
    return 0; // Sin descuento
  }
}

// Función para calcular el monto total a pagar en cuotas
function calcularCuotas(monto, cuotas, tasaInteres) {
  let montoTotal = monto * (1 + tasaInteres);
  return montoTotal / cuotas;
}

// Función principal que maneja la interacción con el usuario
function ejecutarPrograma() {
  rl.question('Ingrese el monto total de compras: ', (totalCompras) => {
    const descuento = calcularDescuento(parseFloat(totalCompras));

    if (descuento > 0) {
      console.log(`¡Felicidades! Usted tiene un descuento del ${descuento * 100}%.`);
    } else {
      console.log('No tiene descuento en este momento.');
    }

    rl.question('¿Desea pagar el total o en cuotas? (total/cuotas): ', (opcion) => {
      if (opcion.toLowerCase() === 'total') {
        console.log(`El monto total a pagar es: $${totalCompras - (totalCompras * descuento)}`);
        preguntarContinuar();
      } else if (opcion.toLowerCase() === 'cuotas') {
        rl.question('Ingrese la cantidad de cuotas (de 2 a 12): ', (cuotas) => {
          cuotas = parseInt(cuotas);
          if (cuotas >= 2 && cuotas <= 12) {
            const valorCuota = calcularCuotas(totalCompras - (totalCompras * descuento), cuotas, 0);
            console.log(`El valor de cada cuota es: $${valorCuota.toFixed(2)}`);
            preguntarContinuar();
          } else {
            console.log('La cantidad de cuotas debe estar entre 2 y 12.');
            preguntarContinuar();
          }
        });
      } else {
        console.log('Opción no válida. El programa se cerrará.');
        rl.close();
      }
    });
  });
}

// Función para preguntar al usuario si desea realizar otra operación
function preguntarContinuar() {
  rl.question('¿Desea realizar otra operación? (si/no): ', (respuesta) => {
    if (respuesta.toLowerCase() === 'si') {
      // Continuar el bucle
      ejecutarPrograma();
    } else {
      // Cerrar la interfaz de lectura
      rl.close();
    }
  });
}

// Iniciar el programa llamando a la función principal
ejecutarPrograma();
