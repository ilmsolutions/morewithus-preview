import * as React from 'react';
import {PropTypes} from 'prop-types';


class DataWrapper extends React.Component<any, any>{
  static childContextTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  };

   getChildContext(){
       return {
           data: this.props.context
       };
   }

   render(){
      return (
          <div>
          {this.props.children}
          </div>
      );
   }
}

export default DataWrapper;