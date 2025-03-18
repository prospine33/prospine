<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('config.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$encryption_key = 'c3A@5gT1!kL7mZp8#Q3rB9fS0vD2jJ6x';

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$consultationType = $_POST['consultationType'] ?? '';
$fullName = $_POST['fullName'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$gender = $_POST['gender'] ??'';
$dob = $_POST['dob'] ?? '';
$age = $_POST['age'] ?? '';
$occupation = $_POST['occupation'] ?? '';
$address = $_POST['address'] ?? '';
$medical_condition = $_POST['condition'] ?? '';
$contactMethod = $_POST['contactMethod'] ?? '';

// Validate required fields
if (empty($consultationType) || empty($fullName) || empty($email) || empty($phone) || empty($gender) || empty($dob) || empty($age) || empty($occupation) || empty($medical_condition) || empty($contactMethod)) {
    die("<div style='text-align:center; padding:20px; font-size:18px; color:red;'>All required fields must be filled out. Please go back and complete the form.</div>");
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO detailed_appointments (consultationType, fullName, email, phone, gender, dob, age, occupation, address, medical_condition, contactMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssssss", $consultationType, $fullName, $email, $phone, $gender, $dob, $age, $occupation, $address, $medical_condition, $contactMethod);

if ($stmt->execute()) {
    echo "
    <div style='text-align:center; padding:20px; font-size:18px; color:green; background-color:#fff; box-shadow: 0px 3px 3px rgba(0,0,0,0.3);'>
        <p>✅ Appointment submitted successfully!</p>
        <p>You will be redirected back in <span id='countdown'>3</span> seconds.</p>
    </div>
    <script>
        let count = 3;
        setInterval(function() {
            count--;
            document.getElementById('countdown').textContent = count;
            if (count <= 0) {
                window.location.href = 'https://sumit7739.github.io/prospine1/';
            }
        }, 1000);
    </script>
    ";
} else {
    echo "<div style='text-align:center; padding:20px; font-size:18px; color:red;'>❌ Error: " . $stmt->error . "</div>";
}

$stmt->close();
$conn->close();
?>

