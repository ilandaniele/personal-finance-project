<template>
    
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

import firebase from 'firebase/app';

export default {  
  data () {
    return {  
    }
  },
  created()
  {
    /* aca configuro los listener. por ejemplo
    
    this.$root.$on('alerta_positiva', (param) => this.alerta_positiva(param));
    
    si emiten alerta positiva, lo capturo y ejecuto el metodo this.alertapositiva(param) 
    y asi con todo lo que querramos definir...
    */
    console.log("se configuran los listener");
    this.$root.$on('alerta_positiva', (param) => this.alerta_positiva_default(param));
    this.$root.$on('alerta_positiva_nube', (param) => this.alerta_positiva_nube(param));
    this.$root.$on('alerta_negativa', (param) => this.alerta_negativa_default(param));
    this.$root.$on('alerta_negativa_error', (param) => this.alerta_negativa_error(param));
  },
  methods:
  {
    alerta_positiva_default(msg)
    {
      this.$q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'done',
                        message: msg
                      })
    },
    alerta_positiva_nube(msg)
    {
      this.$q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: msg
                      })
    },
    alerta_negativa_default(msg)
    {
        this.$q.notify({
                        color: 'red-4',
                        textColor: 'white',
                        icon: 'warning',
                        message: msg
                      })
    },
    alerta_negativa_error(msg)
    {
        this.$q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'error',
                        message: msg
                      })
    },
  }
}

function alert(msg)
{
  alert(msg);
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


