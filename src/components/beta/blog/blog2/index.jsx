import React from "react";
import Navbar from '../../home/Navbar';
import "./blog.css";
import "./disqus.js"

export default class blog extends React.Component {
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
              LitFest
            </div>
            <div className="main-blog-bodyparent-date">
              Posted on 23st September'18
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
            Literature is the thread that weaves the array of words with the power of expressions. It is the symphony of creative thoughts and the orchestration of platitudes. Literature tends to gravitate the universe to the experiences of human lives and levitate the imagination of the human mind to exorbitant levels. The beauty of literature cannot be quantified, it can only be felt by one's heart. It has the potential to fill life into the lifeless things, light into the dullest objects and colours into the most colourless entities. To explore this soft intellectual side of the human mind, Thomso- the annual cultural festival of IIT Roorkee- has decided to take up the ambitious venture to conduct Litfest, a Literature Festival. Sensing the growing inclination of the youth towards the works of literature Thomso felt the need to broaden its horizons and quench the thirst of proficient writers, eloquent poets and all the other literature lovers. Embracing the beauty of literature, Litfest brings the following events for you to rejoice.<br/> <br/>


            <strong>Literati</strong>: A plethora of events under the banner of Literati. We are organizing 4 events in some of the most popular formats:<br/>
            1. JAM (Just a minute)<br/>
            2. Anonymity (An on-the- spot letter writing competition)<br/>
            3. Spell Bee (An on-the-spot spelling competition)<br/>
            4. Word Games (Fun vocabulary based games)<br/><br/>

            <strong>Open Mic</strong>: Open mic is an event where anyone can grab the mic and perform. The performer is handed the mic to perform live on the stage in front of the audience. The event is focused on performance arts like poetry, spoken word, stand-up comedy, etc.<br/><br/>

            <strong>IITR MUN</strong>: True to the spirit of the United Nations, this event strives to foster a constructive forum for open dialogue on complex global issues, including international peace and security, and economic and social progress. During the conference, students learn the importance of balancing national interests with the needs of the international community, while also learning about the powers and limitations of international negotiation. Delegates will preserve their countries’ national policy while negotiating in the face of other, sometimes conflicting, international policies<br/><br/>

            <strong>Spin A yarn</strong>: Are you passionate about entrancing people in the mystique of yourstories? Do characters come alive in your mind, flourishing under the light of creativity and doing a better job than truth itself? This event lets the participants put their heads together over an intriguing comic strip to create enthralling stories in front of an engaging audience. Storytelling is an art, and even more so when people want to listen. So buckle your seatbelts and let the story take over in this magical journey of storytelling and adventure, enrapturing listeners to your world.<br/><br/>

            <strong>LitMart</strong>: Litmart is your very own bookstore,dedicated to books and Literature. A 3-day long extravaganza of book launches, displays, author interaction and even book pitching. This extravaganza will be marked by book launch by authors like Alok Aggarwal and Anubhav Shrivastava, display of books by publications like Srishti, Leadstart etc., and interaction with authors of many famous books.<br/><br/>

            <strong>Kavi Sammelan</strong>: A poem defines the very sense of serenity and provides evasion from the idea of materialism.Poetry is when an emotion has found its thought and the thought has found words. Kavi Sammelan is a gathering of poets where the participants recite their poetry to each other and have a general discussion of literary issues. Do come to sense the overflow of feelings.<br/><br/>

            <strong>Desi Twist</strong>: Remodel popular stories the way you want, modify endings and give literary classics that tangy twist.<br/><br/>

            <strong>Book Pitching</strong>: Engage with some of India’s finest authors as they discuss their latest works in a candid event suffused with literary vibrancy.<br/><br/>

            <strong>Slam Poetry</strong>: Literature tends to gravitate toward concepts universal to the human experience, but there is something special about the experience of watching an author recite a poem tailor made for performance. We invite you on a journey to experience poetry in its most natural and raw form, and to witness our slam poets performing live at the Thomso LITFest.<br/><br/>

            <strong>Parliamentary Debate:</strong>Debating is an integral part of a democracy. Debate stimulates and refines communication skills that empower individuals to speak for themselves, to discover and use their own voices. This is your chance to showcase your skills as an orator and have fun as well."<br/><br/>

            Mark the dates - 26,27,28 October - to be a part of one of the greatest cultural extravaganza- THOMSO. 


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
