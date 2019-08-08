import React from "react";
import Navbar from '../../home/Navbar';
import "./blog.css";
import "./disqus.js"

export default class karwaan extends React.Component {
  handleSharefb = () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=ww.thomso.in/blog", "", "left=400,width=600,height=600")
  }
  handleSharelinkedin = () => {
    window.open("https://www.linkedin.com/shareArticle?mini=true&url=www.thomso.in/blog&title=thomsoblog&source=LinkedIn", "", "left=400,width=600,width=600,height=600")
  }
  handleSharetwitter = () => {
    window.open("https://twitter.com/intent/tweet?text=www.thomso.in/blog", "", "left=400,width=600,height=600")
  }
  handleSharepinterest = () => {
    window.open("http://pinterest.com/pin/create/button/?url=www.thomso.in/blog", "", "left=400,width=800,height=600")
  }
  render() {
    return (
      <div className="main-blog-parent">
        <div className="main-blog-header">
          <Navbar />
        </div>
        <div className="main-blog-child">
          <div className="main-blog-firstchild">
            <div className="main-blog-bodyparent-name">
              Karwaan - Thomso Zonals
            </div>
            <div className="main-blog-bodyparent-date">
              Posted on 08th October'18
            </div>
          </div>
          <div className="main-blog-secondchild">
            <div className="main-blog-icons">
              <div className="main-blog-body-icon1" onClick={this.handleSharefb}>
              </div>
              <div className="main-blog-body-icon4" onClick={this.handleSharelinkedin}>
              </div>
              <div className="main-blog-body-icon2" onClick={this.handleSharetwitter}>
              </div>
              <div className="main-blog-body-icon5" onClick={this.handleSharepinterest}>
              </div>
            </div>
            <div className="main-blog-image">
              <div className="main-blog-image-child">
              </div>
            </div>
          </div>
          <div className="main-blog-thirdchild">
            <div className="main-blog-body-text">

              Starting from 1982, for the last 35 years IIT Roorkee has been richly celebrating its cultural fest every year, with thousands of crowd from all across the country. THOMSO, a much celebrated package of art, culture, expression with an overflow of excitement and energy, highlights IIT’s cultural depth and ignites pride in its heritage and legacy. The cultural fest of IIT Roorkee serves as its one of the premier brand tag and a signature which represents this institute of national importance all over the country. Every year, hundreds of colleges come to participate and get themselves captured in the aura of captivating events held by Thomso. This comes along with a congregation of different cultures, ideas and innovations all together under a single roof. Such an integration of thousands of students is in itself a very great task to accomplish. The participants are the heart and soul for the fest. Without their involvement, Thomso will not be anything more than just a name and hence we try to ensure maximum participation in this annual celebration of culture and intellect. Expanding its horizons to reach out to a wider audience, Thomso organised zonals for the very first time in 2k17. Providing opportunities to directly get into the finals of highly diverse and competitive events, team Thomso’17 carried out its talent hunt in Jaipur, Delhi and Chandigarh. The overwhelming participation in the zonal events encouraged us to cover more cities in Thomso’18 and hence the ‘Karwaan’ of Thomso moved to Delhi, Jaipur, Lucknow and Bhopal. Officially known as ‘Karwaan’ the Zonals of Thomso are an initiative to connect Thomso with the masses and represent the culture of IIT Roorkee to various parts of the nation. For conducting the events, we often rely on some of the trusted institutes in various cities and then we collaborate with them to conduct zonals competitions at their own campus where we invite contestants and the teams from across the city to showcase their talent. And as already mentioned, the winners of those zonals enjoy the privilege of getting a direct entry to the finals of much reputed competitions at Thomso.
              We are thankful for the overwhelming response which was beyond our broadest expectations. We truly appreciate the great enthusiasm among all the contestants who participated in the events. An overall of around over 3000 footfall was observed this time at the zonals. Such excitement for Thomso from different colleges has bolstered our spirits and has encouraged us greatly to take Thomso to the whole new levels. And for years, it has been shown by the ever increasing reach and popularity of Thomso. We look forward to leveling up the scale of organisation of zonals and take the grandeur of Thomso to exorbitant levels.

            </div>
          </div>
          <div className="main-blog-footer-disqus">
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          </div>
        </div>
      </div>
    );
  }
}
