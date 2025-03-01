document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.popup-form');
    const submitBtn = document.querySelector('.submit-btn');

    // 3D tilt effect on form
    form.addEventListener('mousemove', (e) => {
        const rect = form.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = -((y - centerY) / centerY) * 5;
        
        form.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset form position
    form.addEventListener('mouseleave', () => {
        form.style.transform = 'translateZ(50px) rotateX(0) rotateY(0)';
    });

    // Button glow effect
    submitBtn.addEventListener('mousemove', (e) => {
        const rect = submitBtn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        submitBtn.querySelector('.btn-glow').style.setProperty('--x', `${x}%`);
        submitBtn.querySelector('.btn-glow').style.setProperty('--y', `${y}%`);
    });
});
document.querySelector('.contact-popup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('send_mail.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            alert(data.message);
            this.reset();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert('An error occurred. Please try again later.');
    });
});