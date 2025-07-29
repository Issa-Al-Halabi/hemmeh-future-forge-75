<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Handle CORS for React
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['name'], $data['email'], $data['subject'], $data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields']);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars($data['subject']);
$message = htmlspecialchars($data['message']);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email address']);
    exit;
}

// SMTP config
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'rlc.company.info@gmail.com';
    $mail->Password   = 'hjxlovkpzaxvqhxu';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('office@hmmh.consulting', 'HmmH');
    // $mail->addAddress('mousahlp@gmail.com', 'Mousa Hlp');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "Contact Form: $subject";

    // Create HTML message
    $htmlMessage = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Subject:</strong> $subject</p>
    <h3>Message:</h3>
    <p>" . nl2br($message) . "</p>
    ";

    // Create plain text version
    $textMessage = "
    New Contact Form Submission
    -------------------------
    Name: $name
    Email: $email
    Subject: $subject
    
    Message:
    $message
    ";

    $mail->Body    = $htmlMessage;
    $mail->AltBody = $textMessage;

    $mail->send();
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again later.',
        'debug' => $mail->ErrorInfo // Remove this in production
    ]);
}
