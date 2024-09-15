document.addEventListener('click', function (event) {
    const actionButton = event.target.closest('.accordion-action');
    if (actionButton) {
        const accordion = actionButton.closest('.faq-btn');
        const content = accordion.parentElement.querySelector('.accordion-content');
        const svgIcon = actionButton.querySelector('.accordion-icon');
        if (content) {
            // If the content is collapsed
            if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                content.style.transition = 'max-height 0.4s ease-out';
                content.style.overflow = 'hidden';
                content.style.maxHeight = content.scrollHeight + 'px';
                if (svgIcon) {
                    svgIcon.classList.add('rotate-180');
                }
            } else {
                // If the content is expanded
                content.style.transition = 'max-height 0.4s ease-out';
                content.style.maxHeight = content.scrollHeight + 'px';

                setTimeout(function () {
                    content.style.maxHeight = '0px';
                    if (svgIcon) {
                        svgIcon.classList.remove('rotate-180');
                    }
                }, 10);
            }
        }
    }
});
