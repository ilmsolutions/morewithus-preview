import * as React from 'react';
import {Dropdown} from '../../main/dropdown';
import {CheckboxList} from '../../main/checkboxlist';
import {SelectBox} from '../../main/selectbox';
import {CustomAsyncTypeAhead} from '../../main/customasynctypeahead';
import {TextArea} from '../../main/textarea';

const step1 = (user, InputChange, DropDownChange, props) => {
       return  (
                <div className="form-bottom">
                        <div className="row">
                            <div className="form-group col-sm">
                                <label className="col-2 col-form-label">Email</label>
                                <div className="col-10">
                                    <p className="form-control-static" data-name="email">{user.email}</p>             
                                </div>
                            </div>
                            <div className="form-group col-sm">
                                    <label htmlFor="inputOrganization" id="organizationnameLabel">Organization Name</label>
                                    <input type="text" className="form-control" id="inputOrganization"
                                            placeholder="Organization Name" defaultValue={user.organizationname}
                                            ref="organizationname" name="organizationname" onChange={InputChange} />
                                    <div className="error" id="organizationnameError"></div>
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
                             <input type="tel" className="form-control" id="inputPhoneNumber" 
                                    placeholder="Phone Number"  defaultValue={user.contact.phone}
                                    ref="contact.phone" name="contact.phone" 
                                    onChange={InputChange} required pattern="[0-9]{3}[ |-][0-9]{3}[ |-][0-9]{4}"/>
                             <div className="error" id="contact.phoneError"></div>
                          </div>
                       </div>
                       <div className="row">
                         <div className="form-group col-12">
                           <label htmlFor="inputAddress1" id="mailingAddress.address1Label">
                           Street Address 1 <span className='small text-muted'> (will not be shared with public) </span>
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
                           Street Address 2 <span className='small text-muted'> (will not be shared with public) </span>
                           </label>
                           <input type="text" className="form-control" id="inputAddress2" 
                                  placeholder="Apartment, suite, unit, building, floor, etc." 
                                  ref="mailingAddress.address2" name="mailingAddress.address2" onChange={InputChange}/>
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

   export const employerdefs = (props?) => {
    return  [
              {state: 1, title: 'Who am I?', iconClass: 'fa fa-id-card', 
                         render: step1.bind(this), 
                         props: props
               }
            ];
  }