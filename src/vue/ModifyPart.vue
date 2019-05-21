<template>

    <div class="body-modify">
        <div v-if="!displayNameEditor" class="name-area">
            <h1>{{name}}</h1>
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

        <md-divider/>
        <transformation-component name="Translation"
                                  :value="translation"
                                  :min="0"
                                  :max="100"
                                  @change="onTranslationChange"/>
        <md-divider/>
        <transformation-component name="Rotation"
                                  :value="rotation"
                                  :min="0"
                                  :max="360"
                                  @change="onRotationChange"/>

        <md-divider/>

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
        open: false,
        translation: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0, y: 0, z: 0 },
        loadAuto: false,
        modelManager: {},
        node: {},
        store: {},
        movie: ''
      }
    },
    methods: {
      opened: function ( option ) {
        this.node = Object.assign( option.node.get() );
        this.id = this.node.id;
        this.loadAuto = this.node.autoLoad;
        this.name = this.node.name;
        if (option.transformation) {
          if (option.transformation.translate)
            this.translation = option.transformation.translate;
          if (option.transformation.rotate) {

            this.rotation = {
              x: (option.transformation.rotate.x * (180 /
                Math.PI)) % 360,
              y: (option.transformation.rotate.y * (180 /
                Math.PI)) % 360,
              z: (option.transformation.rotate.z * (180 /
                Math.PI)) % 360
            };
          }
          if (option.transformation.scale)
            this.scale = option.transformation.scale;
        }

        this.open = true;
      },
      closed: function ( option ) {
        //this.store.dispatch('togglePanel');
      },
      closePanel: function () {
        spinalPanelManagerService.closePanel( 'ModifyPartModal' )
      },
      removed: function () {
        //  this.store.dispatch('togglePanel');
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
      onTranslationChange: function ( value ) {
        this.translation = value;
      },
      onRotationChange: function ( value ) {
        //        this.modelManager.transformModel(this.model)
        this.rotation = {
          x: value.x,
          y: value.y,
          z: value.z
        };
      },
      onScaleChange: function ( value ) {
        this.scale = value;
      }
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