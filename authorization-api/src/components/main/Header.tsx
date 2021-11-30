import * as React from 'react';
import {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

export class Header extends React.Component<any, any> {
    static contextTypes = {
        client: PropTypes.object 
    } 

    constructor(props : any){      
        super(props);
        // set initial state
        this.state = Object.assign({}, {collapseshow: false});
      }
  
    render(){
        let {client} = this.context; 
        let {collapseshow} = this.state;
        let navlinks = [
            {title: 'Home', url: '', icon: 'home'}
            ,{title: 'About Us', url: '/info/about us', icon: 'info-circle'}
            ,{title: 'How it Works?', url: '/info/how it works', icon: 'cogs'}
           ,{title: 'FAQs', url: '/info/faqs', icon: 'question'}
        ];

        let renderlink = (link, i) => {
//            console.log(link);
             return (
              <a key={i} href={client ? client.baseuri + link.url : '#'} className="nav-link">
                 {link.title}
              </a>
             );
        };
          
        return (
    <nav className="navbar navbar-expand-md bg-light fixed-top">
        <a href={client ? client.baseuri : '#'} className="navbar-brand">
         <img src="/assets/images/logo.png" className="img-fluid" />
        </a>
        <button className="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarCollapse" 
                aria-controls="navbarCollapse" aria-expanded="false" 
                onClick={(e) => {this.setState({collapseshow: !collapseshow})}}                 
                aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>     
        <div className={'collapse navbar-collapse ' + (collapseshow ? 'show' : '')} id="navbarCollapse">
            <nav className="ml-auto navbar-nav">
            {navlinks.map(renderlink)}      
            </nav>        
        </div>        
    </nav>          
        );
    }
}
