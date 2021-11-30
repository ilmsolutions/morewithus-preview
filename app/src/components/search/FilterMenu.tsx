import * as React from 'react';
import axios from 'axios';
import * as update from 'immutability-helper';
import {functions} from '../../helpers/common';
import {transformSettings} from '../../helpers/transforms';

interface IFilterMenuProps extends React.Props<FilterMenu>{
    cardclass: string,
    filters: object,
    show: boolean,
    applyFilters(object)
 }

export class FilterMenu extends React.Component<IFilterMenuProps, any>{

    constructor(props: IFilterMenuProps){
        super(props);
        this.state = Object.assign({}, this.getInitialState(), {filters: props.filters});
        this.clickHandler = this.clickHandler.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    public getInitialState(){
        //console.log('in initial state');
        return {
          jobtypes: [],
          employmenttypes: [],
          availabletimes: [],
          educationlevels: []
        };
     }

    public componentDidMount(){
        let {jobtypes} = this.state;

        if(jobtypes != null && jobtypes.length > 0)
           return;

        let getFilterResource  = this.getFilterResource;
        let getResource = this.getResource;
    
           
        axios.all([
                   getResource('settings.jobtypes', {
                    transformResponse:[transformSettings]
                   }), getFilterResource('employmenttypes'), 
                   getFilterResource('availabletimes'), getFilterResource('educationlevel')
                ])
        .then((results) => {
           let jobtypes =  Array.prototype.slice.call(results[0].data).map((jobtype) => {
               var value = jobtype.children.map((opt) =>{
                   return opt.value;
               }).join(',');
               return Object.assign({}, jobtype, {value: value});
           });     


           let availabletimes = Array.prototype.slice.call(results[2].data).filter((availabletime) =>{
                  return availabletime.value != 'Anytime';
           });

           let educationlevels = Array.prototype.slice.call(results[3].data).filter((educationlevel) => {
            return educationlevel.value != 'None of the above';
           });

            this.setState({
               jobtypes: jobtypes,
               employmenttypes: results[1].data,
               availabletimes: availabletimes, 
               educationlevels: educationlevels
           }); 
        });
    }

    render(){
        let {jobtypes, employmenttypes, availabletimes, educationlevels, filters} = this.state;
        let {cardclass, show} = this.props;
        const clickHandler = this.clickHandler;
        const checkboxHandler = (key, d, i) => {
            var id = key + '-' + i;
            return <div className="custom-control custom-checkbox" key={i}>
            <input type="checkbox" className="custom-control-input"
                    onClick={clickHandler} value={d.value} id={id}
                    //defaultChecked={filters[key] && filters[key].indexOf(d.value) >= 0}
                    checked={filters[key] != null && filters[key].indexOf(d.value) >= 0}/>
          
          <label className="custom-control-label" htmlFor={id}>
            &nbsp;&nbsp;{d.label}
          </label>                  
          </div>;
        };

        const carddefs = [
           {label: 'Job Types', key: 'jobTypes', render: checkboxHandler.bind(null, 'jobTypes')},
           {label: 'Employment Types', key: 'employmentTypes', render: checkboxHandler.bind(null, 'employmentTypes')},
           {label: 'Available Times', key: 'availableTimes', render: checkboxHandler.bind(null, 'availableTimes')},
           {label: 'Education Level', key: 'educationLevel', render: checkboxHandler.bind(null, 'educationLevel')}
        ];
        let carddata = [
            jobtypes, employmenttypes, availabletimes, educationlevels
        ];

        const cards = carddefs.map((card, i) =>{
            return <div className={"card " + cardclass} key={i} data-key={card.key}>
                <div className="card-body">
                     <h6 className="card-title">{card.label}</h6>
                     <div className="card-text">
                         {carddata[i].map(card.render)}
                     </div>
                </div>
            </div>; 
        });
        return <div className={"col card-columns filter-cards border-top-1 " + 
                                 (show ? 'd-block' : 'd-none')}>
              {cards}
              <div className={"card " + cardclass}>
                 <div className="card-body">
                     <button className="btn btn-success mr-2" onClick={this.applyFilters}>Apply Filters</button>
                     <button className="btn btn-default" onClick={this.clearFilters}>Clear Filters</button>
                 </div>
            </div>               
        </div>;
    }

    clickHandler(e){
      var i = e.target,
          c = (functions.findAncestor(i, 'card') as HTMLDivElement),
          k = c.dataset.key,
          is = c.querySelectorAll('input[type=checkbox]:checked'),
          v = '';
          if(is != null) {
            v= Array.prototype.slice.call(is).map((i) =>{
                return i.value;
            }).join(',');
         }
        this.setState((state) => {
            return update(state, {filters : 
                {[c.dataset.key]: {$set: v}}});
        });
    }

    applyFilters(e){
        let {filters} = this.state;
        this.props.applyFilters(filters);
    }

    clearFilters(e){  
        this.setState({filters: {}});      
        this.props.applyFilters({});
    }
    getFilterResource(resource){
       return axios.get('/api/data/json/' + resource);
    }

    getResource(resource, config?){
       config = config || {}; 
       return axios.get('/api/external/authorization/' + resource, config);
    }

}