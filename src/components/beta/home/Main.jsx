import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import './src/css/Main.css';
import Footer from './Footer';
import Navbar from './Navbar';
import FullSection from './FullSection';
let initialized = false;

export default class Main extends Component {
    componentDidMount() {
        initialized = false;
        setTimeout(() => this.initParticle(), 100);
        let check = setInterval(() => {
            this.initParticle(check)
        }, 1000)
    }

    initParticle = check => {
        if (window.particlesJS && !initialized) {
            if (check) {
                clearInterval(check)
            }
            initialized = true;
            window.particlesJS('home-particles-js', {
                "particles": {
                    "number": {
                        "value": 125,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#a2e7f0"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "svg/github.svg",
                            "width": 1,
                            "height": 1
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3.2,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.3,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "bounce",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 15,
                            "size": 2,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 56.84540486109416,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 8
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }, function () {
                if (check) {
                    clearInterval(check)
                }
            });
        }
    }
    render() {
        return (
            <div className="middlesection">
                <Helmet>
                    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
                </Helmet>
                <div id="home-particles-js" style={{
                    height: '100vh',
                    zIndex: '0',
                    position: 'fixed',
                    width: '100vw',
                }}>
                </div>
                <Navbar />
                <FullSection />
                <Footer />
            </div>
        );
    }
}
