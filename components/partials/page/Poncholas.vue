<template lang="html">
  <div class="ps-about-awards">
    <div class="container">
      <div class="ps-section__header">
        <h4>¿Qué es la Ponchola?</h4>
        <p>
          La Ponchola nace para brindar practicidad y protección antes y al
          terminar de entrenar y sea la vestimenta perfecta en las aventuras
          acuáticas o al aire libre en deportes como la natación, el Kitesurf,
          el surf, voleibol de playa, tenis de playa, pesca, paseos en lancha o
          simplemente para estar cómodo. Ideal para niños y adultos, facilitando
          el cambio de ropa después de las actividades deportivas donde
          usualmente se queda lleno de arena o mojado.
        </p>
      </div>
      <div class="ps-section__header">
        <h4>Atributos del producto:</h4>
        <p>
          Por su gran tamaño, Sirve de cambiador de ropa o traje de baño. Así
          pasar de mojado a seco en tan solo un cambio.
        </p>
        <p>
          Combinación de tejidos de alta tecnología que brindan protección y
          comodidad:
        </p>
        <ul class="ps-list--pricing">
          <li>
            Tejido externo: Water&Sun Repellent protege del sol y también de la
            lluvia.
          </li>
          <li>
            Tejido interno: Toalla de gran absorción y suavidad, de peso ligero,
            muy agradable el contacto con la piel, ayuda a recuperar el calor
            corporal después de una jornada deportiva.
          </li>
          <li>
            Gran guardamano con bolsillo para guardar tus artículos de valor
            (celular, lentes deportivos, lentes de natación, dinero, llaves de
            carro, etc).
          </li>
          <li>
            Gran capucha Para evitar la brisa, lluvia o quemaduras de sol.
          </li>
          <li>
            Su diseño que cubre los hombros para evitar quemaduras de sol,
            cóncavas sobre las rodillas para permitir moverte con facilidad y
            convexa en la parte posterior para que las piernas no toquen las
            superficies como gradas, asientos o arena al momento de sentarse.
          </li>
        </ul>
      </div>
      <div class="ps-section__header">
        <h4>Tipos de Poncholas</h4>

        <h3>Ponchola Super</h3>
        <p>
          De tela Water Repellent y paño ligero y de alta absorción por dentro,
          ¡es nuestro producto estrella!; te sentirás cómodo y calientito por
          dentro y protegido como por un paraguas por fuera. Con sus bolsillos
          para guardar tus artículos esenciales y su gran capucha para
          protegerte del sol y la brisa playera.
        </p>

        <h3>Ponchola de Microfibra</h3>
        <p>
          De toalla de microfibra de alta absorción y secado rápido, ligera /de
          peso y de poco volumen. La misma sensación de comodidad con una tela
          igualmente de calidad y bellos y brillantes colores, pero no repele el
          agua. Con sus bolsillos para guardar tus artículos esenciales y su
          gran capucha para protegerte del sol y la brisa playera.
        </p>

        <h3>Ponchola Light</h3>
        <p>
          De tela Water Repellent (sin paño por dentro), es nuestra versión
          light. Con los mismos beneficios de todos nuestros productos
          <b>sin estar forrada de Toalla de alta absorción por dentro.</b>
        </p>
      </div>
      <div class="ps-section__header">
        <h4>¿Cómo elegir la talla?</h4>
        <ul class="ps-list--pricing">
          <li>Recomendamos medir en cm, cintura y pecho y utilizar la medida de diámetro más ancha para seleccionar la talla en el siguiente cuadro. A La talla medida se le debe sumar de 15 a 20 cm y esa será la que ubique en el siguiente cuadro.</li>
          <li>El largo ideal delantero debe llegar a las rodillas o más abajo medido desde la base del cuello a la altura deseada.</li>
          <li>Largo posterior son 7 cm adicionales al largo delantero en tallas de adulto y 5 en tallas infantiles.</li>
<li>Tallas especiales se realizan bajo pedido.</li>
</ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutAwards",
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 1,

        breakpoints: {
          1366: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
