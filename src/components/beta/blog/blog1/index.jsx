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
              Behind The Scenes
            </div>
            <div className="main-blog-bodyparent-date">
              Posted on 1st September'18
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
              “Rome wasn’t built in a day”, neither is Thomso. Be it a magnificent city or a magnificent fest, you have to lay bricks every hour to make things happen.<br /><br />
              For those who are not so familiar with the name, Thomso is the annual cultural festival of Indian Institute of Technology, Roorkee.
              It is a three day cultural extravaganza organised in the month of October that celebrates the fervour of youth.
              Initiated as a cultural fest, Thomso has now acquired the credentials of being “The Annual Youth Festival of Uttarakhand”.<br /><br />
              Over the years, numerous people have worked immensely hard to bring Thomso the glory and prestige that it enjoys today.
              Succeeding ‘Tarang’ (the earlier name of the cultural fest) in 1982, Thomso has been winning hearts for more than 35 years now.<br /><br />
              Every year the team starts afresh to present before you a grand fest that is a spectacle for the masses; with only two things in possession – reputation
              that the fest upholds and the motivation that every individual holds to take the grandeur of Thomso to a whole new level and to outshine all of its previous editions.<br /><br />
              The initial step is to finalise the theme-the central idea around which the fest revolves.  After a lot of heated discussion and intense brainstorming,
              we come with a theme and begin to work. Now with the theme in hand, we move on to our sponsors to gather the required financial assistance and other important resources.
              The sub-urban location of Roorkee poses a problem to our endeavours but the team works day in and out to surmount this issue. The Sponsorship team starts working as
              early as May to get maximum associations from reputed brands at national and international levels. The members of the team devise innovative and some out-of-the-box
              methods of marketing and branding and use them to promote the sponsors at the national level. Both Above and Below The Line marketing techniques are employed to enhance
              the outreach of Thomso throughout India by more collaborations and partnerships. Due to this hard work, Thomso has been fortunate enough to associate with well-renowned
              brands such as Hero, Colors Of Youth, ONGC, GAIL, NBCC, Zebronics and many more in the recent years.<br /><br />
              And simultaneously, the lifeline of the fest - its events, are planned. With 150+ events in line, the events team has a mammoth task to accomplish.
              Every year events are added to and removed from the fest in an effort to intensely engage audiences and gain maximum viewership.
              Once the list of events is finalised, we step on to define their details. A lot of brain goes into planning of events and deciding their details; even the tiniest of
              details cannot be overlooked by the team members. A rulebook is prepared that includes specifications of all the events and rules of all the competitions. The date, venue,
              time and coordinators of the events are decided ensuring that there are no clashes. Also we need to see the feasibility of the logistics and assure that there is no objection
              from the administration. Another major task is to select the judges for the competitions and celebrities for the pronites, and negotiate with them to be a part of Thomso.<br /><br />
              According to the stats, ninety percent of the success of any product or service depends on its promotion and marketing. Although, Thomso is a big name which is widely known
              yet at our end we need to ensure maximum participation. Thomso receives a footfall of over 40,000 people from more than 1000 colleges across the country. And these numbers
              keep increasing every year as a result of the never-ceasing efforts of the marketing & promotions team. For promotions, the team goes to several colleges and gives presentations about Thomso.
              As offline promotions, a lot of calling is done by the team members to remind people about the resurgence of Thomso and to turn a lot of maybes into yes. Though we do face rejections at times
              yet we continue to work with full spirits.To expand our reach, Zonals are also organised that provide opportunities to the participants to directly reach the finals of the highly diverse competitions of Thomso.
              Online marketing goes hand in hand with offline marketing. We try to maximise our reach through Facebook, Wikipedia, Instagram and numerous other online sources. The Web-developers and designers keep their
              shoulders on wheels to help the marketing team reach their goals.<br /><br />
              As the dates of fest draw closer, we start looking after the decorations - a matter of prime importance. Instead of settling for artificial and other paid alternatives, we go for the handmade decorative
              articles prepared by the students of IITR themselves. The decorations signify our perception of the theme and convey these thoughts to the viewers. Students pour in all their creativity and hard work to
              make the campus look beautiful.<br /><br />
              And finally the magical 3 days arrive. Although Thomso is a three day extravaganza, the events start a night before, popularly called the Day 0 of Thomso. The major efforts of the 3 days goes into
              accommodation, controls, security, event management and hospitality.<br /><br />
              Controls majorly include the registration of participants. With thousands of people visiting the fest, the work of controls section is quite hectic and backbreaking. The participants are provided with
               ID cards, itinerary, food coupons, t-shirts and accommodation details. This section is also the information provider and the ear that hears all the complains.<br /><br />
              The next section is accommodation. To accommodate participants in the hostels is quite a cumbersome process. Initially, we talk to the hostel wardens to acquire the details of accommodation and as per the
               number of registrations mattresses are put up in the hostels. Team Thomso takes a survey of the allotted rooms and very wisely assigns the number of people who are to stay in that particular room. We tend
                to be very helpful to our attendees, and try to give the best solution in case of a genuine problem. Our volunteers are omnipresent at hostels to assist whenever necessary.<br /><br />
              Further in queue is hospitality- the upgraded version of accommodation where we deal with celebrities, guests and the other important personalities. For the period of these 3 days, we have to look after
               their travel, food, comfort, security, accomodation and also ensure that they reach to their events on time.<br /><br />
              Another matter of prime importance is the security of the campus. Thomso is the time of the year when people enjoy their hearts out. And we have to assure that this fun-time isn’t spoiled by occurrence of any
              illegal activities. So as a preventive measure we identify all the dark areas of the campus and put up CCTV cameras. Extra security guards are put on duty by the administration and even the student volunteers help to control the crowd at the major events.<br /><br />
              Event management is another crucial task. Events are the heart of fest and it is important to ensure their proper functioning. From a missing full stop to a missing guest, everything falls on the heads of
               the event management team. We need to make certain that the events start on their scheduled time, the guest reaches the venue, all the participants are present, the event is properly coordinated, all the
                equipments are working properly, all the required things have reached their venue and also encounter the unexpected issues. For the three days, the team stands on its toes to handle all the event operations.
              And hence the fest ends - the fest, not our work. The post fest work is equally important for us. The immediate after-fest work includes removal of the campus decoration, return of the articles brought in for
              accommodation, looking after departure of the guests, returning of security money to the participants,etc. Later, our work involves providing certificates to the participants, volunteers and the coordinators,
               making payments to the winners, preparing reports for the sponsors and a lot more. With this, a major fraction of our work ends and after a rest of few weeks, the work for the next edition starts.<br /><br />
              A single event can awaken within us a stranger totally unknown, such is the magnanimity of Thomso. The moment Thomso concludes is a moment of immense pride for all of us. Success of such a grand event brings
              in a sense of achievement. It teaches us to keep believing. Being a part of the dream team teaches y, we learn patience, leadership, decision-making and all the other life-hacking skills. The hard work of the
              team was equally supported by the administration, our generous sponsors and our beloved audiences. Though everyone at Thomso tried to deliver their best but there have been times when we stumbled during our endeavours.
               We truly believe that perfection is attained through a slow and arduous process of making mistakes. We would try to grasp our fallacies and improve the same to take Thomso to new heights of fame, scaling its repute at exorbitant levels.
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
