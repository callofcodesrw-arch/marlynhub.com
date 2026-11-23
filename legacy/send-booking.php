<?php
// Marlene Service Hub - Simple Booking Form Email Handler
// Receives bookings from contact.html and sends them to info@marlenhub.com

$to = "info@marlenhub.com";
$siteName = "Marlene Service Hub";

function clean_input($value) {
    $value = trim($value ?? "");
    $value = strip_tags($value);
    $value = str_replace(["\r", "\n"], [" ", " "], $value);
    return $value;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html#quick-request");
    exit;
}

// Simple anti-spam honeypot field
if (!empty($_POST["website"])) {
    header("Location: contact.html?sent=1#quick-request");
    exit;
}

$name = clean_input($_POST["name"] ?? "");
$phone = clean_input($_POST["phone"] ?? "");
$service = clean_input($_POST["service"] ?? "");
$location = clean_input($_POST["location"] ?? "");
$message = trim(strip_tags($_POST["message"] ?? ""));

if ($name === "" || $phone === "" || $service === "" || $location === "" || $message === "") {
    header("Location: contact.html?error=1#quick-request");
    exit;
}

$subject = "New Booking Request - " . $service;

$emailBody = "New booking request from Marlene Service Hub website\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Phone: " . $phone . "\n";
$emailBody .= "Service: " . $service . "\n";
$emailBody .= "Location: " . $location . "\n\n";
$emailBody .= "Booking Message:\n" . $message . "\n\n";
$emailBody .= "Submitted: " . date("Y-m-d H:i:s") . "\n";

$headers = [];
$headers[] = "From: Marlene Service Hub <info@marlenhub.com>";
$headers[] = "Reply-To: info@marlenhub.com";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($sent) {
    header("Location: contact.html?sent=1#quick-request");
    exit;
}

header("Location: contact.html?error=1#quick-request");
exit;
?>
