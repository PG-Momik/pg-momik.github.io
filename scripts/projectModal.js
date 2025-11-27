const initProjectModal = () => {
    const modal = document.getElementById('projectModal');
    // Select the new elements
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalLink = document.getElementById('modalLink');
    const modalSource = document.getElementById('modalSource');

    // New Spec Sheet Elements
    const modalRole = document.getElementById('modalRole');
    const modalTech = document.getElementById('modalTech');
    const modalCat = document.getElementById('modalCat');

    const closeModalBtn = document.querySelector('.close-modal');
    const projectItems = document.querySelectorAll('.project-item');

    if (!modal) return;

    // Helper to extract text from the inner <p> of the project item
    // format: "Role • Tech1, Tech2"
    const parseDetails = (detailsText) => {
        if (!detailsText) return { role: 'N/A', tech: 'N/A' };
        const parts = detailsText.split('•').map(s => s.trim());
        return {
            role: parts[0] || 'Contributor',
            tech: parts[1] || 'Various'
        };
    };

    // Open Modal
    projectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.project-link-wrapper')) {
                e.preventDefault();
            }

            // Get Data Attributes
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const img = item.getAttribute('data-img');
            const link = item.getAttribute('data-link');
            const source = item.getAttribute('data-source');

            // Get Category (from the .project-cat span)
            const categoryElement = item.querySelector('.project-cat');
            const category = categoryElement ? categoryElement.textContent : 'Project';

            // Get details text (Role • Tech)
            const detailsElement = item.querySelector('.project-details-preview p');
            const detailsText = detailsElement ? detailsElement.textContent : '';
            const { role, tech } = parseDetails(detailsText);

            // Populate Modal
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalImg.src = img;

            // Populate Spec Sheet
            modalRole.textContent = role;
            modalTech.textContent = tech;
            modalCat.textContent = category;

            // Links
            modalLink.href = link;
            if (source) {
                modalSource.href = source;
                modalSource.style.display = 'flex'; // Use flex for the button layout
            } else {
                modalSource.style.display = 'none';
            }

            // Show Modal (Slide In Effect)
            modal.style.display = 'flex';
            // Trigger reflow to ensure CSS transition happens
            void modal.offsetWidth;
            modal.classList.add('show');

            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close Modal Logic
    const closeProjectModal = () => {
        modal.classList.remove('show');
        // Wait for CSS transition (0.5s) before setting display:none
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectModal);
    }

    // Close on click outside panel
    window.addEventListener('click', (e) => {
        // If clicking the overlay (and not the panel itself)
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeProjectModal();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initProjectModal();
});