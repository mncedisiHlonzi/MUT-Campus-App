document.addEventListener('DOMContentLoaded', function() {
  const otpInputs = document.querySelectorAll('.otp-input');

  otpInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
          if (input.value.length === 1 && /^\d+$/.test(input.value)) {
              if (index < otpInputs.length - 1) {
                  otpInputs[index + 1].focus();  // Move to the next input field
              }
          } else {
              input.value = '';  // Clear input if it's not a digit
          }
      });

      // Move to the previous input field on backspace
      input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
              otpInputs[index - 1].focus();
          }
      });
  });

  document.getElementById('otpForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      let otpCode = '';
      let allFilled = true;

      otpInputs.forEach(input => {
          if (input.value === '') {
              allFilled = false;
          }
          otpCode += input.value;  // Collect OTP digits
      });

      if (allFilled && otpCode.length === 6 && /^\d+$/.test(otpCode)) {
          document.getElementById('errorMessage').textContent = ''; // Clear previous error

          // Show the loading screen
          const loadingScreen = document.getElementById('loadingScreen');
          loadingScreen.style.display = 'flex';

          // Simulate backend verification process with a timeout
          setTimeout(function() {
              loadingScreen.style.display = 'none'; // Hide the loading screen

              const successMessage = document.getElementById('successMessage');
              successMessage.style.display = 'flex'; // Show the success message

              // Redirect back to the app after 3 seconds
              setTimeout(function() {
                  window.location.href = "your-app-url://"; // Replace with your app's URL
              }, 3000);

          }, 2000); // Simulate a 2-second loading/verification process

          // Call the function to verify OTP (assuming there's a backend process)
          verifyOTP(otpCode);

      } else {
          document.getElementById('errorMessage').textContent = 'Please enter a valid 6-digit OTP.';
      }
  });

  function verifyOTP(otp) {
      fetch('verify_otp.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ otp })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              document.getElementById('successMessage').textContent = 'OTP Verified successfully.';
          } else {
              document.getElementById('errorMessage').textContent = 'Invalid OTP. Please try again.';
          }
      })
      .catch(error => {
          console.error('Error during OTP verification:', error);
          document.getElementById('errorMessage').textContent = 'An error occurred during verification.';
      });
  }
});
