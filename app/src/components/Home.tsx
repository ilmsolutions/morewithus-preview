import * as React from 'react';
import {PropTypes} from 'prop-types';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {CustomAsyncTypeAhead} from './main/customasynctypeahead';
import {FeaturedPlans} from './home/featuredplans';
import {Advertisement} from './home/advertisement';
import {SEO} from "./main/seo";
import {Library} from '../helpers/library';

export class Home extends React.Component<any, any> {
    static contextTypes = {
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    };
   
    getInitialProps(){
        return {
            banner:{
                body: ''
                ,title: ''
            }
        }
    }

    constructor(props){
          super(props);
          this.dropDownOnChange = this.dropDownOnChange.bind(this); 
          this.getResource = this.getResource.bind(this);     
          this.state = Object.assign({}, this.getInitialProps(), props);   
    }

    componentDidMount(){
        let {data} = this.getContext();
        if(data){
            if(data.banner || data.metatags){
                this.setState(data);
            }
        }
    }

    render(){
      let {banner, metatags} = this.state;
      let DropDownChange = this.dropDownOnChange;


      const cards = [
           {
              title: 'Looking for a job or a contract?',
              icon: '/assets/img/icons/looking-job.png',
              description: Library.MSG_LOOKING_FOR_A_JOB + ' Register in three easy steps. And it is free!',
              action: <a href="/auth/profile?usercontext=employee" className="btn btn-sm btn-primary" role="button">Jobseekers: Sign Up (Free!)</a> 
           }
           , {
              title: 'Looking to hire?',
              icon: '/assets/img/icons/hire.png',
              description: Library.MSG_LOOKING_TO_HIRE,
              action: <a href="/search/all" className="btn btn-sm btn-secondary" role="button">Employers: Browse Jobseeker Profiles</a> 
           }
/*            , {
             title: 'Another title',
             description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
             action: ''
           } */
      ];
      return (
        <div className="container main-page">
                {/* bg-dark text-white */}
            <SEO metatags={metatags} />
            <div className="card front-banner">        
                   <img className="card-img img-fluid" src="/assets/img/bg-images/banner.jpg" 
                        alt="Overlay image"/>
                    <div className="card-img-overlay no-gutters">
                    <div className="card-text">
                      <div className="row">
                        <div className="col-md-6 pr-md-5">                         
                            <span className="h3 h3-custom">{Library.MSG_HOME_SEARCH_TITLE}</span>
                            <CustomAsyncTypeAhead id="typeAheadMainSearch" name="mainSearch" 
                                classes="text-w-icon"
                                selected = {[]} inputRef={"mainSearch"}
                                allowNew={true} multiple={false} minLength={2} 
                                defaultOption="&#xF002; Search for the type of work you need."
                                getResource={() => {return this.getResource('typeaheads.workareas_certifications_awards_keywords_skills');}}
                                onChange={DropDownChange}>
                            </CustomAsyncTypeAhead>  
                            <a href="/search/all" className="clearfix h6 highlight">
                                OR Browse all active job seeker profiles
                            </a>                            
                        </div>
                      </div>
                      <div className="row d-none d-md-block">
                          <div className="offset-md-6 col-md-6 pl-md-5">
                          <div className="overlay-bg">
                           <span className="h3">{Library.MSG_APP_TITLE}</span>
                           <div className="highlight" dangerouslySetInnerHTML={{__html: banner.body}}>
                           </div>
                          </div>
                        </div>                          
                        </div>{/*right row section*/}                      
                      </div>
                    </div>
            </div>  
            <div className="card-group">
               {
                   cards.map(function(card, i){
                       return <div className="card text-center" key={i}>
                                  <div className="card-body">
                                     <img src={card.icon} className="img-fluid"/>
                                     <p className="h3 card-title">{card.title}</p>
                                     <p className="card-text">{card.description}</p>
                                  </div>
                                  <div className="card-footer">
                                  <p className="card-text">{card.action}</p>
                                  </div>
                              </div>;
                   })
               }
            </div>
           <FeaturedPlans />
           <Advertisement />
        </div>
        );

   };

   dropDownOnChange = function(change){
    
       //console.log(change);
       if(change && change.newValue){
          var path = '/search/' + change.newValue;
          browserHistory.push(path);
       }
       
   }

   getResource(resource){
       switch(true){
           case /typeaheads\.\w+$/.test(resource):
             return axios.get('/api/external/authorization/' + resource);    
           case /settings\.[\w\s,]+$/.test(resource):
             return axios.get('/api/external/authorization/' + resource, {params: {__cache: true}});   
       }    
  }

  getContext(){
    if(!this.context.data){
        if(typeof(window) !== 'undefined'){
            // console.log(window['_INITIAL_STATE']);            
            this.context.data = window['_INITIAL_STATE'] || {session:{}};
           //console.log(this.context.data);
        }
   }
   return this.context;        
}

}

