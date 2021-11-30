import * as React from 'react';

export class Carousel extends React.Component<any, any>{
    render(){       
       var id = this.props.id;
       var slides = this.props.slides;
       return (
       <div id={this.props.id} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {
                  slides.map(function(slide, i){
                     return <li data-target={'#' + id} data-slide-to={i} key={i} className={(i==0 ? 'active' : '')}></li>;
                  })
                }
            </ol>
            <div className="carousel-inner" role="listbox">
                {
                    slides.map(function(slide, i){
                        return    <div className={'carousel-item ' + (i == 0 ? 'active' : '')} key={i}>
                                      <img className={slide.name} src={slide.image} alt={slide.name}/>
                                      <div className="container">
                                            <div className="carousel-caption d-none d-md-block text-left">
                                                 <h1>{slide.title}</h1>
                                                 <p>{slide.description}</p>              
                                                 <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
                                             </div>
                                       </div>                            
                                  </div>;
                    })
                }
            </div>
      <a className="carousel-control-prev" href={'#' + id} role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href={'#' + id} role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>            
       </div>
       );
     }
}