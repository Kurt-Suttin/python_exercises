$(document).ready(function () {

    $(document).ready(function () {

        let formHtml = `
        <div class="column gap-10" style="display: none;" id="form-html">
            <form id="simpleForm" class="d-flex flex-column gap-15">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" class="full-width">

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="full-width">

                <label for="color">Favorite Color:</label>
                <input type="text" id="color" name="color" class="full-width">
                
                <input type="submit" value="Submit" class="align-self-stretch">
            </form>
        </div>
    `;

        // Append the form HTML to the container but keep it hidden initially
        $("#form-container").append(formHtml);

        // Toggle visibility when form-direct is clicked
        $(".form-direct").click(function () {
            $("#form-html").toggle(); // This toggles the visibility of the form
        });

    });

// GET REQUEST FOR SEEING USERS
    $(document).ready(function () {
        // Flag to track if the data has already been loaded
        let dataLoaded = false;

        $(".view-form-direct").click(function () {
            // Check if data is already loaded
            if (!dataLoaded) {
                console.log("viewing user data");
                // Fetch the user data from the server
                $.ajax({
                    type: "GET",
                    url: "http://localhost:3000/users", // URL to fetch users
                    contentType: "application/json",
                    success: function (users) {
                        users.forEach(function (user) {
                            let userHtml = `
    <div class="user-entry card column gap-5 w-20">
        <div class="card-header">
            <h2 class="user-name text-align-center" style="cursor: pointer;">${user.name}</h2>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-align-center user-email" style="display: none;">${user.email}</li>
            <li class="list-group-item text-align-center user-favorite-color" style="display: none;">${user.color}</li>

        </ul>
            </div>
            `;
                            $("#view-form-container").append(userHtml);
                        });

                        // Click handler for user names
                        $(document).on('click', '.user-name', function () {
                            console.log("inspecting users deeper data");
                            $(this).closest('.user-entry').find('.user-email').toggle(); // Correctly targets the email
                            $(this).closest('.user-entry').find('.user-favorite-color').toggle(); // Correctly targets the email

                        });

                        // Update the flag
                        dataLoaded = true;
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching users:", error);
                    }
                });
            } else {
                // If the data is already loaded, just toggle the visibility
                $(".user-entry").toggle();
            }
        });
    });


    // POSTS REQUEST TO SUBMIT FORMS
    $(document).on('submit', '#simpleForm', function (event) {
        console.log("submitted form");
        event.preventDefault(); // Prevent the default form submission

        // Fetch the user data from the server to check for duplicates
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/users",
            contentType: "application/json",
            success: function (users) {
                let emailExists = users.some(user => user.email === $("#email").val());

                if (emailExists) {
                    console.log("Email already exists. Duplicate entries are not allowed.");
                    alert("Email already exists. Duplicate entries are not allowed." +
                        "Try using another email")
                    // Optionally, you can alert the user or display a message on the page.
                } else {
                    // If the email doesn't exist, submit the form data.
                    let formData = {
                        name: $("#name").val(),
                        email: $("#email").val(),
                        color:$("#color").val()
                    };

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/users", // URL to submit the form to
                        contentType: "application/json",
                        data: JSON.stringify(formData),
                        dataType: "json",
                        success: function (response) {
                            console.log("Data saved successfully:", response);
                            // Optionally clear the form or give some feedback
                        },
                        error: function (xhr, status, error) {
                            console.error("Error saving data:", error);
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching users to check for duplicates:", error);
            }
        });
    });

});
