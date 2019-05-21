<template>
    <div   >
        <div class="transformation-name" @click="toggleOpen">
            <div v-if="!open">
                <i class="material-icons icon-button"

                > arrow_right</i>
            </div>
            <div v-else>
                <i class="material-icons icon-button"
                > arrow_drop_down</i>
            </div>
            {{name}}
        </div>
        <div v-if="open">
            <slider-label :min="0" :max="360" label="x" :value="x"
                          @input="updateX"/>
            <slider-label :min="0" :max="360" label="y" :value="y"
                          @input="updateY"/>
            <slider-label :min="0" :max="360" label="z" :value="z"
                          @input="updateZ"/>
        </div>
    </div>
</template>

<script>

  import { SpinalIconButton }
    from "spinal-env-viewer-vue-components-lib";
  import SliderLabel
    from "./sliderLabel.vue";

  export default {
    name: "TransformationComponent",
    components: { SliderLabel, SpinalIconButton },
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: Object,
        required: true,
      },
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    },
    data: function () {
      return {
        open: false,
        x: 0,
        y: 0,
        z: 0,
      }
    },
    methods: {
      toggleOpen: function () {
        this.open = !this.open;
      },

      updateX: function ( value ) {
        this.x = value;
        this.emitChange();
      },

      updateY: function ( value ) {
        this.y = value;
        this.emitChange();
      },

      updateZ: function ( value ) {
        this.z = value;
        this.emitChange();
      },

      emitChange() {
        this.$emit( 'change', { x: this.x, y: this.y, z: this.z } )
      },


    },

    watch: {
        value: function (value) {
          console.log(this.name, this.value);

          this.x = value.x;
          this.y = value.y;
          this.z = value.z;
        }
    }
  }
</script>

<style scoped>
    .icon-button:hover {
        cursor: pointer;
    }

    .transformation-name {
        display: flex;

    }
    .transformation-name:hover{
        cursor: pointer;
    }

</style>