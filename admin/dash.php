

<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allows requests from any origin
header("Access-Control-Allow-Methods: GET, OPTIONS"); // Allows only GET requests
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('config.php');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

// Fetch Appointments
$appQuery = "SELECT id, name, phone, created_at FROM basic_appointments ORDER BY created_at DESC";
$appResult = $conn->query($appQuery);
$appointments = [];
while ($row = $appResult->fetch_assoc()) {
    $appointments[] = $row;
}

// Fetch Appointments Bookings
$appQuery = "SELECT id, fullName, consultationType, phone, age, gender, contactMethod, created_at FROM detailed_appointments ORDER BY created_at DESC";
$appResult = $conn->query($appQuery);
$appointmentsBooking = [];
while ($row = $appResult->fetch_assoc()) {
    $appointmentsBooking[] = $row;
}


// Fetch Job Applications
$jobQuery = "SELECT full_name, email, phone, message, submission_date FROM job_applications ORDER BY submission_date DESC";
$jobResult = $conn->query($jobQuery);
$jobs = [];
while ($row = $jobResult->fetch_assoc()) {
    $jobs[] = $row;
}

// Fetch Confirmed Bookings Count
// $bookingQuery = "SELECT COUNT(*) AS total FROM bookings WHERE status='confirmed'";
// $bookingResult = $conn->query($bookingQuery);
// $bookings = $bookingResult->fetch_assoc()['total'];

$response = [
    'appointments' => $appointments,
    'jobs' => $jobs,
    'appointmentsBooking'=> $appointmentsBooking
];

echo json_encode($response);
$conn->close();
?>