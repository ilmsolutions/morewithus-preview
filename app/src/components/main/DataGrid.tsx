import * as React from 'react';
//import {ReactTable} from 'react-table';


import "react-table/react-table.css";

interface ColumnDef{
    key: string,
    name: string,
    cell?(item: object, key: string):any,
    sort?(a: any, b: any, desc: boolean):number
}

interface IDataGridProps extends React.Props<DataGrid>{
   columndefs: Array<ColumnDef>
   , rows: Array<object>
   //, getResource(string)
   , type: string
}

var ReactTable;
if(typeof window !== 'undefined')
  ReactTable = require('react-table').default;

export class DataGrid extends React.Component<IDataGridProps, any>{
    
    constructor(props: IDataGridProps){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), props);
    }

    getInitialState(){
        return {
            rows: []
        };
   }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.rows)
        this.setState({
            rows: nextProps.rows
        });
    }
    

    render(){
        let {columndefs} = this.props;
        let tsettings = Object.assign({}, {
            getTdProps: (state, rowInfo, column, instance) => {
//               console.log('td props');
//               console.log(column);
               return {
                 
               };
            }
        });
        let {rows} = this.state;
        let mcolumndefs = columndefs.map(def => {
          return {
              Header: def.name,
              id: def.key,
              accessor: (item) => {
                  return def.cell ? def.cell(item, def.key) : item[def.key];
              },
              sortMethod: def.sort ? def.sort : null
          };
        });
        let renderGrid = ReactTable ? <ReactTable 
                             key={'table'}
                             columns={mcolumndefs}
                             className='table' 
                             data={rows}
                             //{...tsettings} 
                             /> : ''; // : 'Loading....'
        return  (<div className="my-2 container data-grid">
          {renderGrid}
        </div>);
    }


}