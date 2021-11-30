import * as React from 'react';
import {BaseComponent} from '../commons/basecomponent';
import {transformSubscriptionDTO} from '../../helpers/transforms';
import {UserContextType} from '../../helpers/types';
import {Currency} from '../main/currency';
import  '../../helpers/date';



export class FeaturedPlans extends BaseComponent{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {subscriptions: []});
        this._bind('renderPrice');
    }

    componentDidMount(){
       this.getResource('settings.subscriptions').then(res =>{
           //console.log(res);
           let subscriptions = JSON.parse(res.data.toString());
           this.setState({
               subscriptions: subscriptions.map(transformSubscriptionDTO)
           });

       });
    }
    render(){
        let {subscriptions} = this.state;
        const sortfn = (a, b) => {
            return a.price - b.price;
        };
      
      let renderSubscriptionSection = (subscription, c, view) =>{
           var pdisplay = this.renderPrice(subscription.ispromoted, 
                                    subscription.price, 
                                    subscription.promotionprice);
/*             if(subscription.price > 0)
              pdisplay = [...pdisplay
                          , '/ ',  functions.toDisplayDuration(subscription.duration)];
 */
           return (view == 'image') ?            
           <img src={c.imageurl} 
           className='img-fluid img-border'
           alt={subscription.usercontext + ' Image'}/> :
           <div>
           <h4 className='mb-0'>
               {subscription.price > 0 ? 
                    'As Low As ' : 'For '
               }
               <span className='h3 highlight'>{pdisplay}</span>
            </h4>
            {subscription.price > 0 && subscription.ispromoted ?
                <span className='text-muted'> 
                 {'Offer ends ' + new Date(subscription.promotionexpireson).toDisplay()} </span>  : ''
            }            
           <ul className={'list-group mt-1 ' + c.type}>
           {c.steps.map((step, i) => {
               //return <li key={i}><img className="img-fluid" src={step} alt={'step ' + (i+1)} /></li>;
               return <li key={i} className="input-group">
                           <div className="input-group-prepend">
                                <span className="input-group-text">{step.head}</span>
                          </div>
                          <div className="form-control">                              
                               <span>
                                    <i className={step.icon}></i>
                                    {step.label}
                               </span>
                         </div>
                     </li>;               
           })}
          </ul>
          </div>; 
      };
      let renderSubscription = (subscription, direction?) => {
          let c = featuredPlanConfig(subscription.usercontext);
           return (
              <div className='card'>
                <div className='card-body'>
                   <div className='row mx-lg-0'>
                   <div className={'col-12 h3 d-md-flex justify-content-' + 
                                    (c.imageposition == 'left' ? 'start' : 'end')}>
                                    {c.title}
                   </div>
                    <div className='col-md-6 mr-lg-2em'>
                       {renderSubscriptionSection(subscription, c, 
                           c.imageposition == 'left' ? 'image' : 'steps')}
                    </div>
                    <div className='col-md-6 ml-lg-2em '>
                    {renderSubscriptionSection(subscription, c, 
                           c.imageposition == 'left' ? 'steps' : 'image')}
                    </div>              
                   </div>
                </div>
              </div>
           );
      };
      let renderFeature = (feature, i) => {
            return <li key={i}>{feature}</li>;
        };

        let featuredEmployeeSubscription = subscriptions ? subscriptions.filter(subscription => {
            return subscription.isfeatured == true && subscription.usercontext == 'Employer';
        }).sort(sortfn) : null;
        let featuredEmployerSubscription = subscriptions ? subscriptions.filter(subscription => {
            return subscription.isfeatured == true && subscription.usercontext == 'Employee';
        }).sort(sortfn) : null;
        return <div className='row mx-lg-0 featured'>
            {featuredEmployerSubscription && featuredEmployerSubscription.length > 0 ? 
                        renderSubscription(featuredEmployerSubscription[0]) : ''}        
            {featuredEmployeeSubscription && featuredEmployeeSubscription.length > 0 ? 
                        renderSubscription(featuredEmployeeSubscription[0]) : ''}
        </div>;
    }

    renderPrice(ispromoted, price, promotionprice) {
        let prices = [];
        let formprice = (price > 0 ? <Currency value={price} /> : 'Free');
        if(ispromoted == true && promotionprice < price){
            let formpprice = (promotionprice > 0 ? 
                         <Currency value={promotionprice} /> : 'Free');
            prices = [<span className='strikethrough small mr-2 text-muted' key={0}>{formprice}</span>, 
                       <span key={1}>{formpprice}</span>]
        }
        else
          prices.push(<span key={0}>{formprice}</span>)
    
        return prices;
    }    
}

function featuredPlanConfig(type) {
   switch(type){
       case 'Employer':
            return {
                 imageurl: '/assets/img/employer.jpg'
               , imageposition: 'right'
               , title: 'Employers'
               //, pricetitletemplate: 'As Low as {price}'
            //    , isteps: [
            //        '/assets/img/icons/1.png'
            //      , '/assets/img/icons/2.png'
            //      , '/assets/img/icons/3.png'
            //      , '/assets/img/icons/4.png'
            //    ]
               , steps:[
                    {icon: 'icon-search', head: '1', label: 'Search Job Seekers Profile'}
                   ,{icon: 'icon-finder', head: '2', label: 'Review Profiles'}
                   ,{icon: 'icon-paypal', head: '3', label: 'Pay & View Contact Information'}
                   ,{icon: 'icon-user-check', head: '4', label: 'Hire Job Seeker'}
               ]
               ,type: 'employer'
            };
        case 'Employee':
           return {
            imageurl: '/assets/img/jobseeker.jpg'
            , imageposition: 'left'
            , title: 'Jobseekers and Contractors'
            //, pricetitletemplate: 'As Low as {price}'
            // , isteps: [
            //     '/assets/img/icons/5.png'
            //    , '/assets/img/icons/6.png'
            //    , '/assets/img/icons/7.png'
            //    , '/assets/img/icons/8.png'
            // ]
            , steps:[
                {icon: 'icon-user-plus', head: '1', label: 'Signup As Job Seeker'}
               ,{icon: 'icon-profile', head: '2', label: 'Complete Your Profile'}
               ,{icon: 'icon-bullhorn', head: '3', label: 'Get Found'}
               ,{icon: 'icon-user-check', head: '4', label: 'Get Hired'}
           ]
           ,type: 'employee'
        
        };
   };
   return null;
}
