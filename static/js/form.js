$(document).ready(function() {

    $(document).ready(function() {

        let formHtml = `
        <div class="column gap-10" style="display: none;" id="form-html">
            <form id="simpleForm" class="d-flex flex-column gap-15">
                <label for="fname">First Name:</label>
                <input type="text" id="fname" name="fname" class="full-width">

                <label for="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" class="full-width">

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="full-width">

                <input type="submit" value="Submit" class="align-self-stretch">
            </form>
        </div>
    `;

        // Append the form HTML to the container but keep it hidden initially
        $("#form-container").append(formHtml);

        // Toggle visibility when form-direct is clicked
        $(".form-direct").click(function() {
            $("#form-html").toggle(); // This toggles the visibility of the form
        });

        // Other code for view-form-direct and form submission...

    });


    $(".view-form-direct").click(function() {
        let formHtml = `
      <div class="column gap-10">
      <p id="formSelection" class="d-flex flex-column gap-15">
      <ul>
      <li>user name </li>
      <li>user email  </li>
      </ul>
      </p>
      </div>
        `;

        $("#view-form-container").append(formHtml);
        $(this).off('click');
    });


    // Use event delegation for dynamically added form
    $(document).on('submit', '#simpleForm', function(event) {
        console.log("submitted form")
        // event.preventDefault(); // Prevent the default form submission

        let formData = {
            firstname: $("#fname").val(), // Adjusted key to 'name'
            lastname: $("#lname").val(),
            email: $("#email").val()
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users", // Corrected URL
            contentType: "application/json",
            data: JSON.stringify(formData),
            dataType: "json",
            success: function(response) {
                console.log("Data saved successfully:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error saving data:", error);
            }
        });
    });
});
