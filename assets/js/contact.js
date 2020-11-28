//send email with emailJS

function sendMail(contactForm){
    emailjs.send("adamdelancey", "ash-tree-email", {
        "from_name": contactForm.inputName.value,        
        "from_email": contactForm.inputEmail.value,
        "from_number": contactForm.inputPhone.value,
        "project_request": contactForm.projectSummary.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false;
}


//modal pop up for book viewing button

$('#book-btn').on('click', function () {
    $('#formModal').modal('show');    
});


// Modal pop up when form submitted

$('#myForm').on('submit', function (e) {
    $('#emailModal').modal('show');
    e.preventDefault();
});

