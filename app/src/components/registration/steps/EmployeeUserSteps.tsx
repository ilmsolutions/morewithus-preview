import * as React from 'react';
import {Dropdown} from '../../main/dropdown';
import {CheckboxList} from '../../main/checkboxlist';
import {SelectBox} from '../../main/selectbox';
import {CustomAsyncTypeAhead} from '../../main/customasynctypeahead';
import {TextArea} from '../../main/textarea';
import {transformSettings} from '../../../helpers/transforms';


const step1 = (user, InputChange, DropDownChange, props) => {
       return  (
                <div className="form-bottom">
                       <div className="form-group row">
                           <label className="col-2 col-form-label">Email</label>
                           <div className="col-10">
                              <p className="form-control-static" data-name="email">{user.email}</p>             
                           </div>
                       </div>
                       <div className="row">                           
                          <div className="form-group col-sm">
                             <label htmlFor="inputFirstName" id="firstnameLabel">First Name</label>
                                <input type="text" className="form-control" id="inputFirstName" 
                                       placeholder="First Name" defaultValue={user.firstname} 
                                       ref="firstname" name="firstname" onChange={InputChange} required/>
                                <div className="error" id="firstnameError"></div>
                          </div>
                          <div className="form-group col-sm">
                             <label htmlFor="inputLastName" id="lastnameLabel">Last Name</label>
                             <input type="text" className="form-control" id="inputLastName" 
                                    placeholder="Last Name" defaultValue={user.lastname} 
                                    ref="lastname" name="lastname" onChange={InputChange} required/>
                              <div className="error" id="lastnameError"></div>                                    
                          </div>
                       </div>
                       <div className="row">
                          <div className="form-group col-sm">
                             <label htmlFor="inputPhoneNumber" id="contact.phoneLabel">Phone Number</label>
                             <input type="tel" inputmode="tel" className="form-control" id="inputPhoneNumber" 
                                    placeholder="Phone Number"  defaultValue={user.contact.phone}
                                    ref="contact.phone" name="contact.phone" 
                                    onChange={InputChange} required pattern="[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}"/>
                             <div className="error" id="contact.phoneError"></div>
                          </div>
                          <div className="form-group col-sm">
                             <label htmlFor="selectAge" id="ageRangeLabel">Age</label>
                             <Dropdown id="selectAge" name="ageRange" labelField="label" valueField="value" 
                                       value = {user.ageRange} inputRef={props.ageRef}
                                       defaultOption="Select age range"
                                       getResource={() => {return props.getResource('data.age');}}
                                       onChange={DropDownChange} required>
                             </Dropdown>
                             <div className="error" id="ageRangeError"></div>
                          </div>
                       </div>
                       <div className="row">
                         <div className="form-group col-12">
                           <label htmlFor="inputAddress1" id="mailingAddress.address1Label">
                            Street Address 1<span className='small text-muted'> (will not be shared with public) </span>
                           </label>
                           <input type="text" className="form-control" id="inputAddress1" 
                                  placeholder="Street address, P O box, company name" 
                                  defaultValue={user.mailingAddress.address1}
                                  ref="mailingAddress.address1" name="mailingAddress.address1" onChange={InputChange} required/>
                           <div className="error" id="mailingAddress.address1Error"></div>                                  
                         </div>
                       </div>
                       <div className="row">
                         <div className="form-group col-12">
                           <label htmlFor="inputAddress2" id="mailingAddress.address2Label">
                           Street Address 2<span className='small text-muted'> (will not be shared with public) </span>
                           </label>
                           <input type="text" className="form-control" id="inputAddress2" 
                                  placeholder="Apartment, suite, unit, building, floor, etc." 
                                  ref="mailingAddress.address2" name="mailingAddress.address2" onChange={InputChange}/>
                          <div className="error" id="mailingAddress.address2Error"></div>
                         </div>
                       </div>

                       <div className="row">
                         <div className="form-group col-sm">
                            <label htmlFor="inputCity" id="mailingAddress.cityLabel">City</label>
                            <input type="text" className="form-control" id="inputCity" placeholder="City" 
                                   defaultValue = {user.mailingAddress.city}
                                   ref="mailingAddress.city" name="mailingAddress.city"  onChange={InputChange} required/>
                            <div className="error" id="mailingAddress.cityError"></div>
                         </div>
                         <div className="form-group col-sm">
                           <label htmlFor="selectState" id="mailingAddress.stateLabel">State</label>
                           <Dropdown id="selectState" name="mailingAddress.state" value={user.mailingAddress.state} 
                                     defaultOption="Select State" inputRef={props.stateRef}
                                     labelField="name" valueField="abbreviation" 
                                 onChange={DropDownChange} 
                                 getResource={() => {return props.getResource('data.states.us');}}
                                 required></Dropdown>
                            <div className="error" id="mailingAddress.stateError"></div>
                         </div>
                       </div>

                       <div className="row">
                         <div className="form-group col-sm">
                            <label htmlFor="inputZipCode" id="mailingAddress.zipcodeLabel">Zip Code</label>
                            <input type="text" className="form-control" id="inputZipCode" placeholder="Zip Code" 
                                   defaultValue = {user.mailingAddress.zipcode}
                                   ref="mailingAddress.zipcode" name="mailingAddress.zipcode"  
                                   onChange={InputChange} required/>
                            <div className="error" id="mailingAddress.zipcodeError"></div>                                   
                         </div>
                       </div>

             </div>
       );
   }


