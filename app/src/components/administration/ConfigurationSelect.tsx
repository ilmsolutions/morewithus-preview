import * as React from 'react';
import * as axios from 'axios';
import {Validate} from '../commons/validatecomponent';
import {ConfigurationEmailNotifications} from './configurationemailnotifications';
import {ConfigurationRules} from './configurationrules';
import {ConfigurationPages} from './configurationpages';
import {functions} from '../../helpers/common';



export class ConfigurationSelect extends Validate{
    constructor(props){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
        this._bind('loadList', 'saveListItem', 'onChange', 'errorHandler');
    }  

    componentDidMount(){
        this.loadList();
    }

    getInitialState(){
        return {
            status: true,
            message:'',
            selindex: 0,
            rows: null
        }
    }

    render(){
        let {type} = this.props;
        let {rows, _id, status, message} = this.state;
        let Control = this.getControl(type);
        
        _id = _id ? _id : (rows && rows.length > 0 ? rows[0]._id : null);

        let srow = rows ? rows.filter(row => {
            return row._id == _id;
        })[0] : null;

        const renderOption = (row, i) => {
              return <option className={row._id == _id ? 'active': ''}
                        value={row._id} key={i} 
                        >{row.label}</option>;
        };

        let renderSelect= rows ?  <select className="form-control" 
                                       id="notificationSelect" onChange={this.onChange}>
                                     {rows.map(renderOption)}
                                    </select> : 'Loading.....';

        let props = (rows && srow._id == _id ? {status: status, message: message} : {});

        let renderContent = rows ?  <Control 
                                          row={srow} 
                                          save={this.saveListItem}
                                          {...props}
                                          /> :
                                    'Loading....'

        return <div className="container configuration-container">
            <div className="form-group">
                <label htmlFor="notificationSelect">Select: </label>
                {renderSelect}
            </div>       
            <div className="form-group" key={_id}>
               {renderContent}
            </div> 
        </div>;

    }

    loadList(){        
        let {type, getResource} = this.props;
        getResource(type).then(res => {
            var co = JSON.parse(res.data.toString());
            this.setState({
                 rows: co.result
                ,status: true
                ,message: ''
            });
        }).catch(err => this.errorHandler(null, 'Load failed!'));
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
               ,_id: row._id
               ,status: true
               ,message: 'Success!'
            });
        }).catch(err => this.errorHandler(row._id, 'Save failed!'));
      }
       
    onChange(e){
        let {rows} = this.state;
        var target = e.target,
            _id = target.value;
        this.setState({_id : _id, message: ''});
    }

    getControl(type){
        switch(true){
            case /rules/.test(type):
              return ConfigurationRules;
            case /emailnotifications/.test(type):
              return ConfigurationEmailNotifications;
            case /pages/.test(type):
              return ConfigurationPages;
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