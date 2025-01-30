class PasswordGenerator {
    constructor() {
        // DOM elements
        this.passwordField = document.getElementById("password");
        this.copyButton = document.getElementById("copy-btn");
        this.generateButton = document.getElementById("generate-btn");
        this.lengthInput = document.getElementById("length");
        this.lowercase = document.getElementById("lowercase");
        this.uppercase = document.getElementById("uppercase");
        this.numbers = document.getElementById("numbers");
        this.symbols = document.getElementById("symbols");

        this.characterSets = {
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_-+=<>?/",
        };

        this.init();
    }

    init() {
        this.generateButton.addEventListener("click", () => this.generatePassword());
        this.copyButton.addEventListener("click", () => this.copyToClipboard());
    }

    generatePassword() {
        const length = parseInt(this.lengthInput.value, 10);
        if (isNaN(length) || length < 4 || length > 50) {
            this.displayMessage("Length must be between 4-50 characters.");
            return;
        }

        let charPool = '';
        const selectedOptions = [];

        // Track which character sets are selected
        if (this.lowercase.checked) {
            charPool += this.characterSets.lowercase;
            selectedOptions.push('lowercase');
        }
        if (this.uppercase.checked) {
            charPool += this.characterSets.uppercase;
            selectedOptions.push('uppercase');
        }
        if (this.numbers.checked) {
            charPool += this.characterSets.numbers;
            selectedOptions.push('numbers');
        }
        if (this.symbols.checked) {
            charPool += this.characterSets.symbols;
            selectedOptions.push('symbols');
        }

        if (!charPool) {
            this.displayMessage("Please select at least one option!");
            return;
        }

        // Ensure the password contains at least one character from each selected option
        let password = '';
        selectedOptions.forEach(option => {
            const characterSet = this.characterSets[option];
            password += characterSet[Math.floor(Math.random() * characterSet.length)];
        });

        // Fill the remaining password length with random characters from the whole pool
        const remainingLength = length - selectedOptions.length;
        for (let i = 0; i < remainingLength; i++) {
            password += charPool[Math.floor(Math.random() * charPool.length)];
        }

        // Shuffle the password to ensure random distribution of the selected options
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        // Display the generated password
        this.passwordField.value = password;
        this.displayMessage("Password generated successfully!", "success");
    }

    async copyToClipboard() {
        if (!this.passwordField.value) return;

        try {
            await navigator.clipboard.writeText(this.passwordField.value);
            this.displayMessage("Password copied to clipboard!", "success");
            this.passwordField.value = "";  // Clear the password field after copying
        } catch (error) {
            this.displayMessage("Failed to copy password.", "error");
        }
    }

    // Display message with AI-like style
    displayMessage(message, type = "error") {
        const messageBox = document.createElement("div");
        messageBox.textContent = message;
        messageBox.className = `message ${type}`;
        
        document.body.appendChild(messageBox); // Append to body for AI message display

        // Add animation for the message to appear and disappear
        setTimeout(() => {
            messageBox.style.transform = "translateX(0)";
            messageBox.style.opacity = 1;
        }, 100);

        setTimeout(() => {
            messageBox.style.transform = "translateX(100%)";
            messageBox.style.opacity = 0;
        }, 2500);

        // Remove the message box after it fades out
        setTimeout(() => messageBox.remove(), 3000);
    }
}

// Initialize Password Generator
document.addEventListener("DOMContentLoaded", () => new PasswordGenerator());
