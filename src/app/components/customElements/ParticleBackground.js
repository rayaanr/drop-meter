import React, { useEffect } from "react";

const ParticleBackground = () => {
    useEffect(() => {
        const loadParticles = () => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
            script.async = true;

            script.onload = () => {
                initializeParticles();
            };

            document.body.appendChild(script);
        };

        const initializeParticles = () => {
            window.particlesJS("particle-background", {
                particles: {
                    number: {
                        value: 50, // Number of particles
                        density: {
                            enable: true,
                            value_area: 500, // Area in which particles are distributed
                        },
                    },
                    color: {
                        value: "#ffffff", // Color of particles
                    },
                    shape: {
                        type: "circle", // Shape of particles
                        stroke: {
                            width: 0,
                            color: "#000000",
                        },
                        polygon: {
                            nb_sides: 5,
                        },
                        image: {
                            src: "img/github.svg",
                            width: 100,
                            height: 100,
                        }
                    },
                    opacity: {
                        value: 0.5, // Opacity of particles
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.5,
                            opacity_min: 0,
                            sync: false,
                        },
                    },
                    size: {
                        value: 3, // Size of particles
                        random: true,
                        anim: {
                            enable: false,
                            speed: 4,
                            size_min: 0.3,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: false,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 0.3, // Speed of particles' movement
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "repulse",
                        },
                        onclick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                retina_detect: true,
            });
        };

        loadParticles();

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div
            id="particle-background"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;


