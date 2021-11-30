import * as React from 'react';

export class Popup extends React.Component<any, any>{
    public componentWillMount(){
    } 

    public getInitialState(){
       //console.log('in initial state');
       return {
           value: ''
       };
    }

    constructor(props: any){
        super(props);
    }

    render(){
        return <div></div>;
    }

}
