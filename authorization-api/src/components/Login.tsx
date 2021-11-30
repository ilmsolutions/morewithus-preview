import * as React from 'react';
import {PropTypes} from 'react';
import {Status} from './main/status';


export class Login extends React.Component<any, any> {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        client: PropTypes.object 
    }   
    render(){
        let {client} = this.context; 
        let urltemplate = '/{page}'+ (client ? '?client_id=' + client.id : '');
        return (            
            <div className="row background text-light">
                <div className="col col-md-6 offset-md-3">
                    <div className="panel panel-dark login-panel">
                        <div className="panel-heading">
                            <h3 className="heading">Please Sign In</h3>
                        </div>
                        <div className="panel-body">
                            <form method="post" id="validate-form" action="../auth/login">                                    
                                    <div className="form-group">
                                    <label className="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" />                            
                                    </div>
                                    <div className="form-group">
                                    <label className="sr-only">Password</label>
                                    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password"/>                                                    
                                    </div>  
                                    <div className="row ml-lg-0 form-group">
                                    
                                    <div className="col custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                     id="rememberMe" value="remember-me" />
                                    <label className="custom-control-label" 
                                         htmlFor="rememberme">Remember me</label>
                                    </div>
    
                                    <a href={urltemplate.replace('{page}', 'forgot')} 
                                    className='col d-flex justify-content-end highlight'>
                                    Forgot Password
                                    </a>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button> 
                                    <Status status={this.context.status} />
                                </form>         
                                <div className="text-center mt-2">
                                   {
                                       [
                                           'Not Registered? '
                                           ,<a key={0} className="highlight" 
                                             href={urltemplate.replace('{page}', 'signup')}>
                                             Sign Up Here
                                            </a>
                                       ]
                                   }
                                </div>    
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}