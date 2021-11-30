import * as React from 'react';
import * as R from 'ramda';

export var Promised = R.curry((promiseProp: string, Decorated: any) => class extends React.Component<any, any> {
    constructor(props) {
	super(props);
	this.state = {loading: true, error: null, value: null};
    }
    
    componentWillMount(){
    }

    render() {
	if (this.state.loading) {
	    return <span>Loading...</span>;
	}
	else if (this.state.error !== null) {
	    return <span>Error: {this.state.error.message}</span>;
	}
	else {
        var propsWithoutThePromise = R.dissoc(promiseProp, this.props);
	    return <Decorated {...propsWithoutThePromise} {...this.state.value}/>;
	}
  }
    
    componentDidMount() {
	this.props[promiseProp].then(
	    value => this.setState({loading: false, value: value}),
	    error => this.setState({loading: false, error: error}));
    }
});

