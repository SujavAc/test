<?php
include './config.php';
// Check connection
$status = $statusMsg = '';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);

} else{
    
    $insert =$conn->query("INSERT INTO `courseenquiry` (FirstName, LastName, Email, PhoneNumber, CountryOfPassport, Question, Message, Date) 
    VALUES ('".$_POST['firstname']."','".$_POST['lastname']."','".$_POST['email']."','".$_POST['number']."','".$_POST['passport']."','".$_POST['question']."','".$_POST['message']."',NOW())");
    if($insert){
    //     http_response_code(200);
	// $subject = $_POST['question'];
	// $to = "andy@rogergroup.com.au";
	// $from = $_POST['email'];
    // $msg = $_POST['number'].$_POST['message'];


    // $headers = "MIME-Version: 1.0\r\n";
	// $headers.= "Content-type: text/html; charset=UTF-8\r\n";
	// $headers.= "From: <" . $from . ">";
    // mail($to, $subject, $msg, $headers);

        $statusMsg = "Your enquiry is successfully delivered. Thank you for contacting us."; 
    }else{
        $statusMsg = "Something Error, please try again.";
    }
}
echo $statusMsg;
?>