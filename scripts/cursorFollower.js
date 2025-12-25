// Cursor Follower for Project Section
(function () {
    const projectList = document.querySelector('.project-list');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorImage = cursorFollower?.querySelector('img');
    const projectItems = document.querySelectorAll('.project-item');

    if (!projectList || !cursorFollower || !cursorImage) return;

    let currentImage = '';
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    const lag = 0.15; // Smooth lag effect

    // Track mouse position
    projectList.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor follower with lag
    function animate() {
        // Smooth interpolation for lag effect
        followerX += (mouseX - followerX) * lag;
        followerY += (mouseY - followerY) * lag;

        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    let hoverTimeout;

    const projectNames = document.querySelectorAll('.project-name');

    // Show/hide and update image on project name hover
    projectNames.forEach(name => {
        name.addEventListener('mouseenter', () => {
            const item = name.closest('.project-item');
            if (!item) return;

            const imgSrc = item.dataset.img;

            if (imgSrc && imgSrc !== currentImage) {
                currentImage = imgSrc;
                cursorImage.src = imgSrc;
            }

            cursorFollower.classList.add('active');
        });

        name.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });

    // Hide when leaving project list entirely key safety
    projectList.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        currentImage = '';
    });
})();
