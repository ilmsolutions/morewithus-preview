import * as React from 'react';
import {functions} from '../../helpers/common';
import {UserContextType, UserType} from '../../helpers/types';


interface IResultsProps extends React.Props<Results>{
   users:[any],
   hidePrivate: Boolean,
   isAuthenticated: Boolean,
   view: String,
   detailid: String,
   getProtectedResource(string): any,
   triggerSwitch(object)
}

export class Results extends React.Component<IResultsProps, any>{

   constructor(props: IResultsProps){
      super(props);
      this.renderBadges = this.renderBadges.bind(this);
      this.renderUserType = this.renderUserType.bind(this);
      this.switchViewHandler = this.switchViewHandler.bind(this);
      this.redirectToAuthorized = this.redirectToAuthorized.bind(this);
      this.renderCard = this.renderCard.bind(this);
      this.renderCardDetails = this.renderCardDetails.bind(this);
      this.renderPrivateInformation = this.renderPrivateInformation.bind(this);
      this.redirectToSubScriptions = this.redirectToSubScriptions.bind(this);
      this.state = Object.assign({}, {users: props.users});
   }
   
   componentWillReceiveProps(nextProps){
        if(!nextProps.hidePrivate && nextProps.isAuthenticated && 
            nextProps.view == 'detail' && nextProps.detailid){
            //get user details and update the users
            //console.log('in component');
            this.props.getProtectedResource('users/' + nextProps.detailid).then(res => {
                var u = JSON.parse(res.data.toString());
                this.setState(state => {
                    state.users = state.users.map(user => {
                        if(user._id == u._id )
                           return Object.assign({}, user, u);
                        return user;
                    });
                    return state;
                });
                
            })
        }
        else{
            this.setState({
                users: nextProps.users 
            });
        }
   }

   render(){
       let {hidePrivate, isAuthenticated, view, detailid} = this.props;
       let {users} = this.state;
       const renderCard = this.renderCard;
       const renderCardDetails = this.renderCardDetails;
       let cards =  users ? (view == 'detail') ? renderCardDetails(users.filter((user) => {
        return user._id == detailid;
       })[0], isAuthenticated, hidePrivate): users.map(renderCard) : '';


       return <div className={view == 'detail' ? 'right' : 'left'} key={view + '-view'}>
                     {cards}
              </div>;      
   }

   renderBadges(badges: [string], opts:any){
    return badges.map(function(badge, i){
       return <span className={"badge " + opts.className} key={i}>{badge}</span>
    });
}

   renderOptionalPropertyBadges(label:string, className:string, badges:[string], opts:any){      
     return (badges != null && badges.length > 0) ? 
        <dl className={className}>
            <dt className={className == 'row' ? 'col-sm-3' : ''}>{label}</dt>
            <dd className={(className == 'row' ? 'col-sm-9': '') }>
                {this.renderBadges(badges, opts)}
            </dd>
        </dl>
        : '';
   }

   renderOptionalProperty(label:string, className:string, value:string){
    return (value) ? <dl className={className}>
           <dt>{label}</dt>
           <dd>{value}</dd>
        </dl>:'';
   }

   renderUserType(userType: UserType){
       let iclass = '';
       switch(userType as UserType){
           case 'Individual':
               iclass = 'fa-user';
               break;
           case 'Organization':
               iclass = 'fa-users';
               break;
       }
       return <i className={'fa ' + iclass}></i>;
   }

