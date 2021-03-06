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

import { SpinalContextApp } from 'spinal-env-viewer-context-menu-service';
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { loadModelPtr } from "../utils";

const { spinalPanelManagerService } = require( "spinal-env-viewer-panel-manager-service" );

export class OpenModelLoaderButton extends SpinalContextApp {
  
  constructor() {
    super( 'Open Model Manager', 'Open Model Manager', {
      icon: 'business',
      icon_type: 'in',
      backgroundColor: '#000000',
      fontColor: '#ffffff'
    } );
    
    this.action = this.loadModel.bind( this );
  }
  
  isShown( option ) {
    return Promise.resolve( true );
  }
  
  getSVF( element, nodeId, name ) {
    return loadModelPtr( element.ptr )
      .then( elem => {
          return loadModelPtr( elem.currentVersion )
        }
      )
      .then( elem => {
          if (elem.hasOwnProperty( 'items' ))
            for (let i = 0; i < elem.items.length; i++)
              if (elem.items[i].path.get().indexOf( 'svf' ) !== -1) {
                return {
                  path: elem.items[i].path.get(), id: nodeId, name,
                  thumbnail: elem.items[i].thumbnail ?  elem.items[i].thumbnail.get() : elem.items[i].path.get() + '.png'
                };
              }
          return undefined;
        }
      );
  }
  
  loadModel(  ) {
    const context = SpinalGraphService.getContext( 'BimFileContext' );
    const promises = [];
    SpinalGraphService.getChildrenInContext( context.info.id.get(), context.info.id.get() )
      .then( children => {
        for (let i = 0; i < children.length; i++) {
          promises.push( this.getSVF( children[i].element, children[i].id.get(), children[i].name.get() ) )
        }
        Promise.all( promises )
          .then( res => {
            spinalPanelManagerService.openPanel( 'Model_Manager', { children: res } )
          } )
        
      } )
  }
}
