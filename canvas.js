// Learned this from a canvas.js introduction course, check out the courses here: https://www.youtube.com/c/ChrisCourses
// He teaches some pretty neat things

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Define min and max sizes
let maxRadius = 140;
let minRadius = 30;

var mouse = {
    x: undefined,
    y: undefined
}

// Set colors to randomly choose from
var colorArray = [
    '#F21D2F',
    '#BF212E',
    '#EBEFF2',
    '#888C8B',
    '#0D0D0D'
];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// Settings each circles properties independently
function Circle(x, y, velocityX, velocityY, radius) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    // Set each circles radius its own size
    this.radius = radius;
    this.minRadius = radius;
    // Set random colors from colorArray
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + radius > innerWidth || this.x - radius < 0) {
            this.velocityX = -this.velocityX;
        }

        if (this.y + radius > innerHeight || this.y - radius < 0) {
            this.velocityY = - this.velocityY;

        }
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Interactivity, specifying max size and min size, as well as 50 pixels mouse event will trigger size change
        if (mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y < 80 && mouse.y - this.y > -80) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

// Dynamically generates circles on page resize
function init() {
    // Clears previous circles to prevent generations every resize stacking
    circleArray = [];

    for (var i = 0; i < 400; i++) {
        // Generate Random Radiuses
        let radius = Math.random() * 20 + 1;
        // Random Spawn location 
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        // Random Velocity speeds
        let velocityX = (Math.random() - 0.5) * 2;
        let velocityY = (Math.random() - 0.5) * 1.2;
        circleArray.push(new Circle(x, y, velocityX, velocityY, radius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();