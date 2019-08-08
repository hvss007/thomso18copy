import React from 'react';
import './updatedcard.css';
import eye from '../img/eye.png';
export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      shown: true,
      button: true,
      date: '',
      month: '',
      year: '',
      hours: '',
      minutes: '',
      seconds: ''
    };
  }
  componentDidMount() {
    if (this.props.data && this.props.data.created_time) {
      const created_time = this.props.data.created_time
      const d = new Date(created_time)
      this.setState({
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds()
      });
    }
  }
  render() {
    const { date, month, year, hours, minutes, seconds } = this.state
    return (
      <div className="maindiv" >
        <div className="innerdiv">
          <div className="wrapper">
            <div className="card">
              <div className="card__image">
                <img src={this.props.data.full_picture} alt="fullpicture" className="border-tlr-radius" />
              </div>
              <div className="card__content card__padding">
                {/* <div className="card__share" title="Share on Facebook"> */}
                {/*   <div className="share-toggle share-icon" onClick={() => this.props.sharePost(this.props.data.id)}> */}
                {/*     <a><img src={share} alt="fblogo" /></a></div> */}
                {/* </div> */}
                <div className="card__share2" title="View on Facebook">
                  <div className="share-toggle share-icon">{this.props.data.link ? <a href={this.props.data.link} style={{ textDecoration: 'none' }} target="_blank" >
                    <img src={eye} alt="fblogo" /> </a> : null}
                  </div>
                </div>
                <div className="card__meta">
                  <div>
                    <span className="posted">Posted on</span><span className="date">{date}-{month}-{year}</span>
                  </div>
                  <div>
                    <span className="time">Time</span><span className="hms">{hours}:{minutes}:{seconds}</span>
                  </div>
                  <div>
                    <span className="summary cards-likes-styling">Likes</span><span className="summary-span">{this.props.data.likes.summary.total_count}</span>
                  </div>
                </div>
                <div className="card__article">
                  <p>{this.props.data.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

    );
  }
}
