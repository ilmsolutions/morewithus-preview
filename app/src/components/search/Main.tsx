import * as React from 'react';
//import {PropTypes} from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import {CSSTransition} from 'react-transition-group';
import {BaseComponent} from '../commons/basecomponent';
import {CustomAsyncTypeAhead} from '../main/customasynctypeahead';
import {FilterMenu} from './filtermenu';
import {Results} from './results';

function contains(a1, a2){
    //console.log(a1);
    //console.log(a2);
    if(a1 == null || a1.length <= 0)
       return [];
    if(a2 == null || a2.length <= 0)
       return a1;
   return [].concat(a1).filter((n) => a2.includes(n));
}

export class Main extends BaseComponent{
   
    constructor(props: any){
        super(props);
        this.state = Object.assign({}, {query: props.params.query, 
                                        showfilterMenu: false, filters: {}, 
                                        view: 'list', detailid: null
                                        ,hidePrivate: props.hidePrivate
                                        ,isAuthenticated: props.isAuthenticated
                                       });
        this._bind('getResource', 'HandleKeyDown', 'DropDownChange', 
                   'getSearchResults','switchView', 'applyFilters', 'toggleFilterMenu');
    }


    componentDidMount(){
        let {query, hidePrivate} = this.state;
        this.getSearchResults(query, hidePrivate);

        // navigator.geolocation.getCurrentPosition((pos) =>{
        //        console.log(pos);
        // }, (err) => {
        //   console.log(err.message);
        // }, {
        //     enableHighAccuracy: true,
        //     timeout: 10000,
        //     maximumAge: 0
        // });
    }

    componentWillReceiveProps(nextProps){
        let {hidePrivate, isAuthenticated, query} = this.state;
        if(hidePrivate != nextProps.hidePrivate ||
           isAuthenticated != nextProps.isAuthenticated){
          this.getSearchResults(query, nextProps.hidePrivate);
          this.setState({hidePrivate: nextProps.hidePrivate, 
                         isAuthenticated: nextProps.isAuthenticated}); 
        }
    }        

render(){
    const {query, filters, view, detailid, showfilterMenu, result} = this.state;
    let {hidePrivate, isAuthenticated, users} = this.state;
    //filter users
    //console.log(users);
    users = this.filterUsers(users, filters);

    const message = (users && users.length > 0)?
    ['Search returned', <strong className='mx-1' key='search-count'>{users.length}</strong>, 'results']
    .concat((result.location) ? [' near',  <strong className='mx-1' key='search-location'>{result.location}</strong>, '.' ]: ['.']) :
    'No results found.';

    const header = (view == 'detail') ?   
             <a href="#search-results" className="back-to-search-results" data-view="list" onClick={() => this.switchView({view: 'list', detailid: null})}>
               <i className="pull-left fa  fa-chevron-left"></i> Back to Search Results
             </a> : message;


    return <div className="container">
               <div className="pt-3 pb-2 container bg-primary text-white">    
                   <div className="row justify-content-center">            
                        <div className="col-lg-3">
                        <CustomAsyncTypeAhead id="typeAheadMainSearch" name="mainSearch" 
                                    selected = {[query]} ref="mainSearchWrapper" inputRef={"mainSearch"}
                                    allowNew={true} multiple={false} minLength={2} 
                                    defaultOption="Search for the type of work you need."
                                    getResource={() => {return this.getResource('typeaheads.workareas_certifications_awards_keywords_skills');}}
                                    onChange={this.DropDownChange}>
                        </CustomAsyncTypeAhead>
                        </div>  
                        <div className="col-lg-1">
                            near
                        </div>
                        <div className="col-lg-3">
                        <input type="text" className="form-control" id="inputAddress"
                                placeholder="Enter City, State or ZIP" 
                                ref="address" name="address" onKeyDown={this.HandleKeyDown} />           
                        </div>                  
                        <div className="col-lg-2">
                        <a className="link" onClick={this.toggleFilterMenu}>
                              {(showfilterMenu) ? ['Less Filters ', <i className='fa fa-angle-up' key={'icon'}></i>] : 
                                                  ['More Filters ', <i className='fa fa-angle-down' key={'icon'}></i>]} 
                        </a>                     
                        </div> 
                    </div>  
                    <CSSTransition
                           classNames="collapseslide" 
                           timeout={{ enter: 500, exit: 300 }}>
                     <FilterMenu cardclass="bg-primary border-0" 
                                 show={showfilterMenu}
                                 filters={filters}
                                 applyFilters={this.applyFilters}>
                     </FilterMenu>
                    </CSSTransition>   
               </div> 

               <div key={'container-' + view} className={"container " + view} data-name="search-results">
                    <div className="col justify-content-start">               
                    {header}               
                    </div>     
                    <CSSTransition
                    classNames="slide" 
                    timeout={{ enter: 500, exit: 300 }}>                   
                    <Results users={users} hidePrivate={hidePrivate} 
                             isAuthenticated={isAuthenticated}  
                             view={view} detailid={detailid} 
                             getProtectedResource={this.getProtectedResource}
                             triggerSwitch={this.switchView}/>
                    </CSSTransition>      
               </div>
            </div>; 
}

DropDownChange(e){
    let {hidePrivate} = this.state;
    var address = (this.refs['address'] as HTMLInputElement);
    this.getSearchResults(e.newValue, hidePrivate, {near: address.value});
}

HandleKeyDown(e){    
    if (e.keyCode !== 13) return;

    var {hidePrivate} = this.state;    
    var target = e.target,
        address = e.target.value,
        query = (this.refs['mainSearchWrapper'] as CustomAsyncTypeAhead).state.selected;

    this.getSearchResults(query, hidePrivate, {near: address});
}

getSearchResults(query, hidePrivate, opts?){
   if(query == null || query.length <= 0)
       return;

    let near = opts && opts.near ? 'near=' + opts.near : '';
    browserHistory.push((!hidePrivate ? '/auth' : '') + '/search/' + query + '?' + near);

    this.getResource('users?query=' + query + '&' + near, hidePrivate)
    .then(res => {
       var data = JSON.parse(res.data.toString());
       this.setState({
         status: true,
         message: '',
         users: data.users,
         view: 'list',
         detailid: null,
         result: data.result
       });
     
     }); 
}

applyFilters(filters: object){
   // console.log('in main apply filters');
   // console.log(filters);
    this.setState({
        filters: filters,
        showfilterMenu: false,
        view: 'list',
        detailid: null
    });
};

filterUsers(users, filters){
    
    let _users = users;
    let _keys = Object.keys(filters);
    for(var i= 0; i < _keys.length; i++){
        if(_users == null || _users.length <= 0)
            break;
        var _filter = _keys[i];
        if(filters[_filter].length > 0){
            _users = _users.filter((user) => {
                return contains(user[_filter], filters[_filter].split(',')).length > 0;
            });
        }
    }

    return _users;
}

toggleFilterMenu(e){
   let {showfilterMenu} = this.state;
   this.setState({showfilterMenu: !showfilterMenu});
}

switchView(change){   
    window.scrollTo(0, 0); 
    this.setState(change);    
}

getResource(resource, hidePrivate = true){
    let baseurl = !hidePrivate ? '/api/auth' : '/api';
    return axios.get(baseurl + '/external/authorization/' + resource);
}

getProtectedResource(resource){
    //console.log('getting here...' + resource);
    return axios.get('/api/auth/external/authorization/' + resource);
}

}