import {
  SpinalContextApp,
} from 'spinal-env-viewer-context-menu-service';

import { spinalPanelManagerService } from 'spinal-env-viewer-panel-manager-service';
import { assemblyManagerService } from "spinal-service-assembly-manager";


export class ModifyPartButton extends SpinalContextApp {
  
  constructor(modelManager) {
    super( 'Charger un model', 'Charger un  model', {
      icon: 'edit',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff',
    } );
    
    this.modelManager = modelManager;
    this.action = this.openModifyPanel.bind(this)
  }
  
  isShown( option ) {
    
    if (
      (option.selectedNode.type.get() === 'AssemblyPart')
    ) {
      return Promise.resolve( true );
    } else {
      return Promise.resolve( -1 );
    }
  }
  
  
  openModifyPanel(option){
    const node = Object.assign(option.selectedNode);
    assemblyManagerService.getTransformation(node.id.get()).then(
      model => {
        spinalPanelManagerService.openPanel( "ModifyPartModal" , {
          node,
          transformation: model && model.transform? model.transform.get() : {}});
      }
    );
  }
  
}