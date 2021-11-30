import * as React from 'react';
import {functions} from '../../helpers/common';
import {Library} from '../../helpers/library';
import {BaseComponent} from './basecomponent';


export class Validate extends BaseComponent{
    refs:{
        input: (HTMLInputElement);
        select: (HTMLSelectElement);
        textarea: (HTMLTextAreaElement);
        button: (HTMLButtonElement);
        [key:string]:(Element);
       
    }   

   constructor(props){
       super(props);
   }


validateChange(type, refName){
    //console.log('am coming thru in validate change ' + type + ' ' + refName);
     switch(type){
         case 'checkboxlist':
         case 'selectboxlist':
             return this.showCheckBoxListError(refName);
         case 'inputlist':
             return this.showInputListError(refName);
         case 'select':
             return this.showSelectError(refName);
         case 'textarea':
             return this.showTextAreaError(refName);
         case 'inputtypecombo':
             return this.showInputTypeComboError(refName);
         case 'input':
         case 'url':
         case 'tel':
         case 'password':
         case 'text':
         case 'email':
         case 'file':
             return this.showInputError(refName);        
     }
 }

showFormErrors(obj = document) {
    const inputs = obj.querySelectorAll('input');
    const selects = obj.querySelectorAll('select');
    const textareas = obj.querySelectorAll('textarea');
    const checkboxlists = obj.querySelectorAll('.check-box-list[data-required], .select-box-list[required]');
    const inputLists = obj.querySelectorAll('.input-list[data-required]');
    const inputTypeCombos = obj.querySelectorAll('.input-type-combo[data-required]');
    let isFormValid = true;

   // console.log(this);
   // console.log(inputLists);
 
    for(let i = 0; i <= inputs.length - 1; i ++){
        let input = inputs.item(i);
        if(input.name && !input.formNoValidate){//validation requires this attribute
            //input.classList.add('active');
        
            const isInputValid = this.showInputError(input.name);
            
            if (!isInputValid) {
                isFormValid = false;
            }
        }

    }

    for(let i = 0; i <= selects.length - 1; i++){
        let select = selects.item(i);
        if(select.name){//validation requires this attribute
            select.classList.add('active');
            const isSelectValid = this.showSelectError(select.name);
            if(!isSelectValid){
                isFormValid = false;
            }
        }
    }

    for(let i = 0; i <= textareas.length - 1; i++){
        let textarea = textareas.item(i);
        if(textarea.name && !functions.isHidden(textarea)){//validation requires this attribute
            textarea.classList.add('active');
            const isTextAreaValid = this.showTextAreaError(textarea.name);
            if(!isTextAreaValid){
               isFormValid = false;
            }
        }
    }

    for(let i=0; i<= checkboxlists.length - 1; i++){//custom controls
        let checkboxlist = checkboxlists.item(i);
        checkboxlist.classList.add('active');
        const isCheckedListValid = this.showCheckBoxListError(checkboxlist.getAttribute('data-name'))
        if(!isCheckedListValid){
            isFormValid = false;
        }
    }

    for(let i=0; i<= inputLists.length - 1; i++){
        let inputList = inputLists.item(i);
        inputList.classList.add('active');
        const isInputListValid = this.showInputListError(inputList.getAttribute('data-name'))
        if(!isInputListValid){
            isFormValid = false;
        }
    }

    for(let i=0; i<= inputTypeCombos.length - 1; i++){
        let inputTypeCombo = inputTypeCombos[i];
        inputTypeCombo.classList.add('active');
        if(!this.showInputTypeComboError(inputTypeCombo.getAttribute('data-name'))){
            isFormValid = false;
        }
    }
    return isFormValid;
  }
  
showInputError(refName) {
    //console.log('in validator ' + refName);
    const ref = (this.refs[refName] as HTMLInputElement)
    const validity = ref.validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';
    let customValidity = null;

    ref.classList.add('active');

    if (isPasswordConfirm) {
      const refpassword = (this.refs.password as HTMLInputElement)
      if (refpassword.value !== ref.value) {
        customValidity = {valid: false, customError: 'Passwords do not match'};
      } 
    }        
    else if(ref.type != 'email' && functions.contains('email', ref.value)){
        customValidity = {valid: false, customError: 'Please remove email address from text'};
    }
    else if(ref.type != 'url' && functions.contains('url', ref.value)){
        customValidity = {valid: false, customError: 'Please remove links from text'};
    }
    else if(ref.type != 'tel' && functions.contains('phone', ref.value)){
        customValidity = {valid: false, customError: 'Please remove phone number from text'};
    } 
    else if(validity.typeMismatch && ref.type == 'url'){
        customValidity = {valid: false, customError: Library.MSG_INVALID_URL};
    }
    else if(validity.patternMismatch && ref.type == 'tel'){
       customValidity = {valid: false, customError: Library.MSG_INVALID_TEL};
    }

    if(customValidity){
        ref.setCustomValidity(customValidity.customError);
    }
    else{
       ref.setCustomValidity(''); //clear custom error message
    }
 
    return this.showValidError(refName, customValidity ? customValidity : validity);
   }

showTypeError(refName){
    const ref = this.refs['type-' + refName];
    var validity = {valid: true, customError: ''};
    if(ref.getAttribute('data-required') == 'true' && 
       (ref.innerHTML.length <= 0 || ref.innerHTML == 'undefined')){
       validity =  {valid: false, customError: `should have at least one selected`};
       ref.classList.add('invalid');
       ref.classList.remove('valid');
    }
    else{
      ref.classList.remove('invalid');
      ref.classList.add('valid');
    }    
    return this.showValidError(refName, validity);  
}

showInputTypeComboError(refName){
    return [this.showInputError(refName), this.showTypeError(refName)]
           .filter(v => !v).length <= 0;
}

showTextAreaError(refName){
       const ref = (this.refs[refName] as HTMLTextAreaElement);      
       const validity = ref.validity;
       const label = document.getElementById(`${refName}Label`).textContent;
       const error = document.getElementById(`${refName}Error`);
       //check for url, email and contact phone number
       let customValidity = null;
       
       if(functions.contains('email', ref.value)){
         customValidity = {valid: false, customError: 'Please remove email address from text'};         
       }
       else if(functions.contains('url', ref.value)){
           customValidity = {valid: false, customError: 'Please remove links from text'};         
       }
       else if(functions.contains('phone', ref.value)){
           customValidity = {valid: false, customError: 'Please remove phone number from text'};                     
       };
    
       if(customValidity){
           ref.setCustomValidity(customValidity.customError);
       }
       else{
          ref.setCustomValidity(''); //clear custom error message
       }

       return this.showValidError(refName, customValidity ? customValidity : validity);
    }
 
showSelectError(refName){
      const ref = (this.refs[refName] as HTMLSelectElement)
      const validity = ref.validity;
      return this.showValidError(refName, validity);
    }

showCheckBoxListError(refName){
       const ref = this.refs[refName];
       var validity = {valid: true, customError: ''};
       var checked = ref.querySelectorAll('input[type=checkbox]:checked');
       if(ref.hasAttribute('data-required') && checked.length <= 0){
          validity =  {valid: false, customError: `should have at least one selected`};
          ref.classList.add('invalid');
          ref.classList.remove('valid');
       }
       else{
         ref.classList.remove('invalid');
         ref.classList.add('valid');
       }
       
       return this.showValidError(refName, validity);   
    }

showInputListError(refName){
       const ref = this.refs[refName];
       var validity = {valid: true, customError: ''};
       //var inputitems = ref.querySelectorAll('.token');
       //var input = ref.querySelectorAll('input[value][type="text"]:not([value=""])'); //if there is a current input
       var inputvals = ref.getAttribute('data-value');
        if(ref.hasAttribute('data-required') && !inputvals){
            validity = {valid: false, customError: 'should have at least one selected'};
            ref.classList.add('invalid');
            ref.classList.remove('valid');
        }
        else if(functions.contains('email', inputvals)){
            validity = {valid: false, customError: 'Please remove email address from text'};   
            ref.classList.add('invalid');
            ref.classList.remove('valid');                  
         }
         else if(functions.contains('url', inputvals)){
            validity = {valid: false, customError: 'Please remove links from text'};    
            ref.classList.add('invalid');
            ref.classList.remove('valid');                 
         }
         else if(functions.contains('phone', inputvals)){
            validity = {valid: false, customError: 'Please remove phone number from text'};    
            ref.classList.add('invalid');
            ref.classList.remove('valid');                             
         }           
        else{
            ref.classList.remove('invalid');
            ref.classList.add('valid');
        }

        return this.showValidError(refName, validity);
   }

showValidError(refName, validity){
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
     
      if (!validity.valid) {
        if(validity.customError)
          error.textContent = validity.customError;
        else if (validity.valueMissing) {
          error.textContent = `${label} is a required field`; 
        } else if (validity.typeMismatch) {
          error.textContent = `${label} should be a valid email address`; 
        } else if (validity.patternMismatch) {
          error.textContent = `${label} should have the correct format`; 
        }
        return false;
      }
      else if(error){
        error.textContent = '';
      }
      return true;
   }
}