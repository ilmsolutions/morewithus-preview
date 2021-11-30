import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ScriptLoadWrapper} from '../commons/scriptloadwrapper';

type callbackType = (any) => void;

interface IPaypalButtonProps extends React.Props<BasePaypalButton>{
    env: string,
    apikey: string, 
    amount: number,
    currency?: string,
    onSuccess(object),
    onFailure(object),
    onLoad(resolve:callbackType, error:callbackType)
}

declare global {
    interface Window { 
        React: any;
        ReactDOM: any;
     }
     
}
declare let paypal: any;

class BasePaypalButton extends React.Component<IPaypalButtonProps, any>{

    getInitialState(){
        return {            
            status: true,
            message:'',
            amount:0,
            currency: 'USD'
        }
    }

    constructor(props:IPaypalButtonProps){
        super(props);
        window.React = React;
        window.ReactDOM = ReactDOM;
        this.state = Object.assign({}, this.getInitialState(), props, {loadstatus: ''});      
    }

    public componentDidMount(){
        this.props.onLoad(() => {
            this.setState({loadstatus: 'ready'});
        }, (err) =>{
            //console.log('there was an error', err);  
            this.props.onFailure({status: false, message: 'Load Error: ' + err});
        });
    }

    public componentWillUnmount() {

    }

    render(){
        let {loadstatus, amount, currency} = this.state;
        const {env, apikey, onSuccess, onFailure} = this.props;
        const renderPayPalButton = () => {
            let client = {
                [env]: apikey
            };        
            let payment = (data, actions) => {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: amount, currency: currency }
                            }
                        ]
                    }
                });
            };
            let onAuthorize = (data, actions) => {
                //console.log('on authorize....');
                //console.log(actions);
                //console.log(data);
                return actions.payment.execute().then((res) => {
                    //window.alert('Payment Complete!');
                    //console.log('in execute success');
                    //console.log(res);
                    if(res.state == 'approved' && onSuccess)
                       onSuccess(data);
                }).catch((res) => {
                    //console.log('error handler');
                    //console.log(res);
                    if(onFailure)
                      onFailure({status: false, message: 'Payment could not be executed. Please try again!'});
                });
            };
            let onCancel = function(data) {
                //console.log('The payment was cancelled!');
                if(onFailure)
                   onFailure({status: false, message: 'The payment was cancelled.'});
            }
            let onError = function(data){
                if(onFailure)
                  onFailure({status: false, message: 'Error occurred while loading files.'});
            }
          //  let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

            return <paypal.Button.react env={env}
                 client={client} payment={payment} commit={true}
                 onAuthorize={onAuthorize} onCancel={onCancel} onError={onError}/>;
                
        }
        return <span>
                {(loadstatus == 'ready') ? 
                       renderPayPalButton() : ''}
              </span>;        
    }
}

export const PaypalButton = ScriptLoadWrapper({paypal : 'https://www.paypalobjects.com/api/checkout.js'}, BasePaypalButton);