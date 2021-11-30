import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {saveAs} from 'file-saver';
import {AuthBaseComponent} from '../commons/authbasecomponent';
import {DataGrid} from '../main/datagrid';
import {functions} from '../../helpers/common';
import {Promised} from '../commons/promised';
import {Modal} from '../main/modal';
import {RenderExcel} from '../main/renderexcel';
import * as UserView from './userview';

var PromiseModal = Promised('getResource', Modal);

export class Report extends AuthBaseComponent{
    
    constructor(props){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
        this._bind('loadList', 'getColumnDefs'
                  , 'updateHandler', 'deleteHandler'
                  , 'errorHandler'
                  , 'viewHandler', 'resetModal');
    }

    getInitialState(){
        return {
            status: true,
            message:'',
            id: null,
            rows:[]
        }
    }
 
    componentDidMount(){
       this.loadList();
    }
     
    render(){
       let {type} = this.props;
       let {rows, id} = this.state;
       let columnDefs = this.getColumnDefs(type);
       let ecolDefs = columnDefs.filter((def) => {
           return def.key != 'actions';
       }).map(def => {
           return {label: def.name
                  , value: def.cell != null && def.key != 'usertype' ? def.cell : def.key
                  , key: def.key}
       });
       return (
             <div className='container'>
               {id ?
              <PromiseModal getResource={this.getResource('report.users/' + id)
                                             .then(value => {
                    //console.log(value);
                    return Promise.resolve({content: JSON.parse(value.data.toString())});
              })}  show={true} close={this.resetModal} renderer={UserView.default}  />  : ''}                
             <span className='d-flex flex-row-reverse mt-2 pr-3'> 
                <RenderExcel data={rows} coldefs={ecolDefs} 
                             filename={'UserList' + ' ' 
                                      + new Date().toDisplay().replace('/', '_')  
                                      + '.xlsx'} 
                             sheetname={'Users'}/>
             </span>
              <DataGrid 
                   columndefs={columnDefs}
                   type={type} rows={rows}/>

            </div>
       );
    }


    loadList(){        
        let {type, getResource} = this.props;
        getResource(type).then(res => {
            var co = JSON.parse(res.data.toString());
            //console.log(co);
            this.setState({
                rows: co.users
            });
        });
    } 

    saveListItem(row){
        let {rows} = this.state;
        let {type, postResource} = this.props;
        let self = this;
        postResource(type, row).then(res => {
            var co = JSON.parse(res.data.toString());
            var i = functions.findWithAttr(rows, '_id', row._id);
            rows[i] = co;
            self.setState({
                rows: rows
            });
        });
      }
   

    deleteListItem(row){
        let {rows} = this.state;
        let {type, deleteResource} = this.props;
        let self = this;
        deleteResource(type, {id: row._id}).then(res => {
             var i = functions.findWithAttr(rows, '_id', row._id);
             rows.splice(i, 1);
             self.setState({
                 rows: rows
                 , _id: row._id
                 , status: true
                 , message: 'Deleted!'
             });
        }).catch(err => this.errorHandler(row._id, 'Delete failed!'));
    
    }

    errorHandler(_id, message){

        this.setState({
             _id: _id
           , status: false
           ,message: message
        });
    }
 
    getColumnDefs(type: string){
        switch(true){
            case /users/.test(type):
              let ractions = (item, key) => {return renderactions({
                                           update:  this.updateHandler
                                         , delete: this.deleteHandler
                                         , view: this.viewHandler
                                        }, item, key);}
              return [
                 {key: 'firstname', name: 'First Name', cell: null},
                 {key: 'lastname', name: 'Last Name', cell: null},
                 {key: 'email', name: 'Email', cell: null},
                 {key: 'usertype', name: 'User Type', cell: renderusertype},
                 {key: 'registered', name:'Registered?', cell: renderboolean},
                 {key: 'lastlogin', name:'Last Login', cell: renderdate, sort: sortdate},
                 {key: 'createdon', name:'Created On', cell: renderdate, sort: sortdate},
                 {key: 'actions', name: 'Actions', cell: ractions}
              ];
        }  
     
     }    

     updateHandler(item, fieldname, value){
         item[fieldname] = value;
         this.saveListItem(item);
         return false;
     }

     deleteHandler(item){
         //this.deleteListItem(item);
         
         window.sweetalert({
             title: 'Are you sure you want to delete the user?'
             ,text: ''
             ,icon: 'warning'
             ,confirmButtonText: "Yes"
             ,showCancelButton: true
             ,dangerMode: true
         }, (willDelete) => {
             if(willDelete){
                 this.deleteListItem(item);
                //console.log('file deleted');
             }
             else
                console.log('not deleted');
         });
         return false;
     }

     viewHandler(item){
        this.setState({
            id: item._id
        });
        return false;
     }

     resetModal(){
         this.setState({
              id: null            
         });
     }

}

function renderdate(item, key){
    return new Date(item[key]).toDisplay();
}

function renderusertype(item, key){
    if(item[key] === 'Organization'){
        return [<i className='fa fa-users' />, ' ', 
                item['organizationname'] ? item['organizationname'] : item[key]];
    }
    return item[key];
}

function sortdate(a, b, desc){
  // force null and undefined to the bottom
  a = (a === null || a === undefined) ? -Infinity : new Date(a)
  b = (b === null || b === undefined) ? -Infinity : new Date(b)
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  return 0    
}

function renderboolean(item, key){
    var arr = [];
    if(item['isregisteredemployee'] == true)
       arr.push('Employee');
    
    if(item['isregisteredemployer'] == true)
       arr.push('Employer');

    return arr.join(' ');
}

const actions = [
    {field: 'update', behaviors: (item, clickHandler) => {
        return {
            onclick: (e) => {
                e.preventDefault();
                clickHandler(item, 'isblocked', !item['isblocked']);
            }
          , icon: () => {
            return (item['isblocked'] == true ? ' fa-ban text-danger' : ' fa-ban text-muted')
          }
          ,title: () =>{
            return 'Click to' + (item['isblocked'] == true ? ' unblock ' : ' block ') + 'user';
          }
        }
       }
    }
    ,{
      field: 'view', behaviors: (item, clickHandler) =>{
          return {
              onclick: (e) => {
                  e.preventDefault();
                  clickHandler(item);
              }
              , icon: 'fa-eye'
              , title: 'View Details'
          };
      }  
    }
   ,{
    field: 'delete', behaviors: (item, clickHandler) =>{
        return {
            onclick: (e) => {
                e.preventDefault();
                clickHandler(item);
            }
            , icon: 'fa-trash text-danger'
            , title: 'Delete User'
        };
    }  
     
   }
];

function renderactions(clickHandlers, item, key){
    return actions.map((action, a) => {
         let behaviors = action.behaviors(item, clickHandlers[action.field]);         
            return <a href='#' key={a}
                      title={typeof behaviors.title === 'function' ? 
                                          behaviors.title() : behaviors.title} 
                      onClick={behaviors.onclick}>
                      <i className={'fa ' + (typeof behaviors.icon === 'function'?
                                          behaviors.icon() : behaviors.icon)} />
                   </a>;
         
    });
}
