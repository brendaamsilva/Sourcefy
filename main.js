// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.step, .feature, .testimonial');
const fadeOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const fadeOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeOnScroll.observe(element);
});

// Interactive Skill Check
const skillInput = document.querySelector('.skill-quiz input');
const checkButton = document.querySelector('.skill-quiz .cta-button');

checkButton.addEventListener('click', () => {
    const skill = skillInput.value.trim().toLowerCase();
    if (skill) {
        // Animate the button
        checkButton.classList.add('checking');
        checkButton.textContent = 'Checking...';

        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            checkButton.classList.remove('checking');
            checkButton.textContent = 'Check Now ✨';

            // Show result (this would normally come from an API)
            const results = getMatchingJobs(skill);
            displayResults(results);
        }, 1500);
    }
});

// Mock function to get matching jobs
function getMatchingJobs(skill) {
    const mockJobs = {
        'javascript': ['Frontend Developer', 'Full Stack Engineer', 'React Developer'],
        'python': ['Data Scientist', 'Backend Developer', 'ML Engineer'],
        'design': ['UI/UX Designer', 'Product Designer', 'Creative Director'],
        'marketing': ['Digital Marketing Manager', 'Content Strategist', 'Social Media Manager'],
        'default': ['Junior Developer', 'Project Manager', 'Business Analyst']
    };

    return mockJobs[skill] || mockJobs.default;
}

// Display results function
function displayResults(jobs) {
    // Remove existing results
    const existingResults = document.querySelector('.skill-results');
    if (existingResults) {
        existingResults.remove();
    }

    // Create results container
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'skill-results';
    resultsDiv.style.marginTop = '2rem';

    // Add matching jobs
    const resultsList = document.createElement('div');
    resultsList.style.display = 'grid';
    resultsList.style.gap = '1rem';

    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job-match';
        jobDiv.style.padding = '1rem';
        jobDiv.style.background = 'white';
        jobDiv.style.borderRadius = '10px';
        jobDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        jobDiv.innerHTML = `
            <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">${job}</h4>
            <button class="cta-button" style="font-size: 1rem; padding: 0.5rem 1rem;">
                View Match 🎯
            </button>
        `;
        resultsList.appendChild(jobDiv);
    });

    resultsDiv.appendChild(resultsList);
    document.querySelector('.skill-quiz').appendChild(resultsDiv);
}

// Add CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 1s ease-out forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .checking {
        background: linear-gradient(to right, #6C63FF, #FF6B6B) !important;
        opacity: 0.8;
    }

    .job-match {
        transition: transform 0.3s ease;
    }

    .job-match:hover {
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);
