<template>
  <q-page padding class="flex flex-center">
    <div class="column window-width row justify-center fit">
      <div class="q-mb-xl q-mt-xl text-h2 text-weight-thin col-1 text-center " >
            Saldo:  ${{saldo}}
      </div>
       <div>
        Battery status is: <strong>{{ batteryStatus }}</strong>
      </div>

      <div class="q-pa-md col-2 full-width">
        <q-table
          grid
          title="Últimos movimientos"
          :data="my_data"
          :columns="my_columns"
          row-key="name"
          hide-header
        >

          <!-- ¿Que hace éste código? Por más que lo saque no veo cambio-->
          <!-- Según la documentación de quasar, el v-slot:body-cell-id se utiliza para
          modificar el contenido de la columna id, pero no hay ninguna. De hecho cuando le cambio
          el nombre o el v-slot no hace nada tampoco
          Creo que se debe a que las columnas son otra cosa, y se está cargando todo como una única columna
          aparte de las declaradas. Además de que el procesamiento para separar en filas se hace de manera manual
          en el template de más abajo-->
          <template v-slot:body-cell-id="props">
            <q-td :props="props">
              <div>
                <q-btn
                  round
                  icon="edit"
                  size="xs"
                  color="primary"
                  @click="edit(props)"
                ></q-btn>
              </div>  
            </q-td>
          </template>


          <!-- Entiendo que este maneja adentro de cada card con total libertad
          Se va separando de forma manual en las filas correspondientes-->
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card>
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'id')" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="row justify-end">
                  <!-- No me queda bien cuando la pantalla es muy chica, se establecieron cambios de columnas para cada 
                  breakpoint desde md hacia abajo. Cuando llega a xs y se hace cada vez más chico, empieza a salirse por el costado
                  debido a que el tamaño de cada columna es cada vez más chico. Hay dos soluciones: Asumir que nunca va a ser más chico
                  que determinado tamaño (Probar con la opción Galaxy S9 de Firefox. Desconozco si hay otras pantallas predefinidas en chrome) -->
                  <div class="col-xs-3 col-sm-2 col-md-2 text-center " style="padding-bottom:10px">
                    <q-btn
                      round
                      icon="add"
                      size="md"
                      color="primary"
                      @click="edit(props)"
                    ></q-btn>
                  </div>
                  
                </div>  
              </q-card>
            </div>
            
          </template>
          
        </q-table>

            <q-table
              grid
              title="Users"
              :data="my_data"
              :columns="my_columns"
              row-key="name"
            >
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
                  <q-card>
                    <q-list dense>
                      <q-item v-for="col in props.cols" :key="col.name">
                        <div class="q-table__grid-item-row">
                          <div class="q-table__grid-item-title">{{ col.label }}</div>
                          <div class="q-table__grid-item-value">{{ col.value }}</div>
                        </div>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>

          <q-table
          title="Simple"
          :data="my_data"
          :columns="my_columns"
          row-key="name"
          dense
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" @click="edit(props)" icon="edit"></q-btn>
            </q-td>          
          </template>
        </q-table>

        <q-table
      title="Treats"
      :data="my_data"
      :columns="my_columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
    >
       <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="delete_forever"
          no-caps
          @click="edit"
        />
      </template>
       <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
          color="negative"
          icon-right="delete"
          no-caps
          flat
          dense
          @click="edit(props)"
        />
        </q-td>
      </template>
    </q-table>
      </div>
    </div>
    

    <div v-show="mostrar_nuevo_movimiento" class="q-pa-md q-gutter-md">      
      <q-dialog  v-model="mostrar_nuevo_movimiento" transition-show="rotate" transition-hide="rotate">
        <q-card>
          <q-card-section>
            <div class="text-h6">Agregar movimiento</div>
          </q-card-section>
          

           <div class="q-pa-md" style="width: 400px;max-width: 600px">

        <q-form
          @submit="submit_nuevo_movimiento"
          @reset="reset_movimiento"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="nombre_movimiento"
            label="Nombre"
            hint="Nombre del nuevo movimiento"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, ingresa un nombre válido']"
          />

          <q-input
            filled
            type="textarea"
            v-model="descripcion_movimiento"
            label="Descripción"
            hint="Descripción del nuevo movimiento"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, ingresa una descripción válido']"
          />

          
          

          <q-select square outlined v-model="categoria_movimiento" 
          :options="categorias_movimiento" 
             label="¿A qué categoría corresponde?"  />

         
          

          <q-checkbox dense v-model="pago_en_cuotas" label="¿Es un pago en cuotas?" color="teal" /> 


          <q-select v-show="pago_en_cuotas" square outlined v-model="cantidad_cuotas" 
          :options="cantidad_de_cuotas" 
             label="Cantidad de cuotas nuevo movimiento"  />

          <q-input
            filled
            v-model="monto_movimiento"
            label="Monto"
            hint="Monto total del nuevo movimiento"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, ingresa un monto válido']"
          />

          <q-input v-model="fecha_movimiento" filled type="date" hint="Fecha movimiento. Por defecto, el día de hoy" 
          :rules="[
            val => val !== null && val !== '' || 'Por favor, ingresa una fecha'
          ]"/>

          
          <q-toggle v-model="accept" label="He revisado los datos ingresados" />

          <div>
            <q-btn label="Agregar" type="subONmit" color="primary"/>
            <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

      </div>
        </q-card>
      </q-dialog>
      
    </div>

    
  </q-page>
