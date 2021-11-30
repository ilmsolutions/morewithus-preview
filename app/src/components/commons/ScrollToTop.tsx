import * as React from 'react';

export class ScrollToTop extends React.Component<any, any>{  

    componentDidMount() {
        //console.log('am i getting in here??');
        window.scrollTo(0, 0)
      }
    
      componentDidUpdate(prevProps) {
        //console.log('component did update');
        if (this.props.location !== prevProps.location) {
          window.scrollTo(0, 0)
        }
      }
      render() {
        return null
      }   
}