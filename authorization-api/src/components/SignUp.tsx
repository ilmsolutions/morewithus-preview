import * as React from 'react';
import {PropTypes} from 'react';
import {Status} from './main/status';

const popup = "javascript:window.open('{url}', '{title}', 'width=500,height=250');";

export class Signup extends React.Component<any, any> {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        status: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        client: PropTypes.object 
    } 

    componentDidMount(){

    }

    render(){
        let {client} = this.context; 
        return(
              <div className="row background text-light">
                  <div className="col col-md-6 offset-md-3">
                      <div className="panel panel-dark signup-panel">
                          <div className="panel-heading">
                               <h3 className="heading">Please Sign Up</h3>
                          </div>
                          <div className="panel-body">
                            <form method="post" id="validate-form" action="../api/signup">                                    
                                    <div className="form-group">
                                        <label className="sr-only">First Name</label>
                                        <input type="text" id="inputFirstName" name="firstname" className="form-control" placeholder="First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Last Name</label>
                                        <input type="text" id="inputLastName" name="lastname" className="form-control" placeholder="Last Name" />                                                       
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Email address</label>
                                        <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" />                             
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Password</label>
                                        <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password"/>                                                       
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                     id="inputTermsandConditions"
                                     name="checktermsandconditions" value="option1" />
                                    <label className="custom-control-label" 
                                         htmlFor="inputTermsandConditions">
                                        {
                                         ['I accept the '
                                          ,<a key={0} className="highlight" 
                                              target='_blank'
                                              href={popup.replace('{url}', client ? client.baseuri + '/info/terms?ispopup=true' : '#')
                                                         .replace('{title}', 'Terms & Conditions')} 
                                              >
                                               Terms &amp; Conditions</a>
                                          , ' and '
                                          ,<a key={1} className="highlight" 
                                          target='_blank'
                                          href={popup.replace('{url}', client ? client.baseuri + '/info/privacy%20policy?ispopup=true' : '#')
                                                     .replace('{title}', 'Privacy Statement')} 
                                          >
                                              Privacy Statement</a>
                                         ]   
                                        }                                                             
                                    </label>
                                    </div>                                    
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button> 
                                    <Status status={this.context.status} />     
                                    <div className="text-center mt-2">
                                      {
                                          [
                                             'Already Registered? '
                                             , <a key={0} className="highlight" href="/login">Login Here</a>
                                          ]
                                      }                                       
                                    </div>                                         
                                </form>                              
                          </div>
                      </div>
                  </div>
                  
              </div>
        );
    }
}