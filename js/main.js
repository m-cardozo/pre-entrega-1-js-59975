function calcularPrecioTotal(distancia, kilogramos, clienteFrecuente) {
  const cantidadViajes = calcularCantidadDeViajes(kilogramos);
  const precioPorKm = calcularPrecioPorKm(distancia);
  const precioBase = distancia * precioPorKm;

  let precioBaseFinal = precioBase;
  let precioTotalFinal = 0;

  for (let i = 1; i <= cantidadViajes; i++) {
    let precioViaje;
      
    if (i === 1) {
      precioViaje = precioBase;
    } else {
      precioViaje = precioBase * 0.9;
    }

    precioTotalFinal += precioViaje;

    precioBaseFinal = precioTotalFinal;
  }

  let precioDescuentoCliente = 0;

  if (clienteFrecuente) {
    precioDescuentoCliente = precioTotalFinal * 0.2;
    precioTotalFinal -= precioDescuentoCliente;
  }

  return {cantidadViajes, precioBaseFinal, precioDescuentoCliente, precioTotalFinal};
};


function calcularCantidadDeViajes(kilogramos) {
  let toneladas = kilogramos / 1000;
  const maximoToneladasPorViaje = 37;
  const cantidadViajes = Math.ceil(toneladas / maximoToneladasPorViaje);

  return cantidadViajes;
}


function calcularPrecioPorKm(distancia) {
  if (distancia < 15) {
      return 20;
  } else if (distancia < 30) {
      return 17;
  } else if (distancia < 60) {
      return 14;
  } else if (distancia < 100) {
      return 11;
  } else if (distancia < 140) {
      return 9;
  } else {
      return 7;
  }
}


function mostrarResultado() {
  event.preventDefault();

  const origen = document.getElementById('origen').value;
  const destino = document.getElementById('destino').value;
  const distancia = parseFloat(document.getElementById('distancia').value);
  const kilogramos = parseFloat(document.getElementById('kilogramos').value);
  const empresa = document.getElementById('empresa').value;
  const clienteFrecuente = document.getElementById('clienteFrecuente').checked;

  let resultadoHTML;
  const contenedorResultado = document.getElementById('resultado');

  if (!origen || !destino || isNaN(distancia) || isNaN(kilogramos) || !empresa) {
    resultadoHTML = `
      <p class="error">Se deben ingresar todos los datos para realizar la simulación</p>
    `;
  } else {
    let calculoPrecioTotal = calcularPrecioTotal(distancia, kilogramos, clienteFrecuente);
    
    resultadoHTML = `
      <p class="tit"><strong>Resultado</strong></p>
      <p><strong>Origen:</strong> ${origen}</p>
      <p><strong>Destino:</strong> ${destino}</p>
      <p><strong>Distancia:</strong> ${distancia} Km</p>
      <p><strong>Peso de la carga:</strong> ${kilogramos} Kg</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
    `;
    
    if (calculoPrecioTotal.cantidadViajes > 1) {
      resultadoHTML += `
        <p><strong>Cantidad de viajes:</strong> ${calculoPrecioTotal.cantidadViajes}</p>
      `;
    }

    if (clienteFrecuente) {
      resultadoHTML += `
        <p><strong>Precio base:</strong> USD ${calculoPrecioTotal.precioBaseFinal.toFixed(2)}</p>
        <p><strong>Descuento cliente (20%):</strong> USD ${calculoPrecioTotal.precioDescuentoCliente.toFixed(2)}</p>
        <p><strong>Precio total:</strong> USD ${calculoPrecioTotal.precioTotalFinal.toFixed(2)}</p>
      `;
    } else {
      resultadoHTML += `
        <p><strong>Precio total:</strong> USD ${calculoPrecioTotal.precioTotalFinal.toFixed(2)}</p>
      `;
    }
  }

  contenedorResultado.innerHTML = resultadoHTML;
}