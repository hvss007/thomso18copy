import React from "react";
import Navbar from '../../home/Navbar';
import "./blog.css";
import "./disqus.js"

export default class socialendeavours extends React.Component {
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
              The Social Endeavours
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
              ‘We rise by lifting others’, Thomso truly abides by these words of Robert Ingersoll, extending its helping hands to bring about a change in society. For one has said that the best way to find yourself is to lose yourself in the service of others. It's said that god has given us two hands, one to help yourself and the second to help others. As Winston Churchill has quoted, “Responsibility is the Price of Greatness”, being the annual cultural festival of a premier institute of the country, Thomso realises its responsibilities towards the society and wish to fix the broken rungs by its small contributions. Thomso being a non-profit organisation truly believes in the spirit of social service and has been actively involved in such activities in order to create a more humane world for us all. Not only Thomso but IIT Roorkee has always been inclined towards the welfare of the society and has always supported the society with its initiatives over the years like NSS, UBA, Anushruti, etc. Thomso firmly believes that development of the society is a matter of utmost importance and hence we have associated with many of such initiatives to stress on the fact that alone we can do so little and together we can do so much.

              <br /><br /><strong>Teach For India:</strong> Teach For India is a nationwide movement that aims to eliminate inequality in education in India. Teach For India believes that one day all children will attain an excellent education and aims to build a movement of leaders who will work to eliminate educational inequity. Over the years, Thomso has been proud and grateful to have Teach for India as its official social partner.
              <br /><br /><strong>Kailash Satyarthi Children’s Foundation(KSCF):</strong> The Kailash Satyarthi Children’s Foundation (KSCF) envisions a world where all children are free, safe, healthy, in school, and have the opportunity to realize her/his potential. Their mission is to end slavery and child labor and ultimately end violence against children. To make this a reality, Mr. Satyarthi’s have scaled almost 4 decades of work at both the grassroots and global policy level. His lessons learned guide the Foundation’s work to engage children and youth as part of the solution, build greater
                collaboration between governments, business and communities, ensure effective national and international laws, scale know-how and successful practice and create partnerships with key stakeholders. To learn more please visit: http://www.satyarthi.org.in/
                <br /><br /><strong>Sofia educational and welfare society:</strong>  NGO Sofia has taken the initiative to facilitate rehabilitation of sexual harassment victims and give them support and care that they need and deserve. A team of sensitive people, NGO Sofia strives to strengthen the position of women by making them educated and financially independent. Together, NGO Sofia and Team Thomso pledge to help create a better world for our women so they too can live a life of dignity and pride.
                <br /><br /><strong>Green Campus Initiatives:</strong>   IIT Roorkee always had sustainable initiatives at the core of all activities, despite the relatively small campus covering only 365 acres with over 8000 students, 450+ faculty and 1000+ staff at various levels. IIT Roorkee campus has significant greenery covering all parts of the campus, something that is appreciated by all visitors on campus. Using Solar PV for electricity generation as well as Solar Thermal for cooking and water heating covering the entire campus is an iconic initiative undertaken by the faculty and students for maximum utilization of energy at the Institute. National Social Service Scheme (NSS) volunteers of the institute, primarily the undergraduate and postgraduate students are also going to propagate these ideas amongst the neighbourhood villages.

In addition to these, Thomso has annually associated itself with numerous social initiatives from across the country which includes the likes of CRY-Child Rights and You, Smile Foundation, Waste Warriors-Dehradun, Anandi Sheroes, People for Parity and Kiran, to further their cause and contribute its bit towards a bright future for the country. With a dream to create a better world for all of us to live in, Thomso will leave no stone unturned to achieve this goal.


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
