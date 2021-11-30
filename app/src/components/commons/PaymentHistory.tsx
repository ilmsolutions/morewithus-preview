import * as React from 'react';
import axios from 'axios';
import {AuthBaseComponent} from '../commons/authbasecomponent';
import {DataGrid} from '../main/datagrid';
import {transformSubscriptionDTO} from '../../helpers/transforms';



export class PaymentHistory extends AuthBaseComponent{
    componentDidMount(){
        //axios.get('/api/auth/external/authorization/user')
        //console.log('subscriptions mount');
        axios.all([            
            this.getResource('user?include=subscriptions'),
            this.getResource('settings.subscriptions')
         ]).then((results) => {
            let user = JSON.parse(results[0].data.toString());
            //let subscriptions = results[1].data;
            let subscriptions = JSON.parse(results[1].data.toString());
            //console.log(user);
            //console.log(subscriptions);
            this.setState({
                user: user,
                subscriptions: subscriptions.map(transformSubscriptionDTO).filter(subscription => {
                    return subscription.usertype.indexOf(user.usertype) >= 0;
                })
            });
         });
       } 
       
       
    getInitialState(){
        return {
            status: true,
            message:'',
            step: 1,
            user:null,
            type: 'paymenthistory',
            subscriptions: []
        }
    }       

    constructor(props: any){
        super(props);
        this.state = Object.assign({}, this.getInitialState());
    }

    render(){
        let {type, user} = this.state;
        let columnDefs = this.getColumnDefs(type);
        return ( 
          <div className='container'>   
            <h5 className='pl-3 pt-3'>Payment History</h5>
            <div className='container'>
        {user ? <DataGrid 
                    columndefs={columnDefs}
                    type={type} rows={user.subscriptions}/> : <span>Loading....</span>}
            </div>
          </div>
        );
    }       

    getColumnDefs(type: string){
        switch(true){
            case /paymenthistory/.test(type):
              const rplan = renderplanname.bind(this.state.subscriptions);
              return [
                  {key: 'orderid', name: 'Order ID', cell: renderValue}
                , {key: 'paymentid', name: 'Payment ID', cell: renderValue}
                , {key: 'paymentdate', name: 'Payment Date', cell: renderdate}
                , {key: 'usercontext', name: 'Plan Type'}
                , {key: 'planid', name: 'Plan', cell: rplan}
                , {key: 'orderamount', name: 'Amount Paid', cell: rendercurrency}
                , {key: 'isexpired', name: 'Active', cell: renderboolean}
              ];
    }  

    function renderValue(item:any, key: string){
         return item[key] ? item[key] : 'None';
    }

    function renderplanname(item: any, key: string){
        let subscriptions = this;
        let subscription = subscriptions ? subscriptions.filter(subscription => {
            return subscription.id == item[key];
            }) : null;  

            return subscription && subscription[0] ? subscription[0].title : '-';          
    }
        
        function renderdate(item, key){
            return new Date(item[key]).toDisplay();
        }
         
        function renderboolean(item, key){
            return item[key] ? <i className='fa fa-close'></i> : 
                              <i className='fa fa-check'></i>; 
        }
        
        function rendercurrency(item, key){
            return item[key] >= 0 ? item[key].toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
                }) : '-';
        }

   }    
    
}