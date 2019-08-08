import React from 'react';
import FetchApi from '../../../utils/FetchAPI';
import AuthService from '../../../handlers/main/AuthService';

export default class UpdateImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      disabled: true,
      errors: '',
      hidden: true
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.Auth = new AuthService();
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state && this.state.file && this.state.file.size > 101200) {
      this.setState({ disabled: true, errors: 'Max image sixe of 100 kb exceeded' })
    } else {
      let data = {
        image: this.state.imagePreviewUrl,
        format: this.state.file.type
      }
      const token = this.Auth.getToken()
      FetchApi('post', '/api/main/updateImage', data, token)
        .then(res => {
          if (res && res.data && res.data.success) {
            console.log(res.data)
            
            // this.props.history.push('/main');
          }
          else {
            this.setState({ disabled: true, errors: 'Unable to upload' })
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        disabled: false,
        hidden: false
      });
      this.props.imagePrev(reader.result);
    }
    reader.readAsDataURL(file)
  }

  render() {
    let { disabled } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            {/* <span style={{ fontSize: '14px' }}>Upload image</span> */}
            <input
              className="updateimage-file-input"
              name="file"
              type="file"
              onChange={(e) => this.handleImageChange(e)}
              accept="" />
          </div>

          <button className={this.state.hidden ? "updateimage-file-button hidden" : "updateimage-file-button"} type="submit" disabled={disabled}> Upload</button>
        </form>
        <small>{this.state.errors}</small>
      </div>
    )
  }
}
