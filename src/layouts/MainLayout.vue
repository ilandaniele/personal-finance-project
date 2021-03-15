<template>
  <div class="q-pa-xs ">
    <q-layout c view="lHh Lpr lff" class="shadow-2 rounded-borders " >
      <q-header elevated class="primary">
        <q-toolbar>
          <q-toolbar-title>Inicio</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="180"
        :breakpoint="500"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <!--q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>

              <q-item-section>
                Nuevo movimiento
              </q-item-section>
            </q-item-->

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Movimientos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                Configuración
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Ayuda
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>

              <q-item-section>
                Acerca de
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                Salir
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold" >Matias Rios</div>
            <div>@matiasrios</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <!--q-page padding class="q-mt-xl window-width row justify-center ">
          <q-page >
              <div class="text-h2 text-weight-thin " style="opacity:.9">
                Saldo:  ${{saldo}}
              </div>
          </q-page>

          <q-page >
              <div class="text-h2 " >
                {{saldo}}
              </div>
          </q-page>              
        </q-page>
        <q-page padding class="q-pa-xl">
            <template>
            <div class="q-pa-md">
              <q-table
                title="Treats"
                :data="data"
                :columns="columns"
                row-key="name"
              />
            </div>
          </template>
        </q-page-->
        <keep-alive>

      <router-view />
        </keep-alive>
        
        
          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn @click="enviar_iniciar_nuevo_movimiento" fab icon="add" color="primary" />
          </q-page-sticky>
          
      </q-page-container>
      
    </q-layout>
    
  </div>
  
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      
      saldo: 777.7,
      nombre_user: "Matias Rios",
      drawer: false
    }
  },
  created()
  {
  },
  methods:
  {
    
    enviar_iniciar_nuevo_movimiento()
    {
      console.log("envio movimiento");
      this.$root.$emit('iniciar_nuevo_movimiento');
    }
  }
}


</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
