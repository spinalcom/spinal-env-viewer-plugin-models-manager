<template>

    <div class="body-modify">
        <div v-if="!displayNameEditor" class="name-area">
            <h2>{{name}}</h2>
            <SpinalIconButton
                    icon="edit"
                    @click="displayNameEditor = true"/>
        </div>
        <div v-else class="name-area">
            <md-field>
                <label>Part name:</label>
                <md-input v-model="editedName"/>
            </md-field>
            <SpinalIconButton icon="done"
                              @click="editName(true)"
            />
            <SpinalIconButton icon="cancel"
                              @click="editName(false)"
            />
        </div>
        <md-switch v-model="loadAuto">Load Automatically</md-switch>

        <img :src="node.thumbnail">

    </div>

</template>

<script>
  import { assemblyManagerService } from "spinal-service-assembly-manager";

  import { SpinalIconButton }
    from "spinal-env-viewer-vue-components-lib";
  import SliderLabel
    from "./sliderLabel.vue";
  import { SpinalGraphService } from "spinal-env-viewer-graph-service";
  import TransformationComponent from "./TransformationComponent.vue";
  import { spinalPanelManagerService } from 'spinal-env-viewer-panel-manager-service';

  export default {
    name: "ModifyPartModal",
    components: { TransformationComponent, SliderLabel, SpinalIconButton },
    data: function () {
      return {
        name: '',
        displayNameEditor: false,
        editedName: '',
        id: '',
        loadAuto: false,
        modelManager: {},
        node: {},
      }
    },
    methods: {
      opened: function ( option ) {
        this.node = Object.assign( option.node.get() );
        this.id = this.node.id;
        this.loadAuto = this.node.autoLoad;
        this.name = this.node.name;
      },
      closed: function ( option ) {

      },
      closePanel: function () {
        spinalPanelManagerService.closePanel( 'ModifyPartModal' )
      },
      removed: function () {

      },
      isActive: function ( id ) {
        return window.spinal.ForgeViewer.viewer.model.id === id;
      },
      editName: function ( value ) {
        this.displayNameEditor = false;
        if (value) {
          this.name = this.editedName;
          SpinalGraphService.modifyNode( this.id, { name: this.name } )
        }
      },
    },
    watch: {
      displayNameEditor: function ( value ) {
        if (value)
          this.editedName = name;
      },
      loadAuto: function ( value ) {
        assemblyManagerService.setAutoLoad( this.id, value )
      },
    },

  }

</script>

<style scoped>
    .md-dialog {
        width: 30%;
    }

    .icon-button:hover {
        cursor: pointer;
    }

    .transformation-name {
        display: flex;
    }

    .body::-webkit-scrollbar {
        width: 2px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #121212;
    }

    .body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .body::-webkit-scrollbar-thumb {
        outline: 1px solid slategrey;
        background-color: #737374;
    }


    .name-area {
        display: flex;
    }

    .body-modify {
        height: 80vh;
        margin: 10px;
        overflow: auto;

    }

</style>

<style>
    .body-modify * {
        box-sizing: border-box !important;
    }
</style>