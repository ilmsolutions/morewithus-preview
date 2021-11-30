import * as React from 'react';
import {Link, IndexLink} from 'react-router';
import {Library} from '../../helpers/library';
import {ContactUs} from '../home/contactus';

interface IFooterState {
    isAuthenticated: boolean
}

interface IFooterProps{
   banner: object 
  ,socials: object
}

export class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps){
      super(props);
  }

  render(){
    let {banner, socials} = this.props;
    let navlinks =[
        {title: 'About Us', url: '/info/about us', icon: 'info-circle', showicon: false, showtext: true}
        ,{title: 'How it Works?', url: '/info/how it works', icon: 'cogs', showicon: false, showtext: true}
       ,{title: 'FAQs', url: '/info/faqs', icon: 'question', showicon: false, showtext: true}
       ,{title: 'Blog', url: 'https://everydayjobspro.com', icon: '', showicon: false, showtext: true, external: true}
       ,{title: 'Other Services', url: '/info/other services', icon: 'ellipsis-h', showicon: false, showtext: true}
    ]; 
    let sociallinks = [
         {title: 'Facebook', url: socials && socials['facebook'] ? socials['facebook'] : '#', icon:'fa-facebook', showicon: true, showtext: false, external: true}      
       , {title: 'Google', url: socials && socials['google'] ? socials['google'] : '#', icon: 'fa-google-plus', showicon: true, showtext: false, external: true}
       , {title: 'Linkedin', url: socials && socials['linkedin']? socials['linkedin'] : '#', icon: 'fa-linkedin', showicon: true, showtext: false, external: true}
       , {title: 'Twitter', url: socials && socials['twitter'] ? socials['twitter'] : '#', icon: 'fa-twitter', showicon: true, showtext: false, external: true}
    ];    
    let footerlinks = [
         {title: 'Terms & Conditions', url: '/info/terms', icon: null, showicon: false, showtext: true}
        ,{title: 'Privacy Policy', url: '/info/privacy policy', icon: null, showicon: false, showtext: true}
    ];    
    const renderlink = (link, i) => {
        var nlink = link.external ? <a href={link.url} className="nav-link" /> :
                   <Link to={link.url} className="nav-link" activeClassName="active" />;
        let lcontent = [];
        if(link.showicon)
           lcontent.push(<i key={'icon-' + i} className={'fa ' + link.icon} />);
        if(link.showtext)
           lcontent.push(<span key={'text-' + i}>{link.title}</span>);
                        
        return (
        <li key={i}>
         {link.external ? <a href={link.url} className='nav-link'>
            {lcontent}
         </a> : 
          <Link to={link.url} className="nav-link" activeClassName="active">
            {lcontent}
          </Link>
        }
        </li>
        );
   };     
      return (
        <footer className='footer container-fluid bg-dark'>
           <div className='row text-white'>
             {
               banner && banner['title'] ?
               <div className='col-12 col-md-4'>
               <span className="navbar-brand">{Library.MSG_APP_TITLE}</span>
               <small>
               <div className='font-weight-light' dangerouslySetInnerHTML={{__html: banner['body']}}>              
               </div>
               <ul className='inline mb-0'>
                 {sociallinks.map(renderlink)}
               </ul>
               <ul className='inline'>
                {footerlinks.map(renderlink)}
               </ul>                
               </small>              
               </div> :
               <div className='col-12 col-md-4'>
               <small>
               <ul className='inline font-weight-light'>
                {footerlinks.map(renderlink)}
               </ul>                 
               </small>
               </div>     
             }
             <div className='col-12 col-md-3'>
                <h6>Quick Links</h6>
                <ul className='font-weight-light'>
                {navlinks.map(renderlink)}
                </ul>
             </div>
             <div className='col-12 col-md-5'>
                <h6>Contact Us</h6>
                <ContactUs size='sm'/>
             </div>
           </div>
        </footer>
      );
  }
}