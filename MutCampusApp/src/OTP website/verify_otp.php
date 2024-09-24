<?php
$host = 'localhost';
$user = 'root';
$password = 'tycoon';
$database = 'mutannouncements';

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$otp = $data['otp'];

// Simple query to check OTP and update the verification status
$sql = "SELECT * FROM users WHERE otp = '$otp' AND verified = 'No'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Update verification status
    $updateSql = "UPDATE users SET verified = 'Yes' WHERE otp = '$otp'";
    if ($conn->query($updateSql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating record']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
}

$conn->close();


// Database connection
$conn = new mysqli('localhost', 'root', 'tycoon', 'mutannouncements');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $otp = $_POST['otp'];

    // Check OTP from the database
    $stmt = $conn->prepare("SELECT otp_code FROM users WHERE email = ? AND otp_code = ?");
    $stmt->bind_param('si', $email, $otp);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // OTP matches, update 'verified' status
        $updateStmt = $conn->prepare("UPDATE users SET verified = 'Yes' WHERE email = ?");
        $updateStmt->bind_param('s', $email);
        $updateStmt->execute();

        echo 'Your account has been verified successfully.';
    } else {
        echo 'Invalid OTP. Please try again.';
    }
}
?>
