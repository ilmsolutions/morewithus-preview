import * as React from 'react';
import {BaseComponent} from './commons/basecomponent';



export class InfoPage extends BaseComponent{
    constructor(props){
        super(props);
        this.state = Object.assign({}, {pages: []}, props.params);
        this._bind('loadList');
    }

    componentDidMount(){
        let {type} = this.state;
        this.loadList(type);
    }

    componentWillReceiveProps(nextProps){
      let {type} = this.state;
      if(nextProps && nextProps.params && nextProps.params.type != type)
         this.loadList(nextProps.params.type);
    }

    render(){
        let {type, pages} = this.state;
        let renderPage = (page, i) => {
            return <div className="container mt-5" key={i}  dangerouslySetInnerHTML={{__html: page.body}}>
            </div>;
        }
        return (
            <div className="container main-page">
            {pages.map(renderPage)}
            </div>
        );
    }

    loadList(type){
        if(type){
            this.getResource('settings.pages' + (type ? ',' + type : '')).then(res =>{
                //console.log(res);
                let pages = JSON.parse(res.data.toString());
                this.setState({
                    type: type
                    , pages: pages.map(page => {
                        return {
                            title: page.custom['title']
                           ,body: page.custom['body']
                        };
                    })
                });
                window.scrollTo(0, 0);
            });     
        }
    }
    
}

