<template>
    <md-dialog
            :md-active.sync="open"
    >
        <div class="body">
            <h1>Current Model</h1>
            <div v-for="model in models" :key="model.id">
                {{model.name}}
                <i class="material-icons"
                   :class="{active:isActive(model.value)}"
                   @click="selectModel(model.value)"
                >
                    done
                </i>
            </div>
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
  import { SpinalGraphService } from "spinal-env-viewer-graph-service";


  export default {
    name: "MoveModel",
    components: {
      VueSlideBar
    },
    data: function () {
      return {
        models: [],
        open: false
      }
    },
    methods: {
      opened: function ( option ) {
        this.models = [];
        this.open = true;

        const it = AssemblyManagerService.mapModelByPartId.entries();
        let obj = it.next();
        while (!it.done && obj.value) {
            const node = SpinalGraphService.getNode( obj.value[0] );
            this.models.push( {
              name: node.name.get(),
              id: node.id.get(),
              value: obj.value[1]
            } );

          obj = it.next()
        }
      },
      closed: function ( option ) {

      },
      onCancel: function () {
        this.open = false;
      },
      onConfirm: function () {
        this.open = false;
      },
      isActive: function ( id ) {
        return window.spinal.ForgeViewer.viewer.model.id === id;
      },
      selectModel: function ( model ) {
        AssemblyManagerService._setCurrentModel( model )
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

    .active {
        color: #F68204;
    }

    .body {
        margin: 10px;
    }
</style>