<template>
    <md-dialog
            :md-active.sync="open"
    >
        <div class="body">
            <vue-slide-bar v-model="translationX"></vue-slide-bar>
            <vue-slide-bar v-model="translationY"></vue-slide-bar>
            <vue-slide-bar v-model="translationZ"></vue-slide-bar>
            <md-dialog-actions>
                <md-button class="md-primary" v-on:click="onCancel">
                    Annuler
                </md-button>
                <md-button class="md-primary" v-on:click="onConfirm">
                    Valider
                </md-button>
            </md-dialog-actions>
        </div>
    </md-dialog>
</template>

<script>
  import VueSlideBar from 'vue-slide-bar'
  import { AssemblyManagerService } from "spinal-service-assembly-manager";


  export default {
    name: "MoveModel",
    components: {
      VueSlideBar
    },
    data: function () {
      return {
        model: {},
        open: false,
        translationX: 0,
        translationY: 0,
        translationZ: 0,
      }
    },
    methods: {
      opened: function ( option ) {
        this.open = true;
        this.model = option;
        console.log( 'asdasdsa', option, this.open );
      },
      closed: function ( option ) {
        console.log( option );
      },
      onCancel: function () {
        this.open = false;

      },
      onConfirm: function () {
        console.log(this.model)
        //TODO increase number
        this.model.translate = {
          x: this.translationX,
          y: this.translationY,
          z: this.translationZ
        };
        this.model.rotate = { x: 0, y: 0, z: 0 };
        this.model.scale = 1;
        const assemblyManager = new AssemblyManagerService();
        assemblyManager.getModel(this.model.id.get())
        const transform = {
          translate: {
            x: this.translationX,
            y: this.translationY,
            z: this.translationZ
          },
          rotate: { x: 0, y: 0, z: 0 },
          scale: 1
        };
        window.spinal.ForgeViewer.transformModel( this.model , true)
        this.open = false;

      }
    }

  }
</script>

<style scoped>
    .body {
        margin: 10px;
    }
</style>