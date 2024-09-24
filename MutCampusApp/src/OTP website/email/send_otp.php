<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';
require 'path/to/PHPMailer/src/Exception.php';

$conn = new mysqli('localhost', 'root', 'tycoon', 'mutannouncements');

// Function to generate a 6-digit OTP
function generateOTP() {
    return rand(100000, 999999);
}

function sendOTPEmail($email, $otp) {
    $mail = new PHPMailer(true);
    // Server settings (same as before)

    try {
        // Set mail properties (same as before)
        
        // Create the link to the OTP verification page
        $verificationURL = "https://yourdomain.com/otp_verification.php?email=" . urlencode($email);
        
        // Email body with OTP and verification link
        $mailContent = "
            <h2>Your OTP Code is: <strong>$otp</strong></h2>
            <p>To verify your account, please enter the OTP on our website by clicking the button below.</p>
            <a href='$verificationURL' style='padding: 10px 20px; background-color: #4d7daf; color: white; text-decoration: none; border-radius: 5px;'>Verify Now</a>
        ";
        $mail->Body = $mailContent;

        $mail->send();
        echo 'OTP has been sent.';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

// Handle the send OTP request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];

    // Generate OTP and save to database
    $otp = generateOTP();
    $stmt = $conn->prepare("UPDATE student_tbl SET otp_code = ?, verified = 'No' WHERE email = ?");
    $stmt->bind_param('is', $otp, $email);
    $stmt->execute();

    // Send OTP email
    sendOTPEmail($email, $otp);
}
?>