</template>

<script>


import ModuloFuncionesVue from 'src/components/ModuloFunciones.vue';

import Vue from 'vue'; // es6 syntax

document.addEventListener('deviceready', () => {
  // it's only now that we are sure
  // the event has triggered
}, false)

export default { 
  data()
  {
    return{
      batteryStatus: 'determining...',
      selected: [],
      funciones: null,
      props: null,
      data_get: null,
      options_fetch: [],
      api_call: null,
      url_base: "https://geome7ric.matiasjrb.com.ar/php/v1/Api.php?apicall=",
      cantidad_de_cuotas: [3,6,9,12,15,18],
      accept:false,
      fecha_movimiento: this.hoy(),
      mostrar_nuevo_movimiento: false,
      nombre_movimiento: null,
      categorias_movimiento: [],
      categoria_movimiento: null,
      monto_movimiento:null,
      pago_en_cuotas: false,
      cantidad_cuotas: null,
      descripcion_movimiento:null,
      saldo: 777.0,
      filter: '',
      name: 'PageIndex',
      my_columns: [
            {
              name: 'desc',
              required: true,
              label: 'Nombre',
              align: 'left',
              field: row => row.nombre,
              format: val => `${val}`,
              sortable: true
            },
            { name: 'calories', align: 'center', label: 'Monto total', field: 'monto', sortable: true },
            { name: 'fat', label: 'Descripción', field: 'descripcion', sortable: true },
            { name: 'fat2', label: 'Categoría', field: 'categoria', sortable: true },
            { name: 'carbs', label: 'Fecha de creación', field: 'fecha_creacion' },
            { name: 'actions', label: 'Actions', field: '', align:'center' }
          ],
      my_data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65
        }
      ]
    }
  },  
  created()
  {
    window.addEventListener('batterystatus', this.updateBatteryStatus, false)
    this.funciones= new Vue(ModuloFuncionesVue);
    this.funciones.mostrar_cargando("Un segundo..");
    this.funciones.alerta_positiva_home("Bienvenido");
    this.categorias_movimiento= ["Categoria prueba"];
    this.obtener_movimientos();
    //alert("wtf");
    this.$root.$on('iniciar_nuevo_movimiento', () => this.iniciar_nuevo_movimiento());
  },
  beforeDestroy () {
    // we do some cleanup;
    // we need to remove the event listener
    window.removeEventListener('batterystatus', this.updateBatteryStatus, false)
  },
  mounted()
  {    
    this.funciones.ocultar_cargando();  
  },
  methods: {
    updateBatteryStatus (status) {
      this.batteryStatus = `Level: ${status.level}, plugged: ${status.isPlugged}`
    },
    edit(props)
    {
      console.log(props.cols.descripcion);
    },
    async insertar(apicall)
    {

      var res= await fetch(this.url_base+apicall,this.options_fetch).then(function (response) {
                                if (response.ok) {
                                  //var res=response.json();
                                  console.log(response);
                                  console.log("retorno 1");
                                  return 1;
                                  return response;
                                }
                                return Promise.reject(response);
                              }).then(function (data) {
                                return 2;
                                console.log(data);
                              }).catch(function (error) {
                                //this.alerta_negativa('Inténtalo de nuevo más tarde');  
                                return 3;                             
                                console.warn('Something went wrong.', error);
                              });  

    },
    async get(apicall,arreglo)
    {
      console.log("wtf1");
      await fetch(this.url_base+apicall)
        .then(res=> res.json())
        .then(data=> 
        {
          console.log(data);
          this.my_data=data[arreglo];
          console.log(this.my_data[arreglo]);
          console.log(this.my_data);
          return data;
        });
    },
    async obtener_movimientos()
    {
      var data_res=await  this.get("getmov","movimientos");
      //this.my_data=this.data_res;
      console.log(this.my_data);
    },    
    mostrar_cargando (msg) {
      this.$q.loading.show({
        message: msg
      })      
    },
    ocultar_cargando()
    {
      this.$q.loading.hide();
    },
    hoy()
    {
      var hoy = new Date();
      var dd = String(hoy.getDate()).padStart(2, '0');
      var MM = String(hoy.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = hoy.getFullYear();      
      hoy = yyyy + '-' + MM + '-' + dd;
      return hoy;
    },
    verificar_datos_nuevo_movimiento()
    {
      return true;
    },
    async submit_nuevo_movimiento()
    {
      if (this.verificar_datos_nuevo_movimiento())
      {
        //modifico las options
        this.mostrar_cargando("Agregando..");
        var fd = new FormData();
        fd.append('nombre', this.nombre_movimiento); 
        fd.append('descripcion', this.descripcion_movimiento); 
        fd.append('user', "matiasjriosb@gmail.com");        
        fd.append('categoria',this.categoria_movimiento);
        var es_pago_en_cuotas="false";
        if (this.pago_en_cuotas)
          es_pago_en_cuotas="true";
        fd.append('es_pago_cuotas', es_pago_en_cuotas); 
        fd.append('fecha_creacion', this.fecha_movimiento); 
        if (this.pago_en_cuotas)
        {
          var monto_total= parseFloat(this.monto_movimiento);
          var cant_cuotas=this.cantidad_cuotas;          
          var monto_de_cuota= (monto_total/cant_cuotas).toString();
          fd.append('monto', this.monto_movimiento);
          fd.append('monto_cuota',monto_de_cuota);
          fd.append('cantidad_cuotas',this.cantidad_cuotas.toString());
          fd.append('cantidad_cuotas_pagas',"0");
        }
        else
        {
          fd.append('monto', this.monto_movimiento);
          fd.append('monto_cuota',"-1");
          fd.append('cantidad_cuotas',"-1");
          fd.append('cantidad_cuotas_pagas',"-1");
        }

        console.log(this.nombre_movimiento);
        console.log(this.descripcion_movimiento);
        console.log(this.monto_movimiento);
        console.log(this.categoria_movimiento);
        console.log(this.pago_en_cuotas.toString());
        console.log(this.cantidad_cuotas);


        
        this.options_fetch =
        {
          method: 'POST',
          body: fd
        };
        var res=await this.insertar(/*apical */"insertarmov");  
        this.popup_message("Movimiento agregado correctamente","green","done","white");
        this.reset_movimiento();
        this.ocultar_cargando();     
        
      }

    },
    reset_movimiento()
    {
      /*
      accept:false,
      fecha_movimiento: this.hoy()*/
      this.mostrar_nuevo_movimiento=false;/*
      nombre_movimiento: null,
      categorias_movimiento: [],
      categoria_movimiento: null,
      monto_movimiento:null,
      pago_en_cuotas: false,
      cantidad_cuotas: null,
      descripcion_movimiento:null,*/

    },
    popup_message(msg,color_msg,icon_msg,texto_color)
    {
      //alert("wtf2");
      this.$q.notify({
              color: color_msg,
              textColor: texto_color,
              icon: icon_msg,
              message: msg
            });
    },
    iniciar_nuevo_movimiento()
    {
      this.mostrar_nuevo_movimiento=true;
    }
  }  
}
</script>

