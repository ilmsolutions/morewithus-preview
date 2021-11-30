import * as React from 'react';
import * as update from 'immutability-helper';
import { CSSTransition } from 'react-transition-group';
import {Validate} from '../commons/validatecomponent';
import {functions} from '../../helpers/common';
import {UserContextType, UserType} from '../../helpers/types';
import {userdefs} from './steps/employeeusersteps';
import {organizationdefs} from './steps/employeeorganizationsteps';


export class ProfileEmployee extends Validate{
   statedefs;


   componentDidMount(){

   
   }

   constructor(props){
         super(props);
         this.state = Object.assign({}, props.user);
         this._bind('handleInputChange', 'customState');
         let commondefs = {
                    getResource: this.props.getResource, 
                    stateRef: (el) => this.refs["mailingAddress.state"] = el
                    , mileRef: (el) => this.refs["jobsWithinMiles"] = el
                    , availableTimesRef: (el) => this.refs["availableTimes"] = el
                    , jobTypesRef: (el) => this.refs["jobTypes"] = el
                    , workExperienceRef: (el) => this.refs["workExperience"] = el
                    , descriptionRef: (el) => this.refs["description"] = el
                    , workAreasRef: (el) => this.refs["workAreas"] = el
                    , certificationsRef: (el) => this.refs["certifications"] = el
                    , skillsRef: (el) => this.refs["skills"] = el
                    , awardsRef: (el) => this.refs["awards"] = el
                    , keywordsRef: (el) => this.refs["keywords"] = el
         };
        switch (this.state.usertype as UserType){
            case 'Individual':
                this.statedefs = userdefs.call(this, Object.assign({}, commondefs, {        
                                     ageRef: (el) => this.refs["ageRange"] = el
                                     , employmentTypesRef: (el) => this.refs["employmentTypes"] = el 
                                     , edlRef: (el) => this.refs["educationLevel"] = el                                                                         
                }));
                break;
            case 'Organization':
                this.statedefs = organizationdefs.call(this,  Object.assign({}, commondefs));
                break;
          }         
     }


     render(){
        const {user, nextStepLabel} = this.props;
        const statedefs = this.statedefs;
        let onClick = (e) => this.saveContinue(e);
        let onPrevious = (e) => this.previous(e);
        let currentStep = (step) =>  (step == (this.props.step - 2));
        let prevStep = (step) => (step < (this.props.step- 2));
        let next = <button className="btn btn-primary pull-right" onClick={onClick} type="submit">{nextStepLabel}</button>;
        let prev = null;
        if(this.props.step - 2 > 1) {
          prev = <button className="btn btn-secondary pull-left" onClick={onPrevious} type="submit">Previous</button>;        
        }
        let inputChange = this.handleInputChange;
        let dropDownChange = this.dropDownOnChange.bind(this);
    
        let renderStep = (step) => {
            let d = statedefs[step - 1];       
            if(!d)
              return <fieldset key={"fieldset-" + step}></fieldset>;
                   
            return  <fieldset key={"fieldset-" + step}>
                 <div className="form-top">
                     <div className="form-top-left">
                           <h4>{d.title}</h4>
                     </div>
                     <div className="form-top-right">
                           <i className={d.iconClass}></i>
                    </div>                  
                 </div>        
                {d.render(user, inputChange, dropDownChange, d.props)}
                <div className="form-group">
                   <div className="clearfix col-12">
                     {prev}{next}
                   </div>
                </div>
             </fieldset>;
        };
        let progressbars = statedefs.map(function(d, i){
            return <li key={i} className={prevStep(d.state) || currentStep(d.state) ? 'active' : ''}>{d.title}</li>
        });


        return  (
      <div className="container employee form-box d-flex flex-column">           
              <ul id="progressbar">
                  {progressbars}
			  </ul>

              <form role="form" action="" method="post" className="form validate-form registration-form" noValidate>
                  <CSSTransition
                      classNames="step"
                           timeout={{ enter: 500, exit: 300 }}>
                  {renderStep(this.props.step - 2)}
                  </CSSTransition>
                  {this.renderstatus(this.props.status, this.props.message)}
              </form>


       </div>
      );
     
     } /*end render */


   dropDownOnChange = function(change){
        //console.log(change);
        this.customState(change.name, change.newValue);

        if(this.validateChange){
            this.validateChange(change.type ? change.type : 'select', change.name);
        }
    }


 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.customState(name, value);

    if(this.validateChange){
            this.validateChange(target.type ? target.type : 'input', event.target.name);
    }
  }

   customState(name, value){
      const namefields = name.split('.');
      if(namefields.length > 1){              
          this.setState((state) => {
             return (state[namefields[0]]) ?
                            update(state, {[namefields[0]] : 
                                                    {[namefields[1]]: {$set: value}}}) :
                            Object.assign({}, state, {
                                [namefields[0]]:{
                                    [namefields[1]]: value 
                                }
                            });
          });          
      }
      else{
          this.setState({
              [name] : value
          });
      }
   }

   saveContinue(e){
        e.preventDefault();
        var target = e.target,
            parent = functions.findAncestor(target, 'validate-form');

    if(!this.showFormErrors(parent)){

    }
    else
      this.props.nextStep(this.state);
    
     return true;
   }

   previous(e){
      e.preventDefault();
      this.props.previousStep();
      return true;
   }

  renderstatus(status, message){
     if(status == true)
        return;
      return (                 
          <div className="form-group col-12 has-danger">
              <div className="form-control-label text-center">
                  {message}   
              </div>
         </div> 
      ) ;                
   }
 }



