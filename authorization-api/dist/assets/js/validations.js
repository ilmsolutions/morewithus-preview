       $(document).ready(function(){
           $('#validate-form').validate({
                 rules:{
                    firstname:{required: true, minlength: 3},
                    lastname:{required: true, minlength: 3},
                    email:{required: true, email: true},
                    password:{required: true, minlength: 5},
                    checktermsandconditions:{required: true}
                 },
                 errorClass: 'form-control-danger',
                 validClass: 'form-control-success',
                 errorPlacement: function(error, element){
                    if(element.attr('type') == 'checkbox'){
                         error.insertAfter($(element).parents('label'));
                    }
                    else
                        error.insertAfter(element); 
                 },
                 highlight: function(element, errorClass){
                     $(element).parent('.form-group').removeClass('has-success').addClass('has-danger');
                     $(element).addClass(errorClass);
                 },
                 unhighlight: function(element, validClass){
                     $(element).parent('.form-group').removeClass('has-danger').addClass('has-success');
                     $(element).addClass(validClass);
                 }
           });
       });