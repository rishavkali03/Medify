import React, { useRef, useEffect } from "react";

export const SparklesCore = ({ background = "transparent" }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 200; // fixed height for sparkle effect
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y -= this.speed;
        this.alpha -= 0.005;

        if (this.alpha <= 0) {
          this.reset();
          this.y = height;
          this.alpha = 1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [background]);

  return <canvas ref={canvasRef} className="w-full" />;
};
