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
  import { loadModelPtr } from "../utits";
  import ModelsManagerService from 'spinal-models-manager-service'
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
      getSVF: function ( element, nodeId ) {
        return loadModelPtr( element.ptr )
          .then( elem => {
              return loadModelPtr( elem.currentVersion )
            }
          )
          .then( elem => {
              if (elem.hasOwnProperty( 'items' ))
                for (let i = 0; i < elem.items.length; i++)
                  if (elem.items[i].path.get().indexOf( 'svf' ) !== -1) {
                    this.thumbnail[nodeId] = elem.items[i].path.get() + '.png';
                    return { path: elem.items[i].path.get(), id: nodeId };
                  }

              return undefined;
            }
          )
      },
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
            return assemblyManagerService.createPart( ev.name, metaData.model
            ).then( nodeId => {
              ModelsManagerService.setPartId( nodeId, metaData )
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