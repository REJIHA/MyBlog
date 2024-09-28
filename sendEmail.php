<!-- 
    This is the php for myWebsite's index.html. It handles email sending
    upon submit.


	Ended up not using this code for three reasons:
		1. Using XAMPP, localhost on correct port did not connect (loading until max_execution_time
			reached). I realized that it's because the XAMPP's localhost port will change
			sometimes... which I don't know why.
		2. Using mail server, got "530 5.7.0 must issue a starttls command first" error. I could
			not find a way to solve this without hardcoding my account id and password and this
			is my public project...
		3. Tried to use PHPMailer, but composer failed to download.
-->

<?php
	// TODO: echo redirects page to new page; change it to popup

	// Check which php.ini file this is going to use
	$inipath = php_ini_loaded_file();
	if ($inipath) {
		echo 'Loaded php.ini: ' . $inipath, "<br>";
	} else {
		echo 'A php.ini file is not loaded';
	}

	// Receive data
	echo "request: ", $_SERVER["REQUEST_METHOD"], "<br>", "<br>";
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// Retrieve POST data
		$name = htmlspecialchars($_POST['input_name']);
		$email = htmlspecialchars($_POST['input_email']);
		$subject = htmlspecialchars($_POST['input_subject']);
		$message = htmlspecialchars($_POST['input_message']);
		
		// Check if they are correctly sent
		echo "name: ", $name, "<br>";
		echo "email: ", $email, "<br>";
		echo "subject: ", $subject, "<br>";
		echo "message: ", $message, "<br>";
		
		// Setup the data
		$recipient = "cloudymonkey@naver.com";	// my email
		$headers = "From: $name <$email>";
		// $subject_back = "Copy of your form submission";
		// $headers_back = "To: Hyoseo Kwag <$recipient> Subject: $subject";

		// php.ini not correclty getting the smtp & smtp_host... so setting it here
		// ini_set("SMTP","smtp.naver.com");
		// ini_set("smtp_port","587");

		ini_set("SMTP","localhost");
		ini_set("smtp_port","80");


		// Send email
		if (mail($recipient, $subject, $message, $headers)) {
			// mail($email, $subject_back, $message, $headers_back);		// Send copy to sender
			echo "Email sent successfully!", "<br>";
		} else {
			echo "Failed to send email. Please try again later.", "<br>";
		}
	} else {
		// Not a POST request; display a 403 forbidden error
		header("HTTP/1.1 403 Forbidden");
			echo "You are not allowed to access this page.";
	}
?>