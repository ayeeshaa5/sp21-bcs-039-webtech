$(document).ready(function() {
    $("#myForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        submitHandler: function(form) {
            alert("Form submitted successfully!"); 
        }
    });
});
