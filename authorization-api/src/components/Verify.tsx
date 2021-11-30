import * as React from 'react';
import {PropTypes} from 'react';
import {Status} from './main/status';

export class Verify extends React.Component<any, any>{
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        client: PropTypes.object 
    } 

     render(){
         let {token} = this.context.data;
         let heading =  token ? <h4 className='heading'>Verify your email address below:</h4> :
                          <div className='alert alert-warning'>
                             <strong>Did not get the email verification request?</strong> 
                             <span className='ml-1'>Request below to resend  it.</span>
                          </div>;
         return (
            <div className="row background text-light">
            <div className="col col-md-6 offset-md-3">             
                <div className="panel panel-dark verify-panel">
                    <Status classNames='lead' 
                        status={this.context.status.filter(status => 
                                                 status.statusCode == 'redirect')} />                
                    <div className="panel-heading">                        
                       {heading}
                    </div>
                    <div className="panel-body">
                        <form method="post" id="validate-form">                                    
                            <div className="form-group col">
                                <label className="sr-only">Email</label>
                                <input type="email" id="inputEmail" 
                                        name="email" className="form-control" 
                                        placeholder="Email" />
                            </div>
                            <input type="hidden" id="inputToken" 
                                    name="token" value={token} />
                            <div className="form-group col">
                            {token ?
                            <button className="mx-2 btn btn-primary"
                                    name="verify" formAction="../api/verify"
                                    type="submit">Verify Email</button>  : ''}
                            <button className="mx-2 btn btn-sm btn-warning"
                                    name="resend" formAction="../api/resendverification" 
                                    type="submit">Resend Verification Email</button>                        
                            </div>
                            <Status status={this.context.status.filter(status => 
                                                    status.statusCode == 'error')} /> 
                        </form>
                        <Status classNames='lead' status={this.context.status.filter(status => 
                                       status.statusCode == 'warn')} />                            
                    </div>                    
                </div>
            </div>
            </div>
         );
     }
}