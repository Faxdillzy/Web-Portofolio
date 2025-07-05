// Form submission handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Display results
            document.getElementById('resultName').textContent = name;
            document.getElementById('resultEmail').textContent = email;
            document.getElementById('resultSubject').textContent = subject;
            document.getElementById('resultMessage').textContent = message;
            
            // Show result content and hide placeholder
            document.getElementById('resultPlaceholder').style.display = 'none';
            document.getElementById('resultContent').style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Scroll to result
            document.getElementById('resultContent').scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });