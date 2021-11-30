import * as React from 'react';
import * as axios from 'axios';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Validate} from '../commons/validatecomponent';
import {ConfigurationForm} from './configurationform';
import {ConfigurationSubscription} from './configurationsubscription';
import {ConfigurationAdverts} from './configurationadverts';
import {ConfigurationSocials} from './configurationsocials';
import {functions} from '../../helpers/common';

export class ConfigurationList extends Validate{

    constructor(props){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
        this._bind('loadList', 'renderForm'
                  , 'saveListItem','deleteListItem'
                  , 'addForm', 'errorHandler');
    }

    getInitialState(){
        return {
            status: true,
            message:'',
            rows:[]
        }
    }
 
    componentDidMount(){
        this.loadList();
    }
        
    render(){
        let {type, rows} = this.state;
        let control =  this.getControl(type);
        const renderforms = this.state.rows.map((row, i) => 
                               {return this.renderForm(control, row, i)});

        return   <div className="container configuration-container">

                  <span className="d-flex justify-content-end">
                  <button className="btn btn-success" onClick={this.addForm}>
                       <i className="fa fa-plus" /> Add
                  </button>
                  </span>

                  <ReactCSSTransitionGroup
                     transitionName="step"
                     transitionEnterTimeout={500}
                     transitionLeaveTimeout={300}>                    
                     {renderforms}
                  </ReactCSSTransitionGroup>
               
                </div>;
    }

   renderForm(Control, row, i){  
       let {status, message, _id} = this.state;     
       let props = (row._id == _id ? {status: status, message: message} : {});
       return <Control key={row && row._id ? row._id : ''} 
                                 row={row} 
                                 save={this.saveListItem}
                                 remove={this.deleteListItem}
                                 {...props}
                                  />;
   }

   addForm(e){

      this.setState((state) => {
          var path = ',' + 
                    functions.toProperCase(state.type.replace(/configuration\./,'')) +
                     ',';
          state.rows.splice(0,0,{
                                  path: path
                                });
      });
   }

   loadList(){        
    let {type, getResource} = this.props;
    getResource(type).then(res => {
        var co = JSON.parse(res.data.toString());
        this.setState({
            rows: co.result
        });
    });
   }

   saveListItem(row){
     let {rows} = this.state;
     let {type, postResource} = this.props;
     let self = this;
     let save = null;
     if(row.custom && row.custom.image && !functions.contains('url', row.custom.image)){
        save = postResource('upload.image', row.custom).then(res => {
                if(res.data){
                    row.custom = Object.assign({}, row.custom, res.data);
                    return postResource(type, row);
                }
        }).catch(err => this.errorHandler(row._id, 'Upload failed!'));        
    }
    else 
      save = postResource(type, row);

     save.then(res => {
         var co = JSON.parse(res.data.toString());
         var i = functions.findWithAttr(rows, '_id', row._id);
         rows[i] = co;
         console.log('save successful');
         self.setState({
             rows: rows
             , _id: row._id
             , status: true
             , message: 'Success!'
         });
     }).catch(err => this.errorHandler(row._id, 'Save failed!'));
   }

   deleteListItem(row){
    let {rows} = this.state;
    let {type, deleteResource} = this.props;
    let self = this;
    deleteResource(type, row).then(res => {
         var i = functions.findWithAttr(rows, '_id', row.item);
         rows.splice(i, 1);
         self.setState({
             rows: rows
             , _id: row._id
             , status: true
             , message: 'Deleted!'
         });
    }).catch(err => this.errorHandler(row._id, 'Delete failed!'));
   }

   getControl(type){
       switch(true){
           case /adverts/.test(type):
             return ConfigurationAdverts;
           case /subscriptions/.test(type):
             return ConfigurationSubscription;
           case /sociallogins/.test(type):
             return ConfigurationSocials;
           case /jobtypes/.test(type):
           default:
             return ConfigurationForm;             
       }
   }   

   errorHandler(_id, message){

       this.setState({
            _id: _id
          , status: false
          ,message: message
       });
   }
}