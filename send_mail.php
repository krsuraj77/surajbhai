<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    
    $to = "surajkumarbusiness01@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission";
    
    $message = "Name: " . $name . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Phone: " . $phone . "\n";
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Thank you for contacting us!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send message."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>