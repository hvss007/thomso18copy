const Function = () => {
    var countid1 = document.querySelector('#numberchange1 span');
    var count1 = document.querySelector('#numberchange1 span').innerText;
    var countid2 = document.querySelector('#numberchange2 span');
    var count2 = document.querySelector('#numberchange2 span').innerText;
    var countid3 = document.querySelector('#numberchange3 span');
    var count3 = document.querySelector('#numberchange3 span').innerText;



    function counting(countup, countupid, currCount, temp) {
        //   var temp=0;

        if (currCount < countup) {
            currCount += temp;
            countupid.innerText = currCount;
            setTimeout(function () {
                if (currCount < countup) {
                    counting(countup, countupid, currCount, temp);
                }
            }, 75);
        }
        else {
            countupid.innerText = countup;
        }
    }
    var UID = {
        _current: 0,
        getNew: function () {
            this._current++;
            return this._current;
        }
    };
    HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
        var _this = this;
        var _sheetId = "pseudoStyles";
        var _head = document.head || document.getElementsByTagName('head')[0];
        var _sheet = document.getElementById(_sheetId) || document.createElement('style');
        _sheet.id = _sheetId;
        var className = "pseudoStyle" + UID.getNew();
        _this.className += " " + className;
        _sheet.innerHTML += " ." + className + ":" + element + "{" + prop + ":" + value + "}";
        _head.appendChild(_sheet);
        return this;
    };
    // function mobileoptionsreveal(){
    //     var x=document.getElementById("mobopid");
    //     var t1=document.querySelector(".toggle span:nth-child(1)");
    //     var t4=document.querySelector(".toggle span:nth-child(4)");
    //     var t3=document.querySelector(".toggle span:nth-child(3)");
    //     var t2=document.querySelector(".toggle span:nth-child(2)");
    //     var cimg=document.querySelector(".centreimage");
    //     var togcir=document.querySelector(".toggle");
    //     if (x.style.visibility === "hidden") {
    //       togcir.pseudoStyle("before","transform","scale(25)");  
    //       t1.classList.add("togt1");
    //       t2.classList.add("togt2");
    //       t3.classList.add("togt3");
    //       t4.classList.add("togt4"); 
    //       // cimg.style.background="rgba(26,26,26,.6)";   
    //       setTimeout(x.style.visibility = "visible",2000);
    //       // var color = window.getComputedStyle(
    //       // document.querySelector('.element'), ':before'
    //       // ).getPropertyValue('color')
    //       // }
    //       }
    //     else {
    //           x.style.visibility = "hidden";
    //           t1.classList.remove("togt1");
    //           t2.classList.remove("togt2");
    //           t3.classList.remove("togt3");
    //           t4.classList.remove("togt4");
    //           togcir.pseudoStyle("before","transform","scale(1)");
    //       }
    // }
    var svgcorrection = document.querySelector("#mainattractioninternalsvgcontainerlitfestsvg");
    if (window.innerWidth <= 900) {
        svgcorrection.setAttribute("viewBox", "0 -70 250.333 174.333");
    }
    else {
        svgcorrection.setAttribute("viewBox", "0 0 251.333 106.333");
    }
    function pathPrepare(el) {
        var lineLength = el.getTotalLength();
        el.style.strokeDasharray = lineLength;
        el.style.strokeDashoffset = lineLength;
    }
    var litfestsvgline1 = document.getElementById("litfestsvg");
    var workshopssvgline = document.getElementById("workshopssvg");
    var zonalssvgline = document.getElementById("zonalssvg");
    var onlineeventssvgline = document.getElementById("onlinesvg");
    var onlineeventssvgline1 = document.getElementById("onlinesvg1");
    var carnivalssvgline = document.getElementById("carnivalssvg");
    // prepare SVG
    pathPrepare(litfestsvgline1);
    pathPrepare(workshopssvgline);
    pathPrepare(zonalssvgline);
    pathPrepare(onlineeventssvgline);
    pathPrepare(onlineeventssvgline1);
    pathPrepare(carnivalssvgline);
    // init controller
    var ScrollMagic = window.ScrollMagic
    var controller = new ScrollMagic.Controller();
    var TimelineMax = window.TimelineMax;
    var Sine = window.Sine;
    var TweenMax = window.TweenMax;
    var Power0 = window.Power0;
    var Power1 = window.Power1;
    var Power3 = window.Power3;
    // build tween
    // var images=["./s1-01.png","s2-01.png","s3-01.png"];
    // var obj ={curImg:0};
    // var backgroundanimation1=TweenMax.to(obj,0.5,
    //         {curImg:images.length-1,
    //             roundProps:curImg,
    //             repeat:-1,
    //             immediateRender:true,
    //             ease:linear.easeNone,
    //             onUpdate:function(){
    //                 document.querySelector("#parallaxscene").style.background=images[obj.curImg];
    //             }

    //         })
    var litgon = document.querySelectorAll(".gon");
    var workgon = document.querySelectorAll(".workgon");
    var zongon = document.querySelectorAll(".zongon");
    var onlinegon = document.querySelectorAll(".onlinegon");
    var carngon = document.querySelectorAll(".carngon");
    function ab(temp) {
        var time = 1,
            tl = new TimelineMax({
                yoyo: false
            }),
            gons = temp;
        tl.timeScale(30);
        function randy(min, max) {
            return Math.floor(Math.random() * (1 + max - min) + min);
        }
        for (var i = 0; i < gons.length; i++) {
            tl.set(gons[i], {
                x: randy((-400 * (400 / i)) - 300, (400 * (400 / i)) + 300),
                rotationY: randy(-400 * (i / 100), 400 * (i / 100)),
                rotationZ: randy(-400 * (i / 100), 400 * (i / 100)),
                y: randy((-400 * (300 / i)) - 300, (400 * (300 / i)) + 300),
                rotation: randy(-400 * (i / 100), 400 * (i / 100)),
                rotationX: randy(-400 * (i / 100), 400 * (i / 100)),
                opacity: 0
            });
        }
        for (var j = 0; j < gons.length; j++) {
            tl.to(gons[j], time * 2 + 70, {
                rotationY: 0,
                rotationZ: 0,
                x: 0,
                opacity: 1,
                ease: Sine.easeOut
            }, (j / 5));
        }
        for (var k = 0; k < gons.length; k++) {
            tl.to(gons[k], time + 70, {
                rotation: 0,
                rotationX: 0,
                y: 0,
                ease: Sine.easeOut
            }, (k / 5));
        }
        //   for (var i = 0; i < gons.length; i++) {
        //     tl.to(gons[i], time + 100, {
        //       y: randy((-400*(i/200))-50, (400*(i/200))+50),
        //       rotation: randy(-400*(i/100), 400*(i/100)),
        //       rotationX: randy(-400*(i/100), 400*(i/100)),
        //       ease: Sine.easeInOut
        //     }, time + (gons.length/5) + (i/5)*2 + 100);
        //   }
        //   for (var i = 0; i < gons.length; i++) {
        //     tl.to(gons[i], time*2 + 100, {
        //       x: randy((-400*(i/50))-50, (400*(i/50))+50),
        //       rotationY: randy(-400*(i/100), 400*(i/100)),
        //       rotationZ: randy(-400*(i/100), 400*(i/100)),
        //       opacity: 0,
        //       ease: Sine.easeInOut
        //     }, (time * 2) + (gons.length/5) + (i/5)*2 + 100);
        //   }
    };
    var thirdpagemovetween = new TimelineMax()
        .add(TweenMax.fromTo("#m3move", 2,
            { y: 400 }, { y: 0, ease: Power0.ease }
        ));

    var secondpagemovetween = new TimelineMax()
        .add(TweenMax.fromTo("#aboutuspagemoveleft", 1.7,
            { x: -280 }, { x: 0, ease: Power0.ease }
        ))
        ;
    var secondpagemovetweenright = new TimelineMax()
        .add(TweenMax.fromTo("#aboutuspagemoveright", 1.4,
            { x: 320 }, { x: 0, ease: Power0.ease }
        ))
        ;

    //lITFEST svg tween starts here
    var litfestsvgtween = new TimelineMax()
        .add(TweenMax.to(litfestsvgline1, 1, {
            strokeDashoffset: 1,
            stroke: "#fff",
            ease: Power0.ease
        }
        ))
        .add(TweenMax.to(litfestsvgline1, .2, {
            fill: "#fff",
            strokeWidth: "0",
            ease: Power0.ease
        }
        )
        )
        ;
    //lITFEST svg tween ends here

    //workshopsvg tween starts here

    //first tween fills outline
    var workshopssvgtween = new TimelineMax()
        .add(TweenMax.to(workshopssvgline, 1.5, {
            strokeDashoffset: 1,
            stroke: "#fff",

            ease: Power0.ease
        }
        )
        )
        //secon tween fills internal color
        .add(TweenMax.to(workshopssvgline, 0, {
            fill: "#fff",
            ease: Power0.ease
        }
        ), "-=.5"
        )
        ;
    //workshopsvg tween ends here
    //zonalssvgtween starts here
    var zonalssvgtween = new TimelineMax()
        .add(TweenMax.to(zonalssvgline, 1.5, {
            strokeDashoffset: 1,
            stroke: "#fff",

            ease: Power0.ease
        }
        )
        )
        .add(TweenMax.to(zonalssvgline, 0, {
            fill: "#fff",
            strokeWidth: "0",
            ease: Power0.ease
        }
        ), "-=.5"
        )
        ;
    //zonalssvgtween ends here

    //onlineeventssvgtween starts here
    var onlineeventssvgtween = new TimelineMax()
        .add(TweenMax.to(onlineeventssvgline, .75, {
            strokeDashoffset: 1,
            stroke: "#fff",

            ease: Power0.ease
        }
        )
        )
        .add(TweenMax.to(onlineeventssvgline1, .75, {
            strokeDashoffset: 1,
            stroke: "#fff",
            ease: Power0.ease
        }
        ), "-=.5"
        )
        .add(TweenMax.to(onlineeventssvgline, .1, {

            fill: "#fff",
            ease: Power0.ease
        }
        )
        )
        .add(TweenMax.to(onlineeventssvgline1, .1, {
            fill: "#fff",
            ease: Power0.ease
        }
        ), "-=.2"
        )
        ;
    //onlineeventssvgtween ends here

    //carnivalssvgtween starts here
    var carnivalssvgtween = new TimelineMax()
        .add(TweenMax.to(carnivalssvgline, 1, {
            strokeDashoffset: 1,
            stroke: "#fff",

            ease: Power0.ease
        }
        )
        )
        .add(TweenMax.to(carnivalssvgline, 1, {
            fill: "#fff",
            ease: Power0.ease
        }
        )
        )
        ;
    //carnivalssvgtween ends here
    var page3secrevtween = new TimelineMax()
        .add(TweenMax.fromTo("#litfestsvgtrigger", .5, {
            y: 100,
            opacity: 0.2,
            ease: Power0.ease,
        }, {
                y: 0,
                opacity: 1,
                ease: Power3.easeIn,

            }, "-=1"))
        .add(TweenMax.fromTo("#litfestsvgtext", .5, {
            opacity: 0.2
        }, { opacity: 1 }
        ))
        ;
    // page3secrev1tween starts here this tween moves workshops box up
    var page3secrev1tween = new TimelineMax()
        .add(TweenMax.fromTo("#workshoptrigger2", 1, {
            y: 100,
            opacity: 0.2,
            ease: Power0.ease,
        }, {
                y: 0,
                opacity: 1,
                ease: Power0.ease,

            }, "-=4"))
        .add(TweenMax.fromTo("#workshoptext", .5, {
            opacity: 0.2
        }, { opacity: 1 }
        ))
        ;
    // page3secrev1tween ends here
    //page3secrev2tween starts here Zonalsbox
    var page3secrev2tween = new TimelineMax()
        .add(TweenMax.fromTo("#zonalstrigger", .5, {
            y: 100,
            opacity: 0.2,
            ease: Power0.ease,
        }, {
                y: 0,
                opacity: 1,
                ease: Power0.ease,
            }, "-=1"))
        .add(TweenMax.fromTo("#zonalstext", .5, {
            opacity: 0.2
        }, { opacity: 1 }
        ))
        ;
    //page3secrev2tween ends here
    ////page3secrev3tween starts here onlinesbox
    var page3secrev3tween = new TimelineMax()
        .add(TweenMax.fromTo("#onlinetrigger", .5, {
            y: 100,
            alpha: 0.2,
            ease: Power3.easeIn,
        }, {
                y: 0,
                alpha: 1,
                ease: Power3.easeIn,
            }, "-=1"))
        .add(TweenMax.fromTo("#onlineeventstext", .5, {
            opacity: 0.2
        }, {
                opacity: 1
            }
        )
        )
        ;
    //page3secrev3tween ends here
    ////page3secrev4tween starts here carnivalsbox
    var page3secrev4tween = new TimelineMax()
        .add(TweenMax.fromTo("#carnivalstrigger", .5, {
            y: 100,
            opacity: 0.2,
            ease: Power3.easeIn,
        }, {
                y: -100,
                opacity: 1,
                ease: Power3.easeIn,
            }, "-=1"))
        .add(TweenMax.fromTo("#carnivaltext", .5, {
            opacity: 0.2
        }, {
                opacity: 1
            }
        )
        )
        ;
    var cigmove = new TimelineMax({ repeat: -1, yoyo: true });
    cigmove.fromTo("#centreimagetrans", 3, { y: -10, ease: Power1.easeIn }, { y: 10, ease: Power1.easeIn });
    var eventf = document.querySelector(".mainfinalleftsidebarevents");
    var oneventshover = (e) => {
        // var eventfloat=new TimelineMax({repeat:-1,yoyo:true})
        // eventfloat.fromTo(eventf,2,{y:-10,ease:Power3.easeout},{y:10,ease:Power3.easeIn});
    }
    eventf.addEventListener('mouseover', oneventshover);
    // build scene

    new ScrollMagic.Scene({
        triggerElement: "#aboutus"
    })
        .on('start', function () {
            counting(count1, countid1, 0, 5);
            counting(count2, countid2, 0, 40);
            counting(count3, countid3, 0, 5);
        }
        )
        //   .addIndicators()
        .addTo(controller);


    new ScrollMagic.Scene({
        triggerElement: "#numberchange3",
        offset: -100,
        tweenChanges: true
    })
        .setTween(thirdpagemovetween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#aboutuspagerevealer",
        offset: 0,
        tweenChanges: true
    })
        .setTween(secondpagemovetween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#aboutuspagerevealer",
        offset: 0,
        tweenChanges: true
    })
        .setTween(secondpagemovetweenright)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);


    new ScrollMagic.Scene({
        triggerElement: "#litfestanimationtrigger",
        offset: window.innerHeight * .1546,
        tweenChanges: true
    })
        .setTween(litfestsvgtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#litfestanimationtrigger",
        offset: -window.innerHeight * .1614,
        tweenChanges: true
    })
        .on('start', function () {
            ab(litgon);
        }
        )
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#workshopssvgtrigger",
        offset: window.innerHeight * .1546,
        tweenChanges: true
    })
        .setTween(workshopssvgtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#workshopssvgtrigger",
        offset: -window.innerHeight * .1718,
        tweenChanges: true
    })
        .on('start', function () {

            ab(workgon);
        }
        )
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        offset: window.innerHeight * .1546,
        triggerElement: "#zonalssvgtrigger",
        tweenChanges: true
    })
        .setTween(zonalssvgtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        offset: -window.innerHeight * .1614,
        triggerElement: "#zonalssvgtrigger",
        tweenChanges: true
    })
        .on('start', function () {
            ab(zongon);
        }
        )
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#onlineeventssvgtrigger",
        offset: window.innerHeight * .1546,
        tweenChanges: true
    })
        .setTween(onlineeventssvgtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        offset: -window.innerHeight * .1614,
        triggerElement: "#onlineeventssvgtrigger",
        tweenChanges: true
    })
        .on('start', function () {
            ab(onlinegon);
        }
        )
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#carnivalsssvgtrigger",
        tweenChanges: true,
        offset: window.innerHeight * .1546
    })
        .setTween(carnivalssvgtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#carnivalsssvgtrigger",
        tweenChanges: true,
        offset: -window.innerHeight * .1947
    })
        .on('start', function () {
            ab(carngon);
        }
        )
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#litfestanimationtrigger",
        offset: window.innerHeight * .1431,
        tweenChanges: true
    })
        .setTween(page3secrevtween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#workshopssvgtrigger",
        offset: window.innerHeight * .1431,
        tweenChanges: true
    })
        .setTween(page3secrev1tween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#zonalssvgtrigger",
        offset: window.innerHeight * .1431,
        tweenChanges: true
    })
        .setTween(page3secrev2tween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#onlineeventssvgtrigger",
        offset: window.innerHeight * .1431,
        tweenChanges: true
    })
        .setTween(page3secrev3tween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#carnivalsssvgtrigger",
        offset: window.innerHeight * .1431,
        tweenChanges: true
    })
        .setTween(page3secrev4tween)
        //   .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    //     var lFollowX = 0,
    //         lFollowY = 0,
    //         x = 0,
    //         y = 0,
    //         friction = 1 / 30;
    // function moveBackground() {
    //   x += (lFollowX - x) * friction;
    //   y += (lFollowY - y) * friction;

    //  var  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1)';
    //   document.querySelector(".mainfinalmainfirst2").style.transform=translate;
    //   window.requestAnimationFrame(moveBackground);
    // }
    // document.querySelector(".mainfinalmainfirst2").addEventListener('mousemove', function(e) {
    //   var lMouseX = Math.max(-100, Math.min(100, window.innerWidth/ 2 - e.clientX));
    //   var lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
    //   lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    //   lFollowY = (10 * lMouseY) / 100;
    // });
    // moveBackground();

}
export default Function

