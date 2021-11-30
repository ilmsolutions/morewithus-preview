import * as React from 'react';
import {PropTypes} from 'prop-types';

export class Modal extends React.Component<any, any>{ 

    static propTypes: {
       
    }

    constructor(props){
        super(props);
        this.state = Object.assign({}, {show: false}, props);
        this.close = this.close.bind(this);
    }

    componentDidMount(){
        document.body.classList.add('modal-open');
    }

    componentWillReceiveProps(nextProps){
       this.setState(nextProps);
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-open');
    }

    render(){
        let {title, content, renderer} = this.props;
        let {show} = this.state;
        return ( 
        <div>
         <div className={'modal fade ' + (show ? 'show' : '')}>
          <div className='modal-dialog'>
            <div className='modal-content'>
               <h5>{title}</h5>
               <a href='#' title='Close' onClick={this.close} className='d-flex justify-content-end mx-2'>
                  <i className="fa fa-close" />
               </a>
               <div className="modal-body">
                  {renderer({content})}
               </div>
            </div>
          </div>
        </div>{/* modal show */}
        <div className={'modal-backdrop fade ' + (show ? 'show' : '')}
             onClick={this.close}>
          {}
        </div>
       </div>
        );
    }

    close(e){
       let {close} = this.props;
       e.preventDefault();
       this.setState({
           show: false
       });
       close();
       return true;
    }

}

