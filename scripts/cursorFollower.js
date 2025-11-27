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

    // Show/hide and update image on project hover
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgSrc = item.dataset.img;

            if (imgSrc && imgSrc !== currentImage) {
                currentImage = imgSrc;
                cursorImage.src = imgSrc;
            }

            cursorFollower.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            // Small delay before hiding to prevent flicker between items
            setTimeout(() => {
                if (!projectList.matches(':hover')) {
                    cursorFollower.classList.remove('active');
                }
            }, 50);
        });
    });

    // Hide when leaving project list entirely
    projectList.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        currentImage = '';
    });
})();
