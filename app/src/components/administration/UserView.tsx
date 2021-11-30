import * as React from 'react';
import  '../../helpers/date';

const rb = ((v, pos) => {
    var cc = pos ? (v ? 'success' : 'danger') : 
                   (v ? 'danger' : 'success');
    return <i className={'fa fa-' + (v ? 'check' : 'times') + ' text-' + cc}></i>;
}),
rd = (v => {
    return new Date(v).toDisplay();
}),
rs = ((v, pref) => {
    pref = pref || '';
    return v ? v + ' ' + pref : '-';
}),
rc = (v =>{
    return v ? v.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
        }) : null;
}),
ra = (v => {
    return v && v.length > 0 ? v.join(', ') : '-';
}),
subscriptionDefs = [
    {key: 'orderid', name: 'Order ID'}
    , {key: 'paymentid', name: 'Payment ID'}
    , {key: 'paymentdate', name: 'Payment Date', cell: rd}
    , {key: 'usercontext', name: 'Plan Type'}
    , {key: 'planid', name: 'Plan'}
    , {key: 'orderamount', name: 'Amount Paid', cell: rc}
    , {key: 'isexpired', name: 'Active', cell: (v) => { return rb(!v, true);}}

],
rr = (cols => {
    return (
    <div className='row'>
   {cols.map((col, ci) => {
     return( <dl className='col' key={ci}>
          <dt>{col.label}</dt>
          <dd>{col.value}</dd>
   </dl> );    
   })}
   </div>
    );
}),
rtr = (r, cdefs, ri) => {
   return (
     <tr key={ri}>
          {
              cdefs.map((cdef, ci) => {
                return <td key={ci}>{cdef.cell ? cdef.cell(r[cdef.key]) : r[cdef.key]}</td>;
              })
          }
     </tr>
   );
},
rt = (rws, cdefs) =>{
   return (
   <div className='table-responsive'>
   <table className="table table-sm">
       <thead>
          <tr className='thead-dark'>
             {
                 cdefs.map((cdef, ci) => {
                    return <th key={ci}>{cdef.name}</th>;
                 })
             }
          </tr>           
       </thead>
       <tbody>       
       {rws.map((rw, ri) => {
           return rtr(rw, cdefs, ri);
       })}
       </tbody>
   </table>
   </div>
   );
};


const UserView = ({content}) => {
    return (
        <div className='container'>
           {rr([ {label: 'First Name', value: content.firstname}
                 ,{label: 'Last Name', value: content.lastname}])}
           {rr([{label: 'Email', value: content.email}
                ,{label: 'User Context', value: content.usercontext}])}
           {rr([{label: 'User Type', value: content.usertype}
               ,{label:'Organization', value: content.organizationname}])}
            <address>
                {[<strong key='strong'>Address</strong>, <br key='br-1' />
                  , content.mailingAddress.address1, ', ', content.mailingAddress.city 
                  , <br key='br-2'/>, content.mailingAddress.state
                  , ' ', content.mailingAddress.zipcode]}
            </address>
            {rr([{label: 'Last Login', value: rd(content.lastlogin)}
               ,{label: 'Created On', value: rd(content.createdon)}])}

            {rr([{label: 'Active Employee?', value: rb(content.isactiveemployee, true)}
                  ,{label: 'Active Employer?', value: rb(content.isactiveemployer, true)}
                  ,{label: 'Blocked?', value: rb(content.isblocked, false)}])}

            {rr([{label: 'Registered Employer?', value: rb(content.isregisteredemployer, true)}
                 ,{label: 'Registered Employee?', value: rb(content.isregisteredemployee, true)}
                 ,{label: 'Has References?', value: rb(content.hasReferences, true)}])}

            {rr([{label: 'Jobs Within', value: rs(content.jobsWithinMiles, 'Miles')}
                 ,{label: 'Work Experience', value: rs(content.workExperience, 'Years')}])}
            {rr([{label: 'Description', value: content.description}])}

            {rr([{label: 'Skills', value: ra(content.skills)}])}
            {rr([{label: 'Certifications', value: ra(content.certifications)}])}
            {rr([{label:'Work Areas', value: ra(content.workAreas)}])}
            {rr([{label: 'Available Times', value: ra(content.availableTimes)}])}
            {rr([{label: 'Job Types', value: ra(content.jobTypes)}])}
            {rr([{label: 'Employment Types', value: ra(content.employmentTypes)}])}
            {rt(content.subscriptions, subscriptionDefs)}
        </div>
    );
}


export default UserView;