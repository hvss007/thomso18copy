import React,{Component} from 'react';
import astronaut from '../home/src/img/astronaut white bg gif.gif'
export default class Loadersvg extends Component{
    render(){
        return(
            // <svg className="common-loader-loader-star" xmlns="http://www.w3.org/2000/svg" version="1.1">
            //     <polygon points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 " fill="#18ffff" />
            // </svg>
            <img className="loaderloaderloader" src={astronaut} alt="loader"/>
            )
    }
}
