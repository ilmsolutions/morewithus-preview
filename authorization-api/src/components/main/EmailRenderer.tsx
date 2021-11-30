import * as React from 'react';


export class EmailRenderer extends React.Component<any, any>{
     constructor(props){
         super(props);
         this.state = Object.assign({}, props);
     }

     render(){
         let {body} = this.state;
         return (
            <div className="content" dangerouslySetInnerHTML={{__html: body}}>
            </div>
         );
     }
}