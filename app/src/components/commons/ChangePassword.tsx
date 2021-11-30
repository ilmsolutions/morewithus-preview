import * as React from 'react';
import * as axios from 'axios';
import {Validate} from '../commons/validatecomponent';

export class ChangePassword extends Validate{

    constructor(props: any){
        super(props);
        //console.log(props);
        this.state = Object.assign({}, {status: props.location.query.status,
                                        message: props.location.query.message});        
        this._bind('handleInputChange', 'onSubmit');        
    } 
    
    render(){
        let {status, message} = this.state;
        const InputChange = this.handleInputChange;
        //console.log(status);
        let renderStatus = status != null ? () => {
              return <span className={'alert alert-' + (status == 'true' ? 'success' : 'danger') }>
                       {message}
                     </span>;
        } : null;
        return <div className="container">
                   <h5 className="pl-3 pt-3">
                       Change Password
                   </h5>
                   <div className="container form-box d-flex flex-column">
                   <form name="change-password-form" role="form" action="" method="post" className="validate-form change-password-form" noValidate>
                    <fieldset className="form pt-3 col-12">                
                        <div className="form-group col-lg-6">
                            <label htmlFor="currentPassword" id="currentPasswordLabel">Current Password</label>
                            <input type="password" className="form-control" 
                                name="currentPassword" placeholder="Current Password"
                                ref="currentPassword"
                                onChange={InputChange} required/>
                            <div className="error" id="currentPasswordError"></div>
                        </div>      
                        <div className="form-group col-lg-6">
                            <label htmlFor="password" id="passwordLabel">New Password</label>
                            <input type="password" className="form-control" 
                                name="password" placeholder="New Password"
                                ref="password"
                                onChange={InputChange} required/>
                            <div className="error" id="passwordError"></div>
                        </div>                            
                        <div className="form-group col-lg-6">
                            <label htmlFor="passwordConfirm" id="passwordConfirmLabel">Confirm Password</label>
                            <input type="password" className="form-control" 
                                name="passwordConfirm" placeholder="Confirm Password"
                                ref="passwordConfirm"
                                onChange={InputChange} required/>
                            <div className="error" id="passwordConfirmError"></div>
                        </div> 
                        <div className="form-group col-lg-6">
                            <button className="btn btn-primary"  onClick={this.onSubmit} 
                                    type="submit">Submit</button>
                        </div>                        
                        <div className="form-group col-lg-6">
                              {renderStatus && renderStatus()}
                        </div>
                    </fieldset> 
                    </form>
                   </div>                    
               </div>;
    }

    handleInputChange(event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
    
        if(this.validateChange){
           this.validateChange(target.type ? target.type : 'input', event.target.name);
        }
      }

    onSubmit(event){
        event.stopPropagation();  
        if(!this.showFormErrors())
          return false;
        return true;
    }
        
}
