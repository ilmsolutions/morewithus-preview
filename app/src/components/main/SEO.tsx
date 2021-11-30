import * as React from 'react';
import {Helmet} from 'react-helmet';

interface ISEOProps extends React.Props<SEO>{
  metatags: Array<object>
  ,type?: string
}

export class SEO extends React.Component<ISEOProps, any>{
    constructor(props: ISEOProps){
        super(props);
    }

    render(){
        let {metatags, type} = this.props;
        let metatag = metatags && type ? metatags.filter(mt => {
              return type.toLowerCase() == mt['type'].toLowerCase();
        })[0] : (metatags ? metatags[0] : null);

        const rendermeta = (meta) => {
            if(meta != null){
                return <Helmet>
                          <title>{meta['title']}</title>
                          <meta name="description" content={meta['description']} />    
                          <meta name="keywords" content={meta['keywords']} />
                      </Helmet>;
            }
        };
        return (
            <div className='meta'>
               {rendermeta(metatag)}
            </div>
        );
    }
}
