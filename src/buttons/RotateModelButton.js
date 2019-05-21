/*
 * Copyright 2019 SpinalCom - www.spinalcom.com
 *
 *  This file is part of SpinalCore.
 *
 *  Please read all of the following terms and conditions
 *  of the Free Software license Agreement ("Agreement")
 *  carefully.
 *
 *  This Agreement is a legally binding contract between
 *  the Licensee (as defined below) and SpinalCom that
 *  sets forth the terms and conditions that govern your
 *  use of the Program. By installing and/or using the
 *  Program, you agree to abide by all the terms and
 *  conditions stated or referenced herein.
 *
 *  If you do not agree to abide by these terms and
 *  conditions, do not demonstrate your acceptance and do
 *  not install or use the Program.
 *  You should have received a copy of the license along
 *  with this file. If not, see
 *  <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  SpinalContextApp,
} from 'spinal-env-viewer-context-menu-service';

import { assemblyManagerService } from "spinal-service-assembly-manager";
import ModelManagerService from 'spinal-models-manager-service'

export class RotateModelButton extends SpinalContextApp {
  
  constructor() {
    super( 'Rotate Model', 'Charger un  model', {
      icon: 'control_camera',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff',
    } );
    
    this.action = this.rotateModel.bind( this );
    this.isShown = this.mIsShown.bind( this );
  }
  
  mIsShown( option ) {
    console.log(option);
    const model = assemblyManagerService.getModel( option.selectedNode.id.get() );
    
    if (model && (option.selectedNode.type.get() === 'AssemblyPart')) {
      return Promise.resolve( true );
    } else {
      return Promise.resolve( -1 );
    }
  }
  
  rotateModel( option ) {
    
    ModelManagerService.rotateHelper.activate();
    ModelManagerService.rotateHelper.setFullTransform( true );
    
  }
}
