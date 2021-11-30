import * as React from 'react';
import axios from 'axios';
import {UserContextType, UserContextTypeMap, UserType} from '../../helpers/types';
import {Library} from '../../helpers/library';
import {functions} from '../../helpers/common';
import {DecisionBranch} from '../registration/decisionbranch';
import {AuthBaseComponent} from '../commons/authbasecomponent';
import {ProfileEmployee} from './profileemployee';
import {ProfileEmployer} from './profileemployer';

type DecisionBranchUserContext = new () => DecisionBranch<UserContextType>;
const DecisionBranchUserContext =  DecisionBranch as DecisionBranchUserContext;

type DecisionBranchUserType = new () => DecisionBranch<UserType>;
const DecisionBranchUserType = DecisionBranch as DecisionBranchUserType;

const beginStep = 3;


export class Main extends AuthBaseComponent {

   componentWillMount(){

   }

   componentDidMount(){
    //axios.get('/api/auth/external/authorization/user')
       let {location} = this.props;
       let usercontext = location && location.query ? location.query.usercontext : null;

       this.getResource('user')
           .then(res => {
                var user = JSON.parse(res.data.toString());
                //override value for usercontext from querystring to show the appropriate profile page
                if(usercontext) user.usercontext = UserContextTypeMap[usercontext]; 
                var step = (user.usercontext) ? ((user.usertype) ? beginStep : 2) : 1;
                
                this.setState({
                    status: true,
                    message:'',
                    step: step,
                    user: Object.assign({}, user)
                });
            });  
   }

   getInitialState(){
       return {
           status: true,
           message:'',
           step: 1,
           user:{}
       }
   }

    constructor(props: any){
       super(props);
       this.state = Object.assign({}, this.getInitialState());
       this._bind('nextStep', 'previousStep', 'finishEmployeeStep', 
                  'finishEmployerStep', 'submitData', 'switchClick');
   }

   render(){
       //console.log(this.state);
       const {status, message, step, user} = this.state;
       let mprops =  Object.assign({}, {status: status, message: message, step: step, 
                                        nextStep: this.nextStep, previousStep: this.previousStep, nextStepLabel: 'Next',
                                        getResource: this.getResource});
       let props;
       let contextProps = this.getContextProps(user.usercontext);
       let Profile;
       if(contextProps.finish == step)
        {
            mprops = Object.assign({}, mprops, 
                                   {nextStep: contextProps.finishCb, nextStepLabel:'Finish'});
        }
       const renderComponent = () => {
            switch(step){
                case 1 :
                    //employer or employee                
                    props = Object.assign({}, {
                                    fieldname: 'usercontext',
                                    decision: Library.MSG_DECISION_CONTEXT,
                                    choices: [{type: 'Employee', label: Library.MSG_ASSERT_EMPLOYEE}, 
                                            {type: 'Employer', label: Library.MSG_ASSERT_EMPLOYER}]
                                }, mprops);
                    return <DecisionBranchUserContext {...props}></DecisionBranchUserContext>;
                case 2 :
                props = Object.assign({}, {
                                fieldname: 'usertype',
                                decision: Library.MSG_DECISION_ACCOUNTTYPE,
                                choices:[{type: 'Individual', label: 'Individual'},
                                            {type: 'Organization', label: 'Business'}]
                }, mprops);
                return <DecisionBranchUserType {...props}></DecisionBranchUserType>;
                //organization or individual          
                case 3 : //registration - step 1
                case 4: //registration - step 2
                Profile = contextProps.profile;
                return <Profile user={...user} {...mprops} />;
                case 5: //success /finish
                Profile = contextProps.profile;
                return <Profile user={...user} {...mprops} />;
            }
            return <div></div>; 
       };

       return (
           <div>
             <h5 className="pl-5 pt-3">
               {functions.translate(user.usercontext) + ' Profile '}
                <a className='highlight small' href="#" onClick={this.switchClick} 
                    data-switch-type={contextProps.switch}>
                {'Select ' + functions.translate(contextProps.switch) + ' Profile'}
                </a>
             </h5>            
            {renderComponent()}
          </div>
       );
   }

   nextStep(data) {
       var step = (this.state.step < 5) ? this.state.step + 1 : beginStep //finish step default to 3
       if(data){
          this.submitData(data, step);        
       }   
       else   
       this.setState({
         step : step
      });
   }

finishEmployeeStep(data){
    if(data){
        data = Object.assign({}, data, {isregisteredemployee: true, isregisteredemployer: true});
        this.submitData(data, beginStep, function(){
            //response redirect to page
            window.scrollTo(0, 0);            
            
            if(data.usertype == 'Organization'){
               window.location.href = '/auth/profile/subscriptions?usercontext=Employee';
            }
            else
              window.sweetalert(Library.MSG_REGISTER_COMPLETE);
            //console.log('you are registered!');
        });
    }
}

finishEmployerStep(data){
    if(data){
        data = Object.assign({}, data, {isregisteredemployer: true});        
        this.submitData(data, beginStep, function(){
            //response redirect to page
            //window.sweetalert('You are registered! Have your resume ready.');
            //console.log('you are registered!');
            window.scrollTo(0, 0);
            //navigate to subscriptions
            window.location.href = '/auth/profile/subscriptions?usercontext=Employer';
        });
    }

}

submitData(data, step, cb?){
  let self = this;

  return function(){
        //save data
            axios.post('/api/auth/external/authorization/user', data)
            .then(res =>{
              //  console.log(res);
                self.setState(state => ({
                              status: true, message: '',
                              user: Object.assign({}, state.user, data),
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
// Same as nextStep, but decrementing
previousStep() {
  this.setState({
    step : this.state.step - 1
  });
}

switchClick(e){
    e.stopPropagation();        
    var target = e.target,            
        data = {usercontext: target.dataset.switchType};
    this.submitData(data, beginStep);
}

getContextProps(usercontext: UserContextType){
   switch(usercontext as UserContextType){
       case 'Employer':
           return {
               switch: "Employee",
               profile: ProfileEmployer,
               finish: 3,
               finishCb: this.finishEmployerStep
           };
       case 'Employee':
       default:
           return {
               switch: "Employer",
               profile: ProfileEmployee,
               finish: 5,
               finishCb: this.finishEmployeeStep
           };
   };
}


}