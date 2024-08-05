document.getElementById('mailForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    alert('Email sent successfully!');
});
