document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its value attribute
    var signUpButton = document.querySelector('button[value="Sign up"]');
    
    // Add a click event listener to the button
    signUpButton.addEventListener("click", function() {
        //alert("Sign Up button was pressed!");
        // You can add your desired functionality here
        let emailId = validateEmail();
        // Send the data to the server using AJAX
        if(emailId != false)
        {
            $.ajax({
                type: 'POST',
                url: 'http://ap-artem.elloweb.com/web/newsletter/insert', // Replace with the actual URL to your controller
                data: {email_id : emailId},
                success: function (response) {
                  // Handle the success response from the server
                  alert("Sucessfully Registered");
                  document.getElementsByName('EMAIL')[0].value = "";

                },
                error: function () {
                  // Handle errors, if any
                  alert("Error Occur While Registering");
                },
              });
        }
        
    });
});

function validateEmail() {
    // Get the input element by name
    var emailInput = document.getElementsByName('EMAIL')[0];
    var emailValue = emailInput.value.trim(); // Remove leading and trailing spaces

    if (emailValue === "") {
        alert("Email cannot be blank.");
        return false;
    } else {
        // Use a regular expression to check if the email is in the correct format
        var emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailFormat.test(emailValue)) {
            alert("Email is not in the correct format.");
            return false;
        } else {
            return emailValue;
        }
    }
}