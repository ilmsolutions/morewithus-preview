import * as React from 'react';
import {BaseComponent} from '../commons/basecomponent';


export class Advertisement extends BaseComponent{

    constructor(props){
        super(props);
        this.state = Object.assign({}, {adverts: []});
    }

    componentDidMount(){
        this.getResource('settings.adverts').then(res =>{
            //console.log(res);
            let adverts = JSON.parse(res.data.toString());
            this.setState({
                adverts: adverts.map(transformAdvertDTO)
            });
        });
     }

     render(){
         let {adverts} = this.state;
         let selIndex = Math.floor(Math.random() * adverts.length);
         let selAdvert = adverts[selIndex];
         let renderAdvert = selAdvert ?  <a href={selAdvert.url} target='_blank' title={selAdvert.title}><img className='img-fluid' src={selAdvert.fileurl} 
                                              title={selAdvert.title} /> </a>: <span></span>;

         return (
             <div className='mt-2 text-center'>
             {renderAdvert}
         </div>);

     }
 
}

function transformAdvertDTO(o){
    return {
        id: o._id,
        title: o.label,
        description: o.description,
        filename: o.custom.file,
        fileurl: o.custom.image,
        url: o.custom.url
    };

}