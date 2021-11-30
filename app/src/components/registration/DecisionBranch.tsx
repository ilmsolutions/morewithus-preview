import * as React from 'react';

interface IChoice<ChoiceType>{
    type: ChoiceType,
    label: string 
}

interface IDecisionProps<ChoiceType>{
   decision: string, 
   choices: IChoice<ChoiceType>[],
   fieldname: string,
   nextStep(data?),
   saveData(object)
}

export class DecisionBranch<ChoiceType> extends React.Component<IDecisionProps<ChoiceType>, any> {

    constructor(props: IDecisionProps<ChoiceType>){
        super(props);
    //    this.state = props;
    }

   render(){
       let onClick = (e) => this.saveContinue(e);
       let items =  this.props.choices.map(function(d, i){
                  return <button key={i} className={'btn btn-' + (i == 0 ? 'primary': 'secondary')} 
                                 value={i} onClick={onClick}>{d.label}</button>;
               });
       return(
        <div className="container display-modal">
                <div className="modal">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>{this.props.decision}</p>
                        </div>
                        <div className="modal-footer">
                            {items}
                        </div>
                    </div>
                    </div>
                </div>
        </div>
       );
   }

   saveContinue(e){
        e.preventDefault(); 

      
        let data = JSON.parse('{"' + this.props.fieldname + '":"' + this.props.choices[e.target.value].type + '"}');
       
        this.props.nextStep(data);

        return true;
   }
}