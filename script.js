// Add event listener for form submission
document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Generate the resume HTML
    const resumeHtml = `
        <h2>${name}'s Resume</h2>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
    `;

    // Insert the generated resume into the output div
    document.getElementById('resumeOutput').innerHTML = resumeHtml;

    // Call function to make the fields editable
    makeFieldsEditable();
});

// Function to make fields editable when clicked
function makeFieldsEditable() {
    const editableElements = document.querySelectorAll('.editable');

    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            const currentElement = element;
            const currentValue = currentElement.textContent || "";

            // If the element clicked is a paragraph or span, replace it with an input field
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                // Handle input field losing focus (blur event)
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove(); // Remove input field after editing
                });

                // Replace the current element content with input field
                currentElement.style.display = 'none';
                currentElement.parentNode.insertBefore(input, currentElement);
                input.focus(); // Automatically focus the input field for user editing
            }
        });
    });
}

