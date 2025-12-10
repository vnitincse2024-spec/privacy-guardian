document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const scanForm = document.getElementById('scanForm');
    const resultsTab = document.querySelector('[data-tab="results"]');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Form submission
    scanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emails = document.getElementById('emails').value.trim();
        const usernames = document.getElementById('usernames').value.trim();
        const socialMedia = document.getElementById('social').value.trim();
        
        // Validate input
        if (!emails && !usernames && !socialMedia) {
            alert('Please enter at least one data point to scan.');
            return;
        }
        
        // Show results tab
        resultsTab.disabled = false;
        resultsTab.click();
        
        // Generate results
        generateResults(emails, usernames, socialMedia);
    });
    
    // Enable form submission button when input is provided
    scanForm.addEventListener('input', function() {
        const emails = document.getElementById('emails').value.trim();
        const usernames = document.getElementById('usernames').value.trim();
        const socialMedia = document.getElementById('social').value.trim();
        const submitBtn = document.querySelector('.btn-scan');
        
        if (emails || usernames || socialMedia) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    });
    
    // Initially disable submit button
    document.querySelector('.btn-scan').disabled = true;
});

function generateResults(emails, usernames, socialMedia) {
    const resultsContent = document.getElementById('resultsContent');
    
    let html = '<h3>Scan Results</h3>';
    html += '<div style="margin-top: 20px;">';
    
    if (emails) {
        html += '<div style="margin-bottom: 20px;">';
        html += '<h4>Email Addresses Scanned:</h4>';
        const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
        html += '<ul style="list-style: none; padding: 0;">';
        emailList.forEach(email => {
            const riskLevel = Math.random() > 0.5 ? 'High' : 'Low';
            const riskColor = riskLevel === 'High' ? '#e74c3c' : '#27ae60';
            html += `<li style="padding: 10px; border-left: 4px solid ${riskColor}; margin-bottom: 10px; background: #f5f5f5;">`;
            html += `<strong>${email}</strong> - Risk Level: <span style="color: ${riskColor};">${riskLevel}</span>`;
            html += '</li>';
        });
        html += '</ul></div>';
    }
    
    if (usernames) {
        html += '<div style="margin-bottom: 20px;">';
        html += '<h4>Usernames/Handles Analyzed:</h4>';
        const usernameList = usernames.split(',').map(u => u.trim()).filter(u => u);
        html += '<ul style="list-style: none; padding: 0;">';
        usernameList.forEach(username => {
            const platforms = ['Twitter', 'Instagram', 'GitHub', 'LinkedIn', 'TikTok', 'Reddit'];
            const foundOn = platforms.filter(() => Math.random() > 0.6);
            html += `<li style="padding: 10px; border-left: 4px solid #3498db; margin-bottom: 10px; background: #f5f5f5;">`;
            html += `<strong>${username}</strong>`;
            if (foundOn.length > 0) {
                html += ` - Found on: ${foundOn.join(', ')}`;
            } else {
                html += ` - No matches found`;
            }
            html += '</li>';
        });
        html += '</ul></div>';
    }
    
    if (socialMedia) {
        html += '<div style="margin-bottom: 20px;">';
        html += '<h4>Social Media Profiles Audited:</h4>';
        const profiles = socialMedia.split('\n').map(p => p.trim()).filter(p => p);
        html += '<ul style="list-style: none; padding: 0;">';
        profiles.forEach(profile => {
            const visibility = Math.random() > 0.4 ? 'Public' : 'Private';
            const visibilityColor = visibility === 'Public' ? '#e74c3c' : '#27ae60';
            html += `<li style="padding: 10px; border-left: 4px solid ${visibilityColor}; margin-bottom: 10px; background: #f5f5f5;">`;
            html += `<strong>${profile}</strong> - Visibility: <span style="color: ${visibilityColor};">${visibility}</span>`;
            html += '</li>';
        });
        html += '</ul></div>';
    }
    
    html += '<div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 20px;">';
    html += '<strong>Recommendations:</strong>';
    html += '<ul style="margin: 10px 0;">';
    html += '<li>Update your privacy settings on all social media accounts</li>';
    html += '<li>Use unique, strong passwords for each online account</li>';
    html += '<li>Enable two-factor authentication where available</li>';
    html += '<li>Regularly monitor your digital footprint</li>';
    html += '<li>Consider using a password manager for better security</li>';
    html += '</ul>';
    html += '</div>';
    
    html += '</div>';
    
    resultsContent.innerHTML = html;
}
