<template>
    <div>
        <div v-for="info in infos" class="list-model">
            <div class="model-info">
                Name: {{info.name}}
                <img :src="info.thumbnail" :alt="info.name"/>
            </div>

            <md-button class="load-button" v-on:click="loadModel(info)">
                Load
            </md-button>
        </div>
    </div>
</template>

<script>
  import ModelsManagerService from 'spinal-service-models-manager'
  import { assemblyManagerService } from "spinal-service-assembly-manager";

  export default {
    name: "ModelsManagerPanel",
    data: function () {
      return {
        infos: [],
        thumbnail: {}
      }
    },

    methods: {
      opened: function ( option ) {
        const children = option.children;
        this.infos = [];
        for (let i = 0; i < children.length; i++) {
          if (children[i])
            this.infos.push( children[i] );
        }
      },

      closed: function () {

      },

      loadModel( ev ) {
        ModelsManagerService.waitForInitialize()
          .then( () => {
            return ModelsManagerService.loadModel( ev.path )
          } )
          .then( ( metaData ) => {
            return assemblyManagerService.createPart( ev.name,
              metaData.model, ev.thumbnail
            ).then( nodeId => {
              ModelsManagerService.setPartId( nodeId, metaData.modelId )
            } )
          } );

      }

    }
  }

</script>

<style scoped>
    img {
        height: 30vh;
    }

    .model-info {
        display: grid;

    }

    .list-model {
        display: flex;
        align-items: center;
        border-top: #fefefe solid 1px;
        border-left: #fefefe solid 1px;
        border-right: #fefefe solid 1px;
        padding: 10px
    }


</style>