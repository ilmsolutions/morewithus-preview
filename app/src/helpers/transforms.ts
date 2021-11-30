export const transformSettings = (data) => {
  let _data = JSON.parse(JSON.parse(data));
  let __data = _data.map((d, i) => {
      var _d = Object.assign({}, {label: d.label, 
                                  value: d.label,
                                  children: []});
      if(d && d.custom && d.custom.options){
        _d.children = d.custom.options.map(opt => {
           return {
             label: opt,
             value: opt
           };
        });                                          
      }

      return _d;
  })
  return __data;
}


export const transformSubscriptionDTO = (o) =>{
    const regex = /,(?!$)([^,]*),(?!$)([^,]*)?,(?!$)([^,]*)?,/i;    
    let m = o.path.match(regex);
    return {
       id: o._id,                        
       title: o.label,
       duration: o.custom.duration,
       price: o.custom.price,
       ispromoted: o.custom.ispromoted,
       promotionprice: o.custom.promotionprice,
       promotionexpireson: o.custom.promotionexpireson,
       isfeatured: o.custom.isfeatured,
       description: o.description,
       features: o.custom.features ? o.custom.features : [],
       active: o.active,
       order: o.order,
       usercontext: m[2],
       usertype: m[3]
    };
 }