(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/30) {
            for(var y = 0; y < height; y = y + height/30) {
                var px = x + Math.random()*width/30;
                var py = y + Math.random()*height/30;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + 
            document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 5000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 50000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 80000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 3 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();

  document.addEventListener("DOMContentLoaded", () => {
    const dynamicText = document.querySelector(".dynamic-text");
    const textArray = ["VFX & 3D Artist", "Designer", "Editor", "3D Model Creator"];
    let textIndex = 0;

    // Function to change the text
    const changeText = () => {
      textIndex = (textIndex + 1) % textArray.length; // Increment and loop through the array
      dynamicText.textContent = textArray[textIndex]; // Update the span's text
    };

    // Change text every 2 seconds (adjust the interval as needed)
    setInterval(changeText, 3000);
  });

function showHome() {
    // Hide About section and show Home section
    document.getElementById('Home').style.display = 'flex'; // or 'block'
    document.getElementById('About').style.display = 'none';
    document.getElementById('Services').style.display = 'none'; 
     document.getElementById('Portfolio').style.display = 'none';
     document.getElementById('contect').style.display = 'none'; 
// Reset and trigger image animation (same as the one in DOMContentLoaded)
const image = document.querySelector(".animate-image");
//image.style.animation = "none"; // Reset the animation
setTimeout(() => {
    image.style.animation = ""; // Reapply the animation

    // Trigger GSAP animation for the image
    gsap.from(".animate-image", {
        opacity: 0,
        x: 100, // Starts off-screen to the right
        scale: 0.8, // Scales from 80%
        duration: 1.5,
        delay: 1, // Matches the flow of text animation
        ease: "power3.out", // Smooth easing
    });
}, 10);
}

function showAbout() {
    // Hide Home section and show About section
    document.getElementById('Home').style.display = 'none';
    document.getElementById('Services').style.display = 'none'; 
    document.getElementById('Portfolio').style.display = 'none';
    document.getElementById('contect').style.display = 'none'; 
    document.getElementById('About').style.display = 'flex'; // or 'block'
    
    // Trigger animation using GSAP
    gsap.from("#About", {
        opacity: 0,
        y: 80,  // Slightly shifted up
        duration: 1,
        ease: "power3.out"
    });
}
function showService() {
    // Hide Home section and show About section
    document.getElementById('About').style.display = 'none';
    document.getElementById('Home').style.display = 'none';
    document.getElementById('Portfolio').style.display = 'none';
    document.getElementById('contect').style.display = 'none'; 
    document.getElementById('Services').style.display = 'flex'; // or 'block'
    // Trigger staggered animation for each service box
    gsap.from(".service-box", {
        opacity: 0,
        y: 30,  // Slightly shifted up
        duration: 0.8,
        stagger: 0.3,  // Delay between each box's animation
        ease: "power3.out"
    });
}
function showPortfolio() {
    // Hide Home section and show About section
    document.getElementById('About').style.display = 'none';
    document.getElementById('Home').style.display = 'none';
    document.getElementById('Services').style.display = 'none';
    document.getElementById('contect').style.display = 'none';  // or 'block'
    document.getElementById('Portfolio').style.display = 'flex'; // or 'block'
    // or 'block'
   // Select all portfolio cards
   const portfolioCards = document.querySelectorAll('.portfolio-card');

   // Use GSAP for staggered animation from the right
   gsap.fromTo(portfolioCards, 
       {
           opacity: 0,        // Start invisible
           x: 300,            // Start 200px to the right
       },
       {
           opacity: 1,        // End at full visibility
           x: 5,              // End at original position (no offset)
           duration: 1,       // Set the duration of each card's animation
           stagger: 0.3,      // Delay between each card's animation
           ease: "power3.out",// Smooth easing out effect
           onComplete: () => {
               // Callback function when all animations are complete
               console.log("All cards have appeared from the right!");
           }
       }
   );
}

function showContect() {
    // Hide Home section and show About section
    document.getElementById('About').style.display = 'none';
    document.getElementById('Home').style.display = 'none';
    document.getElementById('Services').style.display = 'none'; // or 'block'
    document.getElementById('Portfolio').style.display = 'none'; // or 'block'
    document.getElementById('contect').style.display = 'flex'; // or 'block'
    // Select the contact content
   // Select the content of the Contact section
   const contactLeft = document.querySelector('.contactLeft');
   const contactRight = document.querySelector('.contactRight');
   const contactTitle = document.querySelector('.contect-subTitle');
   const socialIcons = document.querySelector('.contect-socialIcons');

   // GSAP animation for the Contact section content
   gsap.from(contactLeft, {
       opacity: 0,
       x: -100,               // Start from the left
       duration: 1,           // Duration of the animation
       ease: "power3.out",    // Ease effect
   });

   gsap.from(contactRight, {
       opacity: 0,
       x: 100,                // Start from the right
       duration: 1.2,         // Duration of the animation
       ease: "power3.out",    // Ease effect
   });

   gsap.from(contactTitle, {
       opacity: 0,
       y: 50,                 // Start from a slightly lower position
       duration: 1.5,         // Duration of the animation
       ease: "power3.out",    // Ease effect
   });

   gsap.from(socialIcons, {
       opacity: 0,
       x: -50,                // Start from the left
       duration: 1.2,         // Duration of the animation
       delay: 0.5,            // Delay slightly after the title
       ease: "power3.out",    // Ease effect
   });
}

let tablinks = document.getElementsByClassName("tab-links");
    let tabcontents = document.getElementsByClassName("tabContents");

    function openTab(tabname) {
        for (let tablink of tablinks) {
            tablink.classList.remove("activeLink");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("activeTab");
        }
        event.currentTarget.classList.add("activeLink")
        document.getElementById(tabname).classList.add("activeTab")
    }
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");
    
    // Toggle navbar visibility on menu icon click
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
    };
    
    // Hide the navbar when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', function() {
        // Close the navbar
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
      });
    });
    
    
document.addEventListener("DOMContentLoaded", function() {
    const roles = ["Web Developer", "App Developer", "Photo Editor"];
    let currentRoleIndex = 0;
    const roleElement = document.getElementById("role");

    if (roleElement) { // Check if the element exists
        function changeRole() {
            roleElement.style.opacity = 0; // Fade out
            setTimeout(() => {
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                roleElement.textContent = roles[currentRoleIndex];
                roleElement.style.opacity = 1; // Fade in
            }, 500); 
        }

        setInterval(changeRole, 3000); 
    } else {
       // console.error("Element with id 'role' not found.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Animation for Home section text
    gsap.from(".home-content h3", {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  
    gsap.from(".home-content h1", {
      opacity: 0,
      x: -100,
      duration: 1,
      delay: 0.8,
      ease: "power3.out",
    });
  
    gsap.from(".home-content h3 span", {
      opacity: 0,
      scale: 0,
      duration: 1,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });
  
    gsap.from(".home-content p", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });
  
    gsap.from(".social-media a", {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      stagger: 0.2,
      delay: 2,
      ease: "back.out(1.7)",
    });
  
    gsap.from(".btn", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 2.5,
      ease: "power3.out",
    });
  
   
    // Animation for Home section image
  gsap.from(".animate-image", {
    opacity: 0,
    x: 100, // Starts off-screen to the right
    scale: 0.8, // Scales from 80%
    duration: 1.5,
    delay: 1, // Matches the flow of text animation
    ease: "power3.out", // Smooth easing
  });
});
