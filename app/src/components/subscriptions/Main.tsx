import * as React from 'react';
import axios from 'axios';
import {AuthBaseComponent} from '../commons/authbasecomponent';
import {Plans} from './steps/plans';
import {Confirm} from './steps/confirm';
import  '../../helpers/string';
import {transformSubscriptionDTO} from '../../helpers/transforms';

const beginStep = 1;

export class Main extends AuthBaseComponent{

    componentDidMount(){
        //axios.get('/api/auth/external/authorization/user')
        //console.log('subscriptions mount');
        axios.all([            
            this.getResource('user'),
            this.getResource('settings.subscriptions'),
            this.getResource('locals.paypal')
         ]).then((results) => {
            let user = JSON.parse(results[0].data.toString());
            //let subscriptions = results[1].data;
            let subscriptions = JSON.parse(results[1].data.toString());
            let paypal = results[2].data;
            //console.log(user);
            //console.log(subscriptions);
            //console.log(paypal);
            this.setState({
                user: user,
                paypal: paypal, 
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
            subscriptions: []
        }
    }       
    constructor(props: any){
        super(props);
        this.state = Object.assign({}, this.getInitialState());
        this._bind('previousStep', 'nextStep', 'finishStep', 'submitData', 'updateSelected');
    }
    render(){
        let {status, message, step, user, subscriptions, paypal, selected} = this.state;
        let {usercontext} = this.props.location.query;
        selected = selected ? selected : 
                              (user ? {usercontext : (usercontext || user.usercontext)} : null);
        let mprops =  Object.assign({}, {status: status, message: message, step: step, 
                                            selected: selected,
                                            user: user,
                                            updateSelected: this.updateSelected,
                                            nextStep: (step == 2 ? this.finishStep : this.nextStep), 
                                            previousStep: this.previousStep});
        //loop through subscriptions
        //get selected plan if any
        //if selected plan then 
           //filter out lower price plans or inactive plans
           //and for the remaining plans calculate the upgrade price
        //else
           //include
        let userSubscription = user && user.subscriptions ? user.subscriptions.filter(subscription => {
            return subscription.usercontext.equals(selected.usercontext);
        }) : null;
        
        //console.log(userSubscription);
        let selSubscription =  userSubscription && userSubscription.length > 0 ? subscriptions.filter(subscription => {
            return subscription.id == userSubscription[0].planid; 
        }) : null;

        //console.log(selSubscription);
        let startdate = userSubscription && userSubscription[0] ? new Date(userSubscription[0].startdate) : new Date();
    
        const evalSubscription = (subscription) => {
            let tSubscription = {};

            if(selSubscription && selSubscription.length > 0){
                let selSPrice = selSubscription[0].price;                
                if(subscription.id == selSubscription[0].id){
                 tSubscription = Object.assign({state: 'current'}, subscription, userSubscription[0], {
                     price: null
                     ,cprice: null
                 });
                }
                else if(subscription.price == null){
                  tSubscription = Object.assign({state: 'free'}, subscription, {
                      price: null
                      ,cprice: null
                  });
                }
                else if(subscription.price < selSPrice){
                    tSubscription = Object.assign({state: 'disable'}, subscription, {
                        price: null
                        ,cprice: null
                    });
                }
                else if(subscription.price > selSPrice){
                    let _price = (subscription.price - selSPrice);
                    let _aprice = subscription.ispromoted == true ? subscription.promotionprice 
                                           : _price;
                    let _state = _aprice <= 0 ? 'free-promotion' : 'upgrade';
                    
                    tSubscription = Object.assign({state: _state}, subscription, {
                        price: _price,
                        cprice: _aprice,
                        startdate: startdate,
                        expirationdate: subscription.duration ? startdate.addDuration(subscription.duration) : null
                   });                
                }
                else
                   tSubscription = Object.assign({}, subscription, {
                       _cprice: subscription.price
                   });
            }
            else{
                //console.log(subscription.promotionprice);
                //if subscription price is 0 then it will be marked as free with no activation needed
                //however if the actual price (_aprice) is 0 then it will be marked as free-promotion 
                //needing activation
                let _aprice = subscription.ispromoted == true ? subscription.promotionprice 
                : subscription.price;
                let _state = subscription.price == 0 ? 'free' 
                               : (_aprice <= 0 ? 'free-promotion' : 'enable'); 
                tSubscription = Object.assign({state: _state}
                                            , subscription
                                            , {
                                                startdate: startdate,
                                                cprice: _aprice,
                                                expirationdate: subscription.duration ? startdate.addDuration(subscription.duration) : null                            
                                            });
            }

            return tSubscription;
        };

        let msubscriptions = subscriptions.filter(subscription => {
              //only active subscriptions, and those which the user is already subscribed to
              return subscription.active  == true || 
                    (selSubscription && selSubscription[0] && selSubscription[0].id == subscription.id);
        }).map(evalSubscription);

        const renderComponent = (step) =>{
            switch(step){
                case 1:                  
                    return  <Plans key={'plans'} subscriptions={msubscriptions} 
                                                {...mprops}/>;
                case 2:
                    return <Confirm key={'confirm'} subscriptions={msubscriptions} paypal={paypal} {...mprops}></Confirm>;
            }
        };
        return <div className="container">
                {renderComponent(step)}
            </div>;
    
/*         else{
           return <div className="container">
                   <div className="alert alert-warning">
                       Please complete your <a href="/auth/profile">Profile</a> before choosing a subscription.
                   </div>
                  </div>;
        } */
     }

     nextStep(data){
      //   console.log(data);
      //   console.log('this is the next step');
         console.log(data);
         let {step} = this.state;         
         this.setState(state => Object.assign(state, {step: step + 1}, {...data}));
     }

     finishStep(data){
        const {user} = this.state;    
         //record subscription for user
        // console.log('this is the finish step');
        // console.log(data);
        // console.log(user);
         if(data){
             this.submitData(data, beginStep, function(){
                //response redirect to page
                window.scrollTo(0, 0);
                window.sweetalert('Thanks for subscribing to the plan.');
                //console.log('you are registered!');
            });             
         }
     }

     previousStep(){
        let {step} = this.state;
        this.setState({step: step - 1});
     }

     updateSelected(value){
        this.setState((state) =>{
            state.selected = Object.assign({}, state.selected, value);
        });
     }

     submitData(data, step, cb?){
        let self = this;
        //console.log('submit data');
        //console.log(data);
        return function(){
              //save data
                  axios.post('/api/auth/external/authorization/subscription', data)
                  .then(res =>{
                      let user = res.data ? JSON.parse(res.data.toString()) : null;
                      self.setState(state => ({
                                    status: true, message: '',
                                    user: Object.assign({}, user),
                                    step: step
                                    }));
      
      
                      if(cb){cb()};
      
                      window.scrollTo(0, 0)
                  })
                  .catch(err => {
                      self.setState(state => ({
                          status: false,
                          message: (err.response && err.response.data ? err.response.data : '')
                      }));
                  });            
            
        }();
      }
      
}