const step2 = (user, InputChange, DropDownChange, props) =>{
        return (
          <div className="form-bottom">
            <div className="row">
                          <div className="form-group col-sm">
                             <label htmlFor="selectJobsWithinMiles" id="jobsWithinMilesLabel">Jobs within</label>
                             <Dropdown id="selectJobsWithinMiles" name="jobsWithinMiles" labelField="label" valueField="value" 
                                       value = {user.jobsWithinMiles} inputRef={props.mileRef}
                                       defaultOption="Select mile radius"
                                       getResource={() => {return props.getResource('data.miles');}}
                                       onChange={DropDownChange} required>
                             </Dropdown>
                             <div className="error" id="jobsWithinMilesError"></div>
                          </div>              
            </div>
            <div className="row">
              <div className="form-group col-sm">
              <label htmlFor="inputGroupEmploymentTypes" id="employmentTypesLabel">Employment Type</label>
              <CheckboxList id="inputGroupEmploymentTypes" name="employmentTypes"
                            labelField="label" valueField="value"
                            values = {user.employmentTypes} inputRef={props.employmentTypesRef}                            
                            getResource={() => {return props.getResource('data.employmenttypes');}}
                            onChange={DropDownChange} required></CheckboxList>
              <div className="error" id="employmentTypesError"></div>
              </div>
            </div>
            <div className="row">
             <div className="form-group col-sm">
              <label htmlFor="inputGroupAvailableTimes" id="availableTimesLabel">Availability</label>
              <CheckboxList id="inputGroupAvailableTimes" name="availableTimes"
                            labelField="label" valueField="value" checkAllValue="Anytime"
                            values = {user.availableTimes} inputRef={props.availableTimesRef}                            
                            getResource={() => {return props.getResource('data.availabletimes');}}
                            onChange={DropDownChange} required></CheckboxList>
              <div className="error" id="availableTimesError"></div>                 
             </div>
            </div>
            <div className="row">
               <div className="form-group col-sm">
                  <label htmlFor="inputGroupJobTypes" id="jobTypesLabel">Job Interested In</label>
                  <SelectBox id="inputGroupJobTypes" name="jobTypes"
                            labelField="label" valueField="value" defaultOption="All Jobs"
                            values = {user.jobTypes} inputRef={props.jobTypesRef}
                            getResource={() => {return props.getResource('settings.jobtypes',{
                              transformResponse:[transformSettings]
                            });}}
                            onChange={DropDownChange}></SelectBox>                  
                  <div className="error" id="jobTypesError"></div>
              </div>
            </div>
          </div>

           
       );  
}

