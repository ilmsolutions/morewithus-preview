import * as React from 'react';
import {PropTypes} from 'prop-types';
import {interceptors} from '../helpers/interceptors';
import {SEO} from "./main/seo";
import {Header} from './main/header';
import {Footer} from './main/footer';
import {ScrollToTop} from './commons/scrolltotop';

require('../assets/libs/sweetalert/sweetalert.css');

declare global {
    interface Window { 
        sweetalert: Function; 
    }
}

export class App extends React.Component<any, any> {  
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    }   
    
    getInitialProps(){
        return {
            hidenavigation: false,
            banner: null,
            socials: null,
            metatags: null
        };
    }

    constructor(props: any){
        super(props);
        this.state = Object.assign({}, this.getInitialProps(), props.params);   
        interceptors.init();
    }

/*     componentWillMount(){
        // console.log('am getting into component will mount');
        if(!this.context.data){
            //console.log('this is in....');
            if(typeof(window) !== 'undefined'){
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || {session:{}};
               //console.log(this.context.data);
            }
            else
                this.context.data = {session:{}};   
       }    
                
    }
 */

    componentDidMount(){
        window.sweetalert =  require( '../assets/libs/sweetalert/sweetalert.min.js');  
        let {data} = this.getContext();
        if(data){
            if(data.banner || data.metatags){
                this.setState(data);
            }
        }    
    }

    
    componentWillReceiveProps(nextProps){        
        if(nextProps.params)
           this.setState(nextProps.params);
    }

    render(){
       let {hidenavigation, banner, socials, metatags, type} = this.state;
       let {data} = this.getContext();
       return(            
            <div>
              <SEO metatags={metatags} type={type} />
              <ScrollToTop />
              {!hidenavigation ? 
              <Header root={this.props.route.path}  
              session={data && data.session ? data.session : 'undefined'} 
              collapseshow={false}
              />
                : ''      
              }              
              {this.props.children != null ? this.props.children : <div className='main-page'></div>}   
              {!hidenavigation ? 
              <Footer banner={banner} socials={socials}/> : ''}              
            </div>
        );
    }

    getContext(){
        //console.log('in get context');
        if(!this.context.data){
            if(typeof(window) !== 'undefined'){
                // console.log(window['_INITIAL_STATE']);            
                this.context.data = window['_INITIAL_STATE'] || {session:{}};
                //console.log('in window defined');
               //console.log(this.context.data);
            }
       }
       return this.context;        
    }
        
}

