<!-- 
    This is the php for myWebsite's index.html. It handles email sending
    upon submit.
-->
<?php

// Please specify your Mail Server - Example: mail.example.com.
//ini_set("SMTP","smtp.naver.com");

// Please specify an SMTP Number 25 and 8889 are valid SMTP Ports.
//ini_set("smtp_port","587");

// Please specify the return address to use
//ini_set('sendmail_from', 'cloudymonkey@naver.com');


echo "request: ", $_SERVER["REQUEST_METHOD"], "<br>", "<br>";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Retrieve POST data
	$name = htmlspecialchars($_POST['input_name']);
	$email = htmlspecialchars($_POST['input_email']);
	$subject = htmlspecialchars($_POST['input_subject']);
	$message = htmlspecialchars($_POST['input_message']);
	
	echo "name: ", $name, "<br>";
	echo "email: ", $email, "<br>";
	echo "subject: ", $subject, "<br>";
	echo "message: ", $message, "<br>";

	
	// Send email using data
	$recipient = "cloudymonkey@naver.com";	// my email
	$headers = "From: $name <$email>";
	if (mail($recipient, $subject, $message, $headers)) {
		echo "Email sent successfully!";
	} else {
		echo "Failed to send email. Please try again later.";
	}
} else {
	// Not a POST request; display a 403 forbidden error
	header("HTTP/1.1 403 Forbidden");
    	echo "You are not allowed to access this page.";
}
?>