   renderPrivateInformation(user, isAuthenticated, hidePrivate){ 
       let cc = (user.usertype == 'Organization' ? 'col-md-4 col-sm-12' : 'col-md-6 col-sm-12'); 
    return (<div className={'card bg-dark text-white private-information ' + (hidePrivate ? 'hide' : 'show')} 
              key={'user-detail-' + user._id} >
            <div className='card-body row'>
                <dl className={cc}>
                    <dt>Email</dt>
                    <dd>{user.email ? user.email : 'xxx@xxx.com'}</dd>
                </dl>
                <dl className={cc}>
                    <dt>Phone</dt>
                    <dd>{user.contact && user.contact.phone ? user.contact.phone : 'xxx-xxx-xxxx'}</dd>
                </dl> 
                {(user.usertype == 'Organization') ?
                        <dl className={cc}>
                        <dt>Website</dt>
                        <dd>{!hidePrivate ? (user.website ? user.website : 'Not specified') : 'https://www.xxxxx.xxx'}</dd>
                        </dl>
                : ''
                }                                      
            </div>
            <div className='card-footer'>
               <button className="btn btn-sm btn-primary" 
                    onClick={isAuthenticated ? this.redirectToSubScriptions :
                                               this.redirectToAuthorized}>
                    {isAuthenticated ? 'Subscribe to view contact information' :
                                       'Signup to view contact information' }
                </button>
            </div>
        </div>
    );         
   }

 renderCard(user, i){
    return <div className='user-card card' key={'user-' + i} data-user-id={user._id}>
    <div className="card-header">
      <small className="pull-right text-muted">
         {                 
          [user.mailingAddress.city + ', ' + 
           user.mailingAddress.state]                   
         } <br key="break" />
         {(user.dist && user.dist.calculated ? functions.toDisplayNumber(Math.round(user.dist.calculated * 10) / 10) + ' miles': '')}
      </small>
      <h5>
          {this.renderUserType(user.usertype)} 
          &nbsp;{functions.toProperCase(user.lastname)}, {functions.toProperCase(user.firstname)}
      </h5>
      <span className="text-muted">{user.organizationname}</span>  
    </div>
     <div className="card-body">        
         <p className="text-truncate">
             {user.description}
         </p>
         <span className="row">
             <dl className="col">
                 <dt>Work Experience</dt>
                 <dd>{user.workExperience ? user.workExperience + ' years' : 'Not specified'}</dd>
             </dl>
             {this.renderOptionalProperty('Education Level', 'col', user.educationLevel)}
             {this.renderOptionalPropertyBadges('Employment Type', 'col', user.employmentTypes, {className: 'badge-secondary'})}
             <dl className="col">
                 <dt>Available Times</dt>
                 <dd>{user.availableTimes != null && user.availableTimes.length > 0 ? this.renderBadges(user.availableTimes, {className: 'badge-warning'}) : 'Not specified'}</dd>
             </dl>              
         </span>
         <dl className="row">
             <dt className="col-sm-3">Looking for jobs in:</dt>
             <dd className="col-sm-9 text-truncate">
                 {this.renderBadges(user.jobTypes.length > 0 ? user.jobTypes : ['Any Job'], {className: 'badge-info'})}
             </dd>   
         </dl> 
         {this.renderOptionalPropertyBadges('Skills', 'row', user.skills, {className: 'badge-secondary text-truncate'})}
         <dl className="row">
             <dt className="col-sm-3">Worked in:</dt>
             <dd className="col-sm-9 text-truncate">
                 {user.workAreas != null && user.workAreas.length > 0 ? this.renderBadges(user.workAreas, {className: 'badge-success'}):'Not specified'}
             </dd>               
         </dl>   
         <a href={'#user-' + user._id} className="btn btn-sm btn-primary pull-right"
            data-view="detail" onClick={this.switchViewHandler}>
            <span>View Details <i className="fa fa-chevron-right"></i></span>
        </a>         
     </div> 
     <div className="card-footer">
         <strong className="float-right">
            Last active: {functions.toProperDate(user.lastlogin)}
         </strong>
     </div>                  
  </div>;

   }

