import * as React from 'react';
import {PropTypes} from 'react';
import {Status} from './main/status';

export class Forgot extends React.Component<any, any>{
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        client: PropTypes.object
    } 

    render(){        
        let {client, data} = this.context; 
        let token = data && data.token ? data.token : null;
        let success = data && data.success ? data.success : null;
        let heading =  token ? <h4 className='heading'>Reset your password below:</h4> :
                         <div className='alert alert-warning'>
                            <strong>Did not get the password reset request?</strong> 
                            <span className='ml-1'>Request below to resend  it.</span>
                         </div>;
        let renderForm = 
        <form method="post" id="validate-form">                                    
            <div className="form-group">
                <label className="sr-only">Email</label>
                <input type="email" id="inputEmail" 
                        name="email" className="form-control" 
                        placeholder="Email" />
            </div>
            {token ? 
            <div className="form-group">
                <label className="sr-only">New Password</label>
                <input type="password" id="inputPassword" name="npassword" className="form-control" placeholder="Password"/>                                                       
            </div>
             :''
            }
            <input type="hidden" id="inputToken" 
                    name="token" value={token} />
            <div className="form-group">
            <button className="btn btn-primary"
                    name="verify" formAction="../api/forgot"
                    type="submit">
               {!token? 'Send Reset Email' : 'Reset Password'}
            </button>
            </div>
            <Status status={this.context.status.filter(status => 
                                    status.statusCode == 'error')} /> 
          </form>;

        let renderContent = (success) ? 
                            <Status classNames='lead' 
                            status={this.context.status.filter(status => 
                                                    status.statusCode == 'info')} />  :
                            renderForm;                         
                                
       
        return(
              <div className="row background text-light">
                  <div className="col col-md-6 offset-md-3">
                      <div className="panel panel-dark forgot-panel">
                       <Status classNames='lead' 
                        status={this.context.status.filter(status => 
                                                 status.statusCode == 'redirect')} />

                      <div className="panel-heading">                        
                         <h3>Reset Password</h3>
                      </div>                      
                      <div className="panel-body">
                          {renderContent}
                          <Status classNames='lead' status={this.context.status.filter(status => 
                                       status.statusCode == 'warn')} />                                                      
                       </div>
                      </div>
                  </div>
              </div>
        );
    }   

}