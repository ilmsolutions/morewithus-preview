import * as React from 'react';
import {Link, IndexLink} from 'react-router';

interface IUserState{
   email: string
}

interface IHeaderState {
  isAuthenticated: boolean,
  user: IUserState,
  collapseshow?: boolean
}

export class Header extends React.Component<any, IHeaderState> {
    public shouldComponentUpdate(nextProps, nextState){
         return true;
    }

    public componentWillUpdate(nextProps, nextState){
    // perform any preparations for an upcoming update
    //console.log('component will update');
    }
  
    componentDidMount(){
       // console.log('header component did mount');
    }

    constructor(props : any){      
      super(props);
      // set initial state
      this.state = Object.assign({}, {isAuthenticated: false, user: null, collapseshow: false}
                                   , props.session, props.collapseshow);
    }

    componentWillReceiveProps(nextProps){
        this.setState({collapseshow: nextProps.collapseshow, ...nextProps.session});
    }

    render(){
      let {collapseshow} = this.state;
      let navlinks =[
          {title: 'Home', url: this.props.root, icon: 'home'}
          ,{title: 'About Us', url: '/info/about us', icon: 'info-circle'}
          ,{title: 'How it Works?', url: '/info/how it works', icon: 'cogs'}
         ,{title: 'Other Services', url: '/info/other services', icon: 'ellipsis-h'}
      ];
      let renderlink = (link, i) => {
           return (
            <Link key={i} to={link.url} className="nav-link" activeClassName="active">
              {/* {[link.icon ? <i key={i} className={'fa fa-' + link.icon}></i> : '', ' ', link.title]} */}
              {link.title}
           </Link>

           );
      };
            
          if(this.state.isAuthenticated && this.state.user != null){
            navlinks = [...navlinks
                        ,{title: this.state.user.email, url: '/auth/profile'
                          , icon: 'circle'}
                        ,{title: 'Logout', url: '/auth/logout', icon: 'sign-out'}
                      ];
          } else {
            navlinks = [...navlinks
                       , {title: 'Login', url: '/auth/login', icon:  'sign-in'}
                      ];
          }
      
        return (      
        
    <nav className="navbar navbar-expand-md bg-light fixed-top">
      <IndexLink to={this.props.root} className="navbar-brand">
        <img src="/assets/img/logo.png" className="img-fluid" />
      </IndexLink>
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
