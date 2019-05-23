import {
  SpinalContextApp,
} from 'spinal-env-viewer-context-menu-service';
import { assemblyManagerService } from "spinal-service-assembly-manager";

export class ToggleModelVisibilityButton extends SpinalContextApp {
  
  constructor( modelManger ) {
    super( 'Change default model', 'Change default  model', {
      icon: 'visibility',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff',
    } );
    this.modelManager = modelManger;
    this.action = this.toggleVisibility.bind( this );
    
  }
  
  isShown( option ) {
    const model = assemblyManagerService.getModel( option.selectedNode.id.get() );
    
    if (
      option.selectedNode.type.get() === 'AssemblyPart'
      && model
      && model.model
    ) {
      if (model.model.areAllVisible())
        this.buttonCfg.icon = 'visibility_off';
      else
        this.buttonCfg.icon = 'visibility';
      return Promise.resolve( true );
    }
    
    return Promise.resolve( -1 );
  }
  
  toggleVisibility( option ) {
    const forgeViewer = window.spinal.ForgeViewer;
    const model = assemblyManagerService.getModel( option.selectedNode.id.get() );
    const modelId = model.modelId;
    let res = forgeViewer.viewer.showModel( modelId, true );
    this.buttonCfg.icon = 'visibility_off';
    if (!res) {
      forgeViewer.viewer.hideModel( modelId );
      this.buttonCfg.icon = 'visibility';
    }
  
  }
  
}
