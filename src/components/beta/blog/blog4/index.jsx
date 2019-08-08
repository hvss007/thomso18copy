import React from "react";
import Navbar from '../../home/Navbar';
import "./blog.css";
import "./disqus.js"

export default class recentinnovation extends React.Component {
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
              Recent Innovation At IIT Roorkee
            </div>
            <div className="main-blog-bodyparent-date">
              Posted on 06th October'18
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
              Innovation is the buzzword that many hear, but fewer understand. It is the result of solving a problem, even if that problem wasn’t identified. This solution is a new product or process which is implemented and generates increased value. Usually, that value is increased profit. If the new invention that is implemented does not make something better in some way, then the action was pointless.
                IIT Roorkee one of the oldest technical institute in Asia has a mission “To create an environment that shall foster the growth of intellectually capable, innovative and entrepreneurial professionals, who shall contribute to the growth of Science and Technology in partnership with industry and develop and harness it for the welfare of the nation and mankind.” Following its mission, over several years IIT Roorkee has produced many eminent personalities who have made a paradigm shift through their innovation in diverse fields. Continuing this legacy, we present some of the most exciting innovations that have been recently performed by IIT Roorkee alumni.

               <br /><br /><strong>Inflatable Helmet</strong>
              The helmet that can be worn like a collar around the neck and inflates like an airbag before impact during an accident. Made of Kevlar, a synthetic fibre used to make bullet-proof jackets, the inflatable helmet offers better protection than traditional ones. The helmet works like an airbag that opens up in less than 100 milliseconds of impact. The traditional helmets protect only against skull fractures and not against internal brain bleeding and damage caused by the rapid deceleration during an accident. The impact assessment showed inflatable helmets can reduce the peak crash acceleration up to four times, meaning it absorbs the kinetic energy generated during the crash and then releases it slowly, lowering damage from impact thus reducing the risk of life-threatening injuries.

               <br /><br /><strong>Railway track health monitoring using drones</strong>
              The researcher at IIT Roorkee has developed a computer vision approach for the monitoring of railway tracks using drones and satellite data. The track-monitoring task involves inspection of various railroad components such as loose rail fasteners, defect in clips and switches, broken and displaced crossings, cracks in various components of track and gauge measurement between the rails. The new technology titled “Railtel” will enable inspection of rail tracks which will be done by applying image processing and computer vision techniques on drone images. Images and generated data obtained from the drone will be analysed which will give useful information about the health of the rail tracks. The method will improve efficiency, objectivity and accuracy in the inspection system which is often unattainable through human inspection.

               <br /><br /><strong>‘PuFF’ smoke filter</strong>
              A PhD student from IIT Roorkee has developed an affordable ‘safe-smoke’ cigarette filter using the wonder material graphene. In laboratory tests, the cigarette filter produces the desired results. The test established that the filter eliminates tar (the particulate matter which generated by burning tobacco) by 80% carcinogenic toxins by 60% and heavy metalsby 50% from cigarette smoke. The patent-pending product reduces the risk of smoking for over 1 billion smokers worldwide. It reduces the tar content, heavy metal content as well as other carcinogenic constituents from tobacco smoke, thus reducing the risk of cancer and other pulmonary disorders arising due to smoke.

               <br /><br /><strong>Triwizard Chess</strong>
              IIT Roorkee alumnus Aditya Nigam has reinvented how the game of chess is played. Triwizard Chess, it is India’s first chess for three players and is a strategy game that tests one’s survival and killer instincts, at once. With normal chess’s rules kept intact further rules include the white plays first, thereafter the grey and then the black, turning clockwise. This chess allows a player to ‘Check’ the other two player’s kings simultaneously. With many more exciting features, this new invention will revolutionize the gaming industry and the way contemporary chess to be played.

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
