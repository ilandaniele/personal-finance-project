<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    <div class="q-pa-md">
              <q-table
                title="Treats"
                :data="data"
                :columns="columns"
                row-key="name"
              />
            </div>
  </q-page>
  

  
</template>

<script>
export default {
  data:[],
  columns: [],
  name: 'PageIndex'
}
</script>