const step3 = (user, handleInputChange, DropDownChange, props) => {
       return (
          <div className="form-bottom">
            <div className="row">
                  <div className="form-group col-sm">
                      <label htmlFor="selectWorkExperience" id="workExperienceLabel">Work/Business Experience</label>
                      <Dropdown id="selectWorkExperience" name="workExperience" labelField="label" valueField="value" 
                                key="workExperience"
                                value = {user.workExperience} inputRef={props.workExperienceRef}
                                defaultOption="Select number of years" 
                                getResource={() => {return props.getResource('data.workexperience');}}
                                onChange={DropDownChange} required>
                      </Dropdown>
                      <div className="error" id="workExperienceError"></div>
                  </div>     
                  <div className="form-group col-sm">
                      <label htmlFor="selectEducationLevel" id="educationLevelLabel">Education Level</label>
                      <Dropdown id="selectEducationLevel" name="educationLevel" labelField="label" valueField="value" 
                                value = {user.educationLevel} inputRef={props.edlRef}
                                defaultOption="Select Education Level" 
                                getResource={() => {return props.getResource('data.educationlevel');}}
                                onChange={DropDownChange} required>
                      </Dropdown>
                      <div className="error" id="educationLevelError"></div>
                  </div>   
            </div>
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="selectWorkAreas" id="workAreasLabel">Areas worked in</label>
                 <CustomAsyncTypeAhead id="typeAheadWorkAreas" name="workAreas" 
                    selected = {user.workAreas} inputRef={props.workAreasRef}
                    allowNew={true} multiple={true} minLength={2} 
                    defaultOption="Add Area" 
                    getResource={() => {return props.getResource('typeaheads.workareas');}}
                    onChange={DropDownChange} required>
                </CustomAsyncTypeAhead>
                <div className="error" id="workAreasError"></div>
               </div>
            </div>
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="selectSkills" id="skillsLabel">Skills</label>
                 <CustomAsyncTypeAhead id="typeAheadSkills" name="skills" 
                    selected = {user.skills} inputRef={props.skillsRef}
                    allowNew={true} multiple={true} minLength={2} 
                    defaultOption="Add Skill" 
                    getResource={() => {return props.getResource('typeaheads.skills');}}
                    onChange={DropDownChange}>
                </CustomAsyncTypeAhead>
                <div className="error" id="skillsError"></div>
               </div>
            </div>            
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="textDescription" id="descriptionLabel">Profile Description</label>
                 <TextArea id="textAreaDescription" name="description"
                     defaultMessage="Type description upto 700 characters long."
                     value={user.description} inputRef={props.descriptionRef}
                     onChange={handleInputChange}
                     maxlength={700} rows={5} required>
                 </TextArea>
                 <div className="error" id="descriptionError"></div>
               </div>
            </div>
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="selectCertifications" id="certificationsLabel">Certifications/ Licenses</label>
                 <CustomAsyncTypeAhead id="typeAheadCertifications" name="certifications" 
                    selected = {user.certifications} inputRef={props.certificationsRef}
                    allowNew={true} multiple={true} minLength={2} 
                    defaultOption="Add Certifications" 
                    getResource={() => {return props.getResource('typeaheads.certifications');}}
                    onChange={DropDownChange}>
                </CustomAsyncTypeAhead>
                <div className="error" id="certificationsError"></div>
               </div>
            </div> 
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="selectAwards" id="awardsLabel">Awards/ Achievements</label>
                 <CustomAsyncTypeAhead id="typeAheadAwards" name="awards" 
                    selected = {user.awards} inputRef={props.awardsRef}
                    allowNew={true} multiple={true} minLength={2} 
                    defaultOption="Add Awards/ Achievements" 
                    getResource={() => {return props.getResource('typeaheads.awards');}}
                    onChange={DropDownChange}>
                </CustomAsyncTypeAhead>
                <div className="error" id="awardsError"></div>
               </div>
            </div>      
            <div className="row">
               <div className="form-group col-sm">
                 <label htmlFor="selectKeywords" id="keywordsLabel">
                    Keywords for job interests 
                    <span className='small text-muted'> (e.g. store; restaurant)</span>
                 </label>
                 <CustomAsyncTypeAhead id="typeAheadkeywords" name="keywords" 
                    selected = {user.keywords} inputRef={props.keywordsRef}
                    allowNew={true} multiple={true} minLength={2} 
                    defaultOption="Add Keywords" 
                    getResource={() => {return props.getResource('typeaheads.keywords');}}
                    onChange={DropDownChange} required>
                </CustomAsyncTypeAhead>
                <div className="error" id="keywordsError"></div>
               </div>
            </div>     
            <div className="row">
              <div className='col-sm'>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="checkReferences"
                          name="hasReferences" ref="hasReferences" onChange={handleInputChange}
                          defaultChecked={user.hasReferences}/>
                
                <label htmlFor="checkReferences" className="custom-control-label" id="hasReferencesLabel">
                References available on request
                </label>                  
                </div>
               </div>
            </div>                                         
        </div>
       );
   }


export const userdefs = (props?) => {
  return  [
            {state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card', 
                       render: step1.bind(this), 
                       props: props
             },
            {state: 2, title: 'What am I looking for?', iconClass: 'fa fa-bullseye', render: step2.bind(this), props: props},
            {state: 3, title: 'Why hire me?', iconClass: 'fa fa-bullhorn', render: step3.bind(this), props: props}
        ];
}
