import * as React from 'react';
import {PaypalButton} from '../../main/paypalbutton';
import {Currency} from '../../main/currency';
import {Library} from '../../../helpers/library';
import  '../../../helpers/date';
import  '../../../helpers/string';


export class Confirm extends React.Component<any, any>{

    getInitialState(){
        return {
            status: true,
            message:''
        }
    }

    constructor(props){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
        this.onFailure = this.onFailure.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onActivate = this.onActivate.bind(this);
    }

    render(){
        let {subscriptions, paypal, selected, previousStep, status, message} = this.state;

        let renderPlan = () =>{
            let subscription = subscriptions ? subscriptions.filter(subscription => {
               return subscription.id == selected.planid;
            }) : null;

            selected.plan = subscription ? subscription[0]: null;
            const activate = selected.plan.cprice > 0 ? <div>
                    <PaypalButton
                        {...paypal} 
                        amount={selected.plan.cprice} 
                        onSuccess={this.onSuccess} 
                        onFailure={this.onFailure}/>
                    <span className='small text-muted'>
                    {Library.MSG_PAYPAL_PAYMENT_INFO}
                    </span>
                </div>  
            :  <a href='#' className='btn btn-primary' onClick={this.onActivate}>
                Activate
                </a>;            
            const date = new Date();
            return selected.plan ? <div className='card'>
                            <div className="card-body">
                                <h5>
                                    {selected.plan.usercontext 
                                     + ' Subscriptions: ' 
                                     + selected.plan.title}
                                    <small>
                                    <a href="#" className="ml-1" onClick={previousStep}>
                                          (Select another plan)</a>
                                    </small>
                                </h5>
                                <p className="card-text">
                                    {selected.plan.description}
                                </p>
                                <ul className="card-text">
                                    {
                                        selected.plan.features.map((feature, i) => {
                                            return <li key={i}>{feature}</li>;
                                        })
                                    }
                                </ul>
                                <h6 className="display-4 text-center">
                                       <Currency value={selected.plan.cprice} />
                                </h6>  
                                <p className="card-text text-center">
                                    Expires On: {
                                        selected.plan.expirationdate.toDisplay()
                                    }
                                </p>     
                                <div className="card-text text-center">
                                   {activate}
                                </div>                                                   
                            </div>
                          </div> : 'Invalid Plan selected.';
        }
        const renderStatus = (status, message) => {
            return (message ? <div className={'alert ' + (status == true ? 
                                                          'alert-success' : 'alert-danger')}>
                                {message}
                              </div> : '');
        }
        return <div className="container">
                  {renderPlan()}
                  {renderStatus(status, message)}
               </div>;
    }

    onFailure(data){
         this.setState(data);
    }

    onActivate(e){
       this.onSuccess({
               orderamount: 0           
       });
    }

    onSuccess(data){
        const {nextStep} = this.props;
        const {selected} = this.state;
        if(nextStep && data){
          //  console.log(data);
           nextStep(Object.assign({}, {
                                       usercontext: selected.usercontext,
                                       planid: selected.plan.id,
                                       orderid: data.orderID,
                                       orderamount: selected.plan.cprice,
                                       paymenttoken: data.paymentToken,
                                       payerid: data.payerID,
                                       paymentid: data.paymentID,
                                       paymentdate: Date.now(),
                                       startdate: selected.plan.startdate,
                                       expirationdate: selected.plan.expirationdate
                                       }));
        }
    }
}   