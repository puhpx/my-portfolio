import React, { useEffect } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById('myBgCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    window.onresize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

  //Create a constructor function for the balls
  function Ball() {
    //X and Y coordinates
    this.x = randomNum(3, canvas.width - 3);
    this.y = randomNum(3, canvas.height - 3);
    //Radius
    this.r = randomNum(2, 5);
    //Color
    this.color = randomColor();
    // this.color="#7ec7fd";
    //Translation speed, positive and negative intervals are for diverse movement
    this.speedX = randomNum(-3, 3) * 0.1;
    this.speedY = randomNum(-3, 3) * 0.1;
  }
  Ball.prototype = {
    //Draw the ball
    draw: function () {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    },
    //Move the ball
    move: function () {
        this.x += this.speedX;
        this.y += this.speedY;
        //For reasonableness, set the limit value (determine the boundary
        //value, so that the ball always stays within the screen)
        if (this.x <= 3 || this.x > canvas.width - 3) {
            this.speedX *= -1;
        }
        if (this.y <= 3 || this.y >= canvas.height - 3) {
            this.speedY *= -1;
        }
    },
  };
  //Store all the balls
  var balls = [];
  //Create 50 balls
  for (var i = 0; i < 50; i++) {
    var ball = new Ball();
    balls.push(ball);
  }
  main();

  function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Draw lines when the mouse moves
    mouseLine();
    //Draw lines between balls automatically
    drawLine();
    //Use keyframe animation to continuously draw and clear
    window.requestAnimationFrame(main);
  }

  main();
  // Add mouse move event
  // Record the mouseX coordinate when the mouse moves
  var mouseX;
  var mouseY;
  canvas.onmousemove = function (e) {
    // var ev = event || e;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  };
  //Determine whether to draw a line
  function drawLine() {
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].move();
      for (var j = 0; j < balls.length; j++) {
        if (i !== j) {
          if (
            Math.sqrt(
              Math.pow(balls[i].x - balls[j].x, 2) +
              Math.pow(balls[i].y - balls[j].y, 2)
            ) < 80
          ) {
              ctx.beginPath();
              ctx.moveTo(balls[i].x, balls[i].y);
              ctx.lineTo(balls[j].x, balls[j].y);
              ctx.strokeStyle = "white";
              ctx.globalAlpha = 0.2;
              ctx.stroke();
            }
        }
      }
    }
  }
  //Move mouse to draw a line
  function mouseLine() {
    for (var i = 0; i < balls.length; i++) {
      if (
        Math.sqrt(
          Math.pow(balls[i].x - mouseX, 2) +
          Math.pow(balls[i].y - mouseY, 2)
        ) < 80
      ) {
          ctx.beginPath();
          ctx.moveTo(balls[i].x, balls[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = "white";
          ctx.globalAlpha = 0.8;
          ctx.stroke();
        }
    }
  }
  //random number
  function randomNum(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
  }
  //random color
  function randomColor() {
    return (
      "rgb(" +
      randomNum(0, 255) +
      "," +
      randomNum(0, 255) +
      "," +
      randomNum(0, 255) +
      ")"
    );
  }
  }, []);

  return <canvas id="myBgCanvas"></canvas>;
};

export default BackgroundAnimation;
