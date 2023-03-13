<?php
session_start();
$amt = $_POST['cost'];
echo $amt;
// Set your API credentials
$api_key = "test_b403824c246a878ab28a9fd0149";
$auth_token = "test_4478ab91db74ce149532dd82990";

// Set the payment details
$name = "John Doe";
$email = "johndoe@example.com";
$phone = "9999999999";
$amount = $amt;
$purpose = "Test Payment";
$redirect_url = "http://example.com/redirect_url.php";
$webhook_url = "http://example.com/webhook_url.php";

// Initialize cURL
$ch = curl_init();

// Set the API endpoint
curl_setopt($ch, CURLOPT_URL, "https://test.instamojo.com/api/1.1/payment-requests/");

// Set the request method
curl_setopt($ch, CURLOPT_POST, 1);

// Set the request headers
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "X-Api-Key: $api_key",
    "X-Auth-Token: $auth_token"
));

// Set the request body
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "amount" => $amount,
    "purpose" => $purpose,
    "redirect_url" => $redirect_url,
    "webhook_url" => $webhook_url
)));

// Receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the API request
$response = curl_exec($ch);

// Check if there was an error
if(curl_errno($ch)){
    echo 'Curl error: ' . curl_error($ch);
}

// Close cURL
curl_close($ch);

$response = json_decode($response);

// Store payment request id in session
// $_SESSION["T_id"] = $response->payment_request->id;

// Redirect to payment gateway
header("Location: ".$response->payment_request->longurl);
exit;
?>