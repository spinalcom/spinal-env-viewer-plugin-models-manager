import { spinalContextMenuService } from "spinal-env-viewer-context-menu-service";
import Vue from "vue";
import { OpenModelLoaderButton } from "./buttons/OpenModelLoaderButton";
import ModelsManagerPanel from "./vue/ModelsManagerPanel.vue";
import { SpinalForgeExtention } from "spinal-env-viewer-panel-manager-service_spinalforgeextention";
import { ModifyPartButton } from "./buttons/ModifyPartButton";
import { SpinalMountExtention } from 'spinal-env-viewer-panel-manager-service';

import {
  SIDE_BAR_HOOK_NAME,
  TOP_BAR_HOOK_NAME
} from "./constants";
import ModifyPart from "./vue/ModifyPart.vue";
import { SelectModelButton } from "./buttons/SelectModelButton";
import { MoveModelButton } from "./buttons/MoveModelButton";
import { TranslateModelButton } from "./buttons/TranslateModelButton";
import { RotateModelButton } from "./buttons/RotateModelButton";
import { ToggleModelVisibilityButton } from "./buttons/ToggleModelVisibilityButton";
import { Remove } from "./buttons/Remove";
import { LoadPartButton } from "./buttons/LoadPartButton";
import { assemblyManagerService } from "spinal-service-assembly-manager";


const modelManager = SpinalForgeExtention.createExtention( {
  name: "Model_Manager",
  vueMountComponent: Vue.extend( ModelsManagerPanel ),
  panel: {
    title: "Model Manager",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
    width: "40px"
  }
} );


const partManager = SpinalForgeExtention.createExtention( {
  name: 'ModifyPartModal',
  vueMountComponent: Vue.extend( ModifyPart ),
  panel: {
    title: "Modify part",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
    width: "430px"
  }
} );


function mountExtension() {
  SpinalMountExtention.mount( {
    name: 'MoveModelModal',
    vueMountComponent: Vue.extend( MoveModel ),
    parentContainer: document.body
  } );
  SpinalMountExtention.mount( {
    name: 'SelectModelModal',
    vueMountComponent: Vue.extend( SelectModelModal ),
    parentContainer: document.body
    
  } );
}


spinalContextMenuService.registerApp( TOP_BAR_HOOK_NAME, new OpenModelLoaderButton(), [7] );
spinalContextMenuService.registerApp( TOP_BAR_HOOK_NAME, new SelectModelButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new LoadPartButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new ModifyPartButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new MoveModelButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new TranslateModelButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new RotateModelButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new ToggleModelVisibilityButton(), [7] );
spinalContextMenuService.registerApp( SIDE_BAR_HOOK_NAME, new Remove(), [7] );

SpinalForgeExtention.registerExtention( "Model_Manager", modelManager );
SpinalForgeExtention.registerExtention( "ModifyPartModal", partManager );

