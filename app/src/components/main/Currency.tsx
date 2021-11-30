import * as React from 'react';

interface ICurrencyProps extends React.Props<Currency>{
     value: number
}

export class Currency extends React.Component<ICurrencyProps, any>{
    constructor(props: ICurrencyProps){
        super(props);
    }

    render(){
        let {value} = this.props;
        const rendervalue = (v) =>{
            let fvalue = Number(v).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
                , minimumFractionDigits: 0
                , maximumFractionDigits: 2
                }).split('.');

            return [fvalue[0], (fvalue[1] ? '.' : ''), (fvalue[1] ? <span className='smaller' key={0}>{fvalue[1]}</span> : '')];

        }
        return (
            <span>
            {!isNaN(value) ? rendervalue(value) : ''}
            </span>
        );

    }


}