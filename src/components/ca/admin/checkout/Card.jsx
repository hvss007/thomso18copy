import React from 'react';
import "../../home/updatedcard.css";

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false,
      shown: true,
      button: true,
      date: '',
      month:'',
      year:''
    };
  }

  componentDidMount() {
    if (this.props.data && this.props.data.created_time) {
      const created_time = this.props.data.created_time;
      const d = new Date(created_time);
      const date = d.getDate();
      const month=d.getMonth();
      this.setState({date, month});
    }
  }
  render() {
    return (
      <div className="maindiv">
        <div className="innerdiv">
          <div className="wrapper">
            <div className="card">
              <div className="card__image">
                <img src={this.props.data.full_picture} alt="fullpicture" className="border-tlr-radius" />
              </div>
              <div className="card__content card__padding">
                <div className="card__share2">
                  <div className="share-toggle share-icon">
                    {(this.props.data && this.props.data.likes && this.props.data.likes.summary) ? this.props.data.likes.summary.total_count : 0}
                  </div>
                </div>
                <div className="card__meta">
                  <p>{`Posted on ${this.state.date}/${this.state.month}/${this.state.year}`}</p>
                </div>
                <div className="card__article">
                  <p>{this.props.data.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
