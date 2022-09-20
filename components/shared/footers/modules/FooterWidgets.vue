<template lang="html">
  <div class="ps-footer__widgets">
    <aside class="widget widget_footer widget_contact-us">
      <div class="widget_content">
        <h3>{{ $t("footer.widgetHeading.contactUs") }}</h3>

        <ul class="ps-list--social">
          <li>
            <a
              class="general"
              href="https://www.instagram.com/ponchola_parkas/"
            >
              <i class="fab fa-instagram"></i>
            </a>
            @ponchola_parkas
          </li>
          <li>
            <a class="general" href="#">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            +58-412-2372519
          </li>
          <li>
            <a class="general" href="#">
              <i
                class="far fa-envelope
                        </a>"
              ></i>
            </a>
            poncholas@poncholaparkas.com
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "FooterWidgets",
};
</script>

<style lang="scss" scoped></style>
