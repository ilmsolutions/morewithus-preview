import * as React from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


interface IRenderExcelProps extends React.Props<RenderExcel>{
    data:Array<object>,
    coldefs:Array<object>,
    sheetname: string,
    filename: string 
}

export class RenderExcel extends React.Component<IRenderExcelProps, any>{

    constructor(props : IRenderExcelProps){      
        super(props);
    }

    render(){
        let {data, coldefs, sheetname, filename} = this.props;
        let download = <span className="fa fa-file-excel-o"></span>;
        return (
            <ExcelFile filename={filename} element={download}>
               <ExcelSheet data={data} name={sheetname}>
               {
                   coldefs.map((def, i) =>{
                     return <ExcelColumn key={i} label={def['label']}
                                         value={typeof(def['value']) === 'function' ? 
                                                   (r) => {return def['value'](r, def['key']); } 
                                                  : def['value']} />
                               
                   })
               }
               </ExcelSheet>
            </ExcelFile>
        );
    }
    
}
