import * as React from 'react';

interface IStatusState {
  statusCode: String,
  statusMessages: String[] 
}

interface IStatusProps{
  status: Array<IStatusState>
  ,classNames?: String 
}

export class Status extends React.Component<IStatusProps, any> {
    constructor(props: IStatusProps){      
      super(props);
      // set initial state
    }

   render(){
       const r = this.props.status.map((sts, i) => {
              let alertClass;
              switch(sts.statusCode){
                case 'error':
                case 'warn':
                     alertClass = 'alert-danger';
                     break;
                case 'redirect':
                default:
                     alertClass = 'alert-info';
                     break;
              }

              return (
                  <div className={'alert ' + alertClass + ' ' + this.props.classNames}  
                    key={i}>
                      {sts.statusMessages.join(' ')}
                  </div>
              );
            });

       return <div className="status">
                   {r}
             </div>;
       
   }
}
