import React from 'react';
import './pronites.css';
import $ from 'jquery';
import Navbar from '../home/Navbar';
export default class PronitesIndex extends React.Component {


    // componentWillUnmount() {
    //     attachListeners();
    // }


    render() {
        let activeIndex = 0
        let limit = 0
        let disabled = false
        let $stage
        let $controls
        let canvas = false
        const SPIN_FORWARD_CLASS = 'pronites-js-spin-fwd'
        const SPIN_BACKWARD_CLASS = 'pronites-js-spin-bwd'
        const DISABLE_TRANSITIONS_CLASS = 'pronites-js-transitions-disabled'
        const SPIN_DUR = 1000
        const appendControls = () => {
            for (let i = 0; i < limit; i++) {
                $('.pronites-carousel__control').append(`<a href="#" data-index="${i}"></a>`)
            }
            let height = $('.pronites-carousel__control').children().last().outerHeight()

            $('.pronites-carousel__control').css('height', (30 + (limit * height)))
            $controls = $('.pronites-carousel__control').children()
            $controls.eq(activeIndex).addClass('active')
        }
        const setIndexes = () => {
            $('.pronites-spinner').children().each((i, el) => {
                $(el).attr('data-index', i)
                limit++
            })
        }
        const duplicateSpinner = () => {
            const $el = $('.pronites-spinner').parent()
            const html = $('.pronites-spinner').parent().html()
            $el.append(html)
            $('.pronites-spinner').last().addClass('pronites-spinner--right')
            $('.pronites-spinner--right').removeClass('pronites-spinner--left')
        }
        const paintFaces = () => {
            $('.pronites-spinner__face').each((i, el) => {
                const $el = $(el)
                let color = $(el).attr('data-bg')
                $el.children().css('backgroundImage', `url(${getBase64PixelByColor(color)})`)
            })
        }
        const getBase64PixelByColor = (hex) => {
            if (!canvas) {
                canvas = document.createElement('canvas')
                canvas.height = 1
                canvas.width = 1
            }
            if (canvas.getContext) {
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = hex
                ctx.fillRect(0, 0, 1, 1)
                return canvas.toDataURL()
            }
            return false
        }
        const prepareDom = () => {
            setIndexes()
            paintFaces()
            duplicateSpinner()
            appendControls()
        }
        const spin = (inc = 1) => {
            if (disabled) return
            if (!inc) return
            activeIndex += inc
            disabled = true
            if (activeIndex >= limit) {
                activeIndex = 0
            }

            if (activeIndex < 0) {
                activeIndex = (limit - 1)
            }
            // const $activeEls = $('.pronites-spinner__face.pronites-js-active')
            const $nextEls = $(`.pronites-spinner__face[data-index=${activeIndex}]`)
            $nextEls.addClass('pronites-js-next')

            if (inc > 0) {
                $stage.addClass(SPIN_FORWARD_CLASS)
            } else {
                $stage.addClass(SPIN_BACKWARD_CLASS)
            }

            $controls.removeClass('active')
            $controls.eq(activeIndex).addClass('active')

            setTimeout(() => {
                spinCallback(inc)
            }, SPIN_DUR, inc)
        }

        const spinCallback = (inc) => {

            $('.pronites-js-active').removeClass('pronites-js-active')
            $('.pronites-js-next').removeClass('pronites-js-next').addClass('pronites-js-active')
            $stage
                .addClass(DISABLE_TRANSITIONS_CLASS)
                .removeClass(SPIN_FORWARD_CLASS)
                .removeClass(SPIN_BACKWARD_CLASS)

            $('.pronites-js-active').each((i, el) => {
                const $el = $(el)
                $el.prependTo($el.parent())
            })
            setTimeout(() => {
                $stage.removeClass(DISABLE_TRANSITIONS_CLASS)
                disabled = false
            }, 100)
        }
        const attachListeners = () => {

            document.onkeyup = (e) => {
                switch (e.keyCode) {
                    case 38:
                        spin(-1)
                        break
                    case 40:
                        spin(1)
                        break
                }
            }
            $controls.on('click', (e) => {
                e.preventDefault()
                if (disabled) return
                const $el = $(e.target)
                const toIndex = parseInt($el.attr('data-index'), 10)
                spin(toIndex - activeIndex)

            })
        }
        const assignEls = () => {
            $stage = $('.pronites-carousel__stage')
        }

        const init = () => {
            assignEls()
            prepareDom()
            attachListeners()
        }
        $(() => {
            init();
        });
        return (
            <div>
                <div className="pronites-carousel-parentdiv">
                <Navbar />
                <div className="pronites-carousel">
                    <div className="pronites-carousel__control">
                    </div>
                    <div className="pronites-carousel__stage">
                        <div className="pronites-spinner pronites-spinner--left">
                            
                            {/* <div className="pronites-spinner__face pronites-js-active" data-bg="#27323c">
                                <div className="pronites-content" data-type="kenny">
                                    <div className="pronites-content__left">
                                       
                                    </div>
                                    <div className="pronites-content__right">
                                        <div className="pronites-content__main">
                                            <p></p>
                                            <p> <strong>kenny Sebastian</strong></p>
                                        </div>
                                        <h3 className="pronites-content__index">Day-0</h3>
                                    </div>
                                </div>
                            </div> */}
                            <div className="pronites-spinner__face pronites-js-active" data-bg="#19304a">
                                <div className="pronites-content" data-type="localtrain">
                                    <div className="pronites-content__left">
                                       
                                    </div>
                                    <div className="pronites-content__right">
                                        <div className="pronites-content__main">
                                        <p>Hola people! Putting cards on the table yet again, we are here with another big name. Mesmerizing spectators with their intriguing vocals and thumping beats, playing to the full stadium will be <strong>The Local Train </strong>  this time. With invigorating enthusiasm and thundering fervour, the band is all set to take on the stage with its high octane performances. With an explosive live act in their arsenal, feel the adrenaline rush down your spine this Thomso with The Local Train.</p>
                                            <p> <strong>The Local Train</strong></p>
                                        </div>
                                        <h3 className="pronites-content__index">Day-1</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="pronites-spinner__face" data-bg="#2b2533">
                                <div className="pronites-content" data-type="amit">
                                    <div className="pronites-content__left">
                                        
                                    </div>
                                    <div className="pronites-content__right">
                                        <div className="pronites-content__main">
                                        <p>‘Sar jhuka ke kar salaam hain shaam shaandaar’<br/>
                                                Alright people, time for speculations to end and preparations to begin ‘coz this time it’s big, Crazy Big! <br/>
                                                Brace yourself, as we spill the beans on this big name. And <strong>‘Amit Trivedi’ </strong>it is, performing live at Xhileration. Witness his unbound mysticism in the dazzling night, submerged in exhilarating musical tunes and embellished with hymns of crescendo. Take a moment for yourselves and see the show getting bigger! </p>
                                            <p> <strong>Amit Trivedi</strong></p>
                                        </div>
                                        <h3 className="pronites-content__index">Day-2</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="pronites-spinner__face" data-bg="#312f2d">
                                <div className="pronites-content" data-type="wolfpack">
                                    <div className="pronites-content__left">
                                      
                                    </div>
                                    <div className="pronites-content__right">
                                        <div className="pronites-content__main">
                                            <p>
                                                All set to fuse the electric waves of music in the stringing nerves of the incited crowd, we are back with one more unexpected name. 
                                                Hold on hard, b'coz it is bigger, bigger than ever!
                                                And we'll be having the Mighty Sentinels to DJ MAG's 35th position, WolfPack, here itself at R-land! Known worldwide for their Electro house, <strong>DJ Wolfpack's </strong>splendor at 'Wargasm', the EDM night of Thomso, will be something too stupendous to have been seen ever before. Beware, the wolves are coming to conquer this territory, prancing onto your brains and scratching your souls with the dynamic music beats in an explosive EDM night!!!
                                            </p>
                                            <p>Wolf Pack</p>
                                        </div>
                                        <h3 className="pronites-content__index">Day-3</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                </div>
            </div>
        )
    }
}