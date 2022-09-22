<template lang="html">
    <div class="ps-page--single">
        <img src="~/static/img/bg/about-us.jpg" alt="" />
        <Poncholas />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/OurTeam';
import Poncholas from '~/components/partials/page/Poncholas';

export default {
    layout: "layout-default",
    components: {
        Poncholas,
        OurTeam,
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/'
                },
                {
                    text: 'Nosotros'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