   renderCardDetails(user, isAuthenticated, hidePrivate){

    return <div className='user-card card' key='user-detail' data-name={'user-' + user._id} data-user-id={user._id}>
    <div className="card-header">
      <small className="pull-right text-muted">
        {                 
          [user.mailingAddress.city + ', ' + 
           user.mailingAddress.state]                   
         } <br key="break" />
         {(user.dist && user.dist.calculated ? functions.toDisplayNumber(Math.round(user.dist.calculated * 10) / 10) + ' miles': '')}
      </small>
      <h5>
          {this.renderUserType(user.usertype)} 
          &nbsp;{functions.toProperCase(user.lastname)}, {functions.toProperCase(user.firstname)}
      </h5>
      <span className="text-muted">{user.organizationname}</span>  
    </div>
     <div className="card-body">
         <p className="lead">
             {user.description}
         </p>
         {/* protected information */}
         {this.renderPrivateInformation(user, isAuthenticated, hidePrivate)}
         {/* end of protected information */}         
         <span className="row">
             <dl className="col">
                 <dt>Work Experience</dt>
                 <dd>{user.workExperience ? user.workExperience + ' years' : 'Not specified'}</dd>
             </dl>
             {(user.usertype != 'Organization') ?
             <dl className="col">
             <dt>Education Level</dt>
                 <dd>{user.educationLevel != null && user.educationLevel ? user.educationLevel : 'Not specified'}</dd>                                 
             </dl>
            : ''} 
            {(user.usertype != 'Organization') ?
             <dl className="col">
             <dt>Employment Type</dt>
                 <dd>{user.employmentTypes != null && user.employmentTypes.length > 0 ? this.renderBadges(user.employmentTypes, {className: 'badge-secondary'}) : 'Not specified'}</dd>                                 
             </dl>
             : ''}
           
             <dl className="col">
                 <dt>Available Times</dt>
                 <dd>{user.availableTimes != null && user.availableTimes.length > 0 ? this.renderBadges(user.availableTimes, {className: 'badge-warning'}) : 'Not specified'}</dd>
             </dl>
                       
         </span>
         <dl className="row">
             <dt className="col-sm-3">Looking for jobs in:</dt>
             <dd className="col-sm-9">
                 {this.renderBadges(user.jobTypes.length > 0 ? user.jobTypes : ['Any Job'], {className: 'badge-info'})}
             </dd>                                               
         </dl>    
         {this.renderOptionalPropertyBadges('Skills', 'row', user.skills, {className: 'badge-secondary'})}
         <dl className="row">
             <dt className="col-sm-3">Worked in:</dt>
             <dd className="col-sm-9">
                 {user.workAreas != null && user.workAreas.length > 0 ? this.renderBadges(user.workAreas, {className: 'badge-success'}):'Not specified'}
             </dd>                
         </dl>
         {this.renderOptionalPropertyBadges('Awards:', 'row', user.awards, {className: 'badge-warning'})}
         {this.renderOptionalPropertyBadges('Certificates/ Licenses:', 'row', user.certifications, {className: 'badge-warning'})}                               
         {user.hasReferences ? <span className="card-text">
                                  <i className="fa fa-check-square mr-2"></i>
                                  References available on request
                               </span> : null}
     </div> 
     <div className="card-footer">
         <strong className="float-right">
            Last active: {functions.toProperDate(user.lastlogin)}
         </strong>
     </div>                  
  </div>;

   }

   switchViewHandler(e){
      var target = e.target.tagName.toLowerCase() == 'a' ? e.target : e.target.parentNode,          
          view = target.dataset.view,
          detailid = (view == 'detail') ? target.getAttribute('href').replace('#user-', '') : '';
      this.props.triggerSwitch({view: view, detailid: detailid});
   }
   
   redirectToAuthorized(e){
      e.stopPropagation();
      var st = window.location.href.indexOf(window.location.pathname);
      console.log(st);
      var redirecturl = '/auth' + window.location.href.substring(st);
      window.location.href = redirecturl;
   }

   redirectToSubScriptions(e){
       e.stopPropagation();
       var redirecturl = '/auth/profile/subscriptions?usercontext=employer';
       window.location.href = redirecturl;

   }
}