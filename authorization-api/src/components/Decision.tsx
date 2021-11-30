import * as React from 'react';
import {PropTypes} from 'react';


export class Decision extends React.Component<any, any> {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    }   
    render(){       
        let hiddeninputs = [];
        if(this.context && this.context.data){
            hiddeninputs.push({id: 'transaction_id', value: this.context.data.transactionId});            
        }

        return (            
            <div className="row background text-light">
                <div className="col col-md-6 offset-md-3">
                    <div className="panel panel-dark decision-panel">
                       <div className="panel-heading">
                           <h3 className="heading">Authorize</h3>
                       </div>
                       <div className="panel-body">
                        <form className="form-decision" method="post" action="../auth/decision">
                                
                                <h4>Hi {this.context.data.user.firstname},</h4>
                                <p>
                                    <strong>{this.context.data.client.name} </strong>
                                    is requesting access to your account. Do you approve?
                                </p>
                                <p>
                                    <input type="submit" id="btnallow" name="allow" className="m-2 btn btn-primary" value="Allow" />
                                    <input type="submit" id="btndeny" name="cancel" className="m-2 btn btn-secondary" value="Deny" />

                                {
                                    hiddeninputs.map(function(input, i){
                                    return <input type="hidden" id={input.id} name={input.id} value={input.value} key={i} />;
                                    })
                                }
                                </p>                        
                            </form>
                           
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}
