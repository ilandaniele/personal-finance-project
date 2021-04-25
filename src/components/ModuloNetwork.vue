<template>
    
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

import Login from 'layouts/Login.vue'
import firebase from 'firebase/app';
import Vue from 'vue'; // es6 syntax
import ModuloFuncionesVue from './ModuloFunciones.vue';

export default {  
  data () {
    return {  
      login: null,
      funciones: null,
      formdata: [],
      options_fetch:null,
      url_base: "https://geome7ric.matiasjrb.com.ar/php/v1/Api.php?apicall=",
      cloudinary_name:"bull-metal",
      cloudinary_preset:"fxmzqstl",
      cloudinary_api_public_key:"792659161634783",
      cloudinary_upload_url: "https://api.cloudinary.com/v1_1/"+this.cloudinary_name+"/image/upload"
    }
  },
  created()
  {
    this.funciones= new Vue(ModuloFuncionesVue);
    this.funciones.alerta_positiva_default("desde network");
    /* aca configuro los listener. por ejemplo
    
    this.$root.$on('alerta_positiva', (param) => this.alerta_positiva(param));
    
    si emiten alerta positiva, lo capturo y ejecuto el metodo this.alertapositiva(param) 
    y asi con todo lo que querramos definir...
    */
    
    console.log("[Mod network]se configuran los listener");
    //this.$root.$on('solicitud_a', (param) => this.prueba_retorno(param));
  },
  methods:
  {
    /*
    la apical que le pedis y */
    async get(apicall,especificacion_arreglo)
    {
      const response = await fetch(this.url_base+apicall);

      const data = await response.json();
      /*falta verificar si hubo error */
      return data[especificacion_arreglo];
    },
    async post(apicall,form_data)
    {
      this.options_fetch =
      {
        method: 'POST',
        body: form_data
      };
      
      const response = await fetch(this.url_base+apicall,this.options_fetch);

      const data = await response;
      console.log("[ModuloNetwork]");
      console.log(data);
      return response;

      /*falta verificar si hubo error */
      
      //return data[especificacion_arreglo];
    },
    async cargar_imagen(imagen_file,image_name,folder_name)
    {
        /* settings*/
        this.cloudinary_name="bull-metal",
        this.cloudinary_preset="fxmzqstl",
        this.cloudinary_apu_public_key="792659161634783"
        this.formData= new FormData();
        this.formData.append("file",imagen_file);       
        this.formData.append("value",imagen_file);
        this.formData.append("api_key", this.cloudinary_api_public_key);
        this.formData.append("public_id",image_name);
        this.formData.append("resource_type", "image");
        this.formData.append("upload_preset", this.cloudinary_preset);
        this.formData.append("timestamp", new Date());
        this.formData.append("folder",folder_name);
          
        console.log(this.cloudinary_upload_url);
        let requestObj={
          url: this.cloudinary_upload_url,
          method: "POST",
          data: this.formData,
          onUploadProgress: function(progressEvent)
          {
            console.log("progress",progressEvent);
            this.progress= Math.round((progressEvent.loaded*100.0)/progressEvent.total);
            console.log(this.progress);
          }.bind(this)              
        };
        this.showProgress=true;
        const options =
        {
          method: "POST",
          body: this.formData
        };

        fetch(this.cloudinary_upload_url, {
          method: "POST",
          body: this.formData
        })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          console.log(data);
        });

    },
    async enviar_mail(mensaje,receptor,sujeto)
    {
      var fd = new FormData();
      fd.append('mensaje', mensaje); 
      fd.append('receptor', receptor); 
      fd.append('sujeto', sujeto);

      await this.post("mail_gw",fd); 
       
    },
    prueba_retorno(param)
    {
      return param;
    }
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


