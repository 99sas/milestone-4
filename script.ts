
// Define types for form fields and output areas
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}

// Add an event listener for form submission
resumeForm?.addEventListener('submit', (e: Event) => {
    e.preventDefault(); // Prevent the form from submitting in the default way

    // Retrieve the form data
    const formData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        education: (document.getElementById('education') as HTMLTextAreaElement).value,
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
        skills: (document.getElementById('skills') as HTMLTextAreaElement).value
    };

    // Generate resume HTML structure
    const resumeHtml: string = `
        <h2>${formData.name}'s Resume</h2>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${formData.email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${formData.phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${formData.education}</p>

        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${formData.experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${formData.skills}</p>
    `;

    // Display the generated resume
    resumeOutput.innerHTML = resumeHtml;
    makeFieldsEditable(); // Make the displayed resume editable
});

// Function to enable editing on displayed resume fields
function makeFieldsEditable(): void {
    const editableElements = document.querySelectorAll('.editable');

    editableElements.forEach((element) => {
        element.addEventListener('click', () => {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // If the element clicked is a paragraph or span, replace it with an input field
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                // Handle input field losing focus
                input.addEventListener('blur', () => {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove(); // Remove the input field after editing
                });

                // Replace the current text content with the input field
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus(); // Focus the input field for user interaction
            }
        });
    });
}

