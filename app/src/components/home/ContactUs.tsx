import * as React from 'react';
import {Validate} from '../commons/validatecomponent';
import {functions} from '../../helpers/common';
import {GoogleRecaptcha} from '../main/googlerecaptcha';

const recaptchaOpts = {
  //  "key": "6Le6J0EUAAAAAFDhajRRyfw6qNliQ283-McKmW5_"
  key: '6Le6J0EUAAAAAFDhajRRyfw6qNliQ283-McKmW5_' //testing
};


export class ContactUs extends Validate {
    recaptcha;

    getInitialState(){
        return {
            isvalid: false
            ,name: ''
            ,email: ''
            ,phone: ''
            ,message:''
        };
    }
    constructor(props: any){
        super(props);
        this._bind('customState', 'handleSubmitClick', 'getInitialState'
                   , 'onResolved'
                  , 'handleInputChange', 'checkFormValidity');
        this.state = Object.assign({}, this.getInitialState());
    }

    componentDidMount(){

    }

    render(){
        let {size} = this.props;
        let {isvalid, name, email, phone, message} = this.state;
        let inputSizeClass = size ? 'input-group-' + size : '';      
        let formControlSizeClass = size ? 'form-control-' + size : '';  
        let btnSizeClass = size ? 'btn-' + size  : '';
        

        size = size ? size : 'lg';

        return (
         <form role="form" action="" method="post" 
            className={"validate-form form-" + size} noValidate>
           <div className="form-group form-group-sm form-row mb-0">
            <div className="mb-2 col-8 col-md-7">
                <label className="sr-only" htmlFor="Inputname" id="nameLabel">Name</label>
                <input type="text" 
                    onChange={this.handleInputChange} ref="name"
                    name="name" id="Inputname" value={name}
                    className={"form-control " + formControlSizeClass}                     
                    placeholder="Name" required/>
                <div className="error" id="nameError"></div>                    
            </div>    
            </div>
            <div className="form-group form-group-sm form-row mb-0">                   
            <div className="mb-2 col-auto">
            <label className="sr-only" htmlFor="Inputemail" id="emailLabel">Username</label>
            <div className={"input-group " + inputSizeClass}>
                <div className="input-group-prepend">
                  <i className="input-group-text fa fa-envelope"></i>
                </div>
                <input type="email" className="form-control" 
                       onChange={this.handleInputChange} ref="email"
                       name="email" id="Inputemail" value={email}
                       placeholder="Email" required/>
                <div className="error" id="emailError"></div>   
            </div>
            </div>  
            <div className="mb-2 col-auto">
            <label className="sr-only" htmlFor="Inputphone" id="phoneLabel">Phone</label>
            <div className={"input-group " + inputSizeClass}>
                <div className="input-group-prepend">
                  <i className="input-group-text fa fa-phone"></i>
                </div>
                <input type="tel" className="form-control" 
                       onChange={this.handleInputChange} ref="phone"
                       name="phone" id="Inputphone" value={phone}
                       placeholder="Phone" />
                <div className="error" id="phoneError"></div>   
            </div>
            </div> 
            </div>
            <div className="form-group form-group-sm form-row">
            <div className="mb-2 col-8 col-md-7">
              <label className="sr-only" htmlFor="Inputmessage" id="messageLabel">Message</label>
              <textarea className={"form-control " + formControlSizeClass}
                        onChange={this.handleInputChange} ref="message"
                        name="message" id="Inputmessage" value={message}
                        placeholder="Message" required></textarea>
              <div className="error" id="messageError"></div>   
            </div> 
            <div className="mb-2 col-2 d-flex">         
              <button type="submit" name="_submit"
                      onClick={this.handleSubmitClick}
                      className={"align-self-end btn btn-primary " + btnSizeClass}
                      disabled={!isvalid}
                      >Submit</button>   
{    isvalid ?           <GoogleRecaptcha id="contact-us" 
                 ref={(ref) => {this.recaptcha = ref; }}                
                 sitekey={recaptchaOpts.key}
                 onResolved={this.onResolved}
                 /> : ''
 }            </div>                         
           </div>        
           
         </form>
        );
    }


    customState(name, value){
        this.setState(state =>{
            return Object.assign(state, {[name]: value});
        });
     }
    

  //----change handlers
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : 
                        target.type === 'number' ? parseInt(target.value) : target.value;
    const name = target.name;
    //console.log(name + ' ' + value);
    //console.log(this.state);
    this.customState(name, value);
    this.checkFormValidity(event);
  }

  checkFormValidity(event){
    var target = event.target,
        parent = functions.findAncestor(target, 'validate-form');
    
    var valid = this.showFormErrors(parent);
    
    this.setState({
        isvalid: valid
    });
  }

  handleSubmitClick(event){
    event.preventDefault();
    //console.log(this.recaptcha);
    this.recaptcha.execute();
    return true;
  }

  onResolved(token){
      //console.log('on resolved.....');
      //var res = this.recaptcha.getResponse();
      var data = Object.assign({}, this.state, {recaptcha: token});
      //console.log(token);
      this.postResource('notifications.contact us', data).then(res => {
        this.setState(this.getInitialState());
     });
      //console.log(this.recaptcha.getResponse());
  }

}