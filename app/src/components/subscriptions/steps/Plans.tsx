import * as React from 'react';
import {Currency} from '../../main/currency';
import {functions} from '../../../helpers/common';
import  '../../../helpers/string';
import {UserContextTypeMap} from '../../../helpers/types';


const usercontexts = Object.keys(UserContextTypeMap);

export class Plans extends React.Component<any, any>{
      constructor(props){
          super(props);
          this.state = {};
          this.contextSwitch = this.contextSwitch.bind(this);
          this.subscribeClick = this.subscribeClick.bind(this);
          this.renderPrice = this.renderPrice.bind(this);
      }
/* 
      public componentWillReceiveProps(nextProps){
          let {selected} = this.props;
          if(selected == null || !selected.usercontext.equals(nextProps.selected.usercontext)){          
              this.setState({selected: {usercontext: nextProps.selected.usercontext}});
          }
      }   
 */
      render(){
          let {subscriptions, user, selected} = this.props;

          const contextSwitch = this.contextSwitch;
                    
          const evalprops = (plan) =>{  
              switch(plan.state){
                  case 'current':
                      return {class: 'border-primary', behavior: <span className="btn btn-primary">
                                                                              <i className="fa fa-check"></i> Active</span>};                
                  case 'upgrade':
                      return { class: '', 
                               behavior: <a href="#" className="btn btn-primary" 
                                            data-planid={plan.id} onClick={this.subscribeClick}>
                                            Upgrade
                                         </a>};
                  case 'disable':
                      return {class: 'disabled', 
                              behavior: ''};
                  case 'free':
                      return {
                          class: 'border-primary'
                          , behavior: ''
                      };
                  case 'free-promotion':
                      return {
                          class: 'border-primary'
                          , behavior: <a href="#" className="btn btn-primary" 
                          data-planid={plan.id} onClick={this.subscribeClick}>
                          Subscribe
                        </a>
                      };
                  case 'enable':
                  default:
                      return {class: '', 
                         behavior: <a href="#" className="btn btn-primary" 
                                      data-planid={plan.id} onClick={this.subscribeClick}>
                                      Subscribe
                                    </a>};
              }
          };
          const planCard = (plan, i) => {
            let props = evalprops(plan);
            let prices = this.renderPrice(plan); 
          //  console.log('plan card....');
            return <div className={'card ' + props.class} key={'card-' + i}>
                   <div className="card-body">
                       <h6>{plan.title}</h6>
                       <p className="card-text">
                           {plan.description}
                       </p>
                        <ul className="card-text">
                            {
                                plan.features.map((feature, i) => {
                                    return <li key={i}>{feature}</li>;
                                })
                            }
                        </ul>
                       <h6 className="display-4 text-center">
                           {prices.map((price, i) => {
                               if(prices.length > 1 && i == 0)
                                 return <span className='strikethrough mr-2 small text-muted' key={i}>{price}</span>;
                                else
                                  return <span key={i}>{price}</span>;
                                  
                           })}
                        </h6>
                        <p className='card-text text-center'>
                        {
                            (plan.expirationdate)  ?                                   
                                    ['Expires On: ',new Date(plan.expirationdate).toDisplay()] : ''
                        }
                        </p>
                        <p className="card-text text-center">
                            {props.behavior}
                        </p>
                   </div>
                </div>;
          }

          let togglecontext = selected ? UserContextTypeMap[usercontexts.filter(usercontext => {
            return !usercontext.equals(selected.usercontext);
          })[0]] : '';
          
          let fSubscriptions = subscriptions ? subscriptions.filter(subscription => {
            return subscription.usercontext.equals(selected.usercontext);
          }) : null;
          
          let subscriptionContent = fSubscriptions && selected ?   user['isregistered' + selected.usercontext.toLowerCase()] ?
                                          fSubscriptions.map(planCard):
                                          <div className="alert alert-warning">
                                          Please complete your 
                                          <a className="alert-link" href={'/auth/profile?usercontext=' + selected.usercontext}>{' ' + functions.translate(selected.usercontext) + ' '} Profile </a> 
                                          before activating your subscription.
                                          </div>                                            
                                   : 'No Subscriptions found.';
    

          return <div className="container">
                    <h5 className="pl-1 pt-3">  
                      {[functions.translate(selected && selected.usercontext ? selected.usercontext : 
                               (user ? user.usercontext : usercontexts[0])), ' Subscriptions']}                      
                        <a  className="mx-1 highlight small" href='#' onClick={contextSwitch} 
                            data-usercontext={togglecontext}>
                            {'Select ' + functions.translate(togglecontext) + ' Subscriptions'}
                        </a>                      
                    </h5>
                     <div className="container">
                       <div className="justify-content-center card-deck">
                        {subscriptionContent}
                       </div>
                     </div>
                </div>;
      }

      contextSwitch(e){
          var t = e.target,
              usercontext = t.dataset.usercontext;
         
          this.props.updateSelected({usercontext: usercontext});

      }

      subscribeClick(e){
          let b = e.target,
              pi = b.dataset.planid,
              {selected} = this.props;

        selected.planid = pi;
        //format subscription to user item 
        this.props.nextStep({selected: selected});
      }

      renderPrice(plan){
          let {cprice, ispromoted, price, state} = plan;
          let formattedprice = price && price != 0 ? 
                <Currency value={price} /> : (/free*/.test(state) ? 'Free': '');
        
          let formattedcprice = cprice && cprice != 0 ? 
             <Currency value={cprice} /> : (/free*/.test(state) ? 'Free': '');

          let prices = [];
          if(ispromoted && cprice < price){
              //display price strikethrough with cprice
              //if cprice == 0 then mark as free else the dollar amount
              prices = [formattedprice, formattedcprice];
          }
          else{
              //display price or
              //mark as free
              prices=[formattedcprice];
          }

          return prices;
                 
      }
}