<?php
include './config.php';
// Check connection
$status = $statusMsg = '';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);

} else{
            $sql = "SELECT * FROM eventregister WHERE Email='".$_POST['email']."' LIMIT 1";
$res = mysqli_query($conn, $sql);



if (mysqli_num_rows($res) > 0) {
        $statusMsg = "You have already registered for event";
    }

else{
    $insert =$conn->query("INSERT INTO eventregister (FullName, Email, Phone,EventName, Date) 
    VALUES ('".$_POST['name']."','".$_POST['email']."','".$_POST['phone']."','".$_POST['eventname']."',NOW())");
    if($insert){
        $statusMsg = "Your have successfully register for event."; 
    }else{
        $statusMsg = "Error in booking, please try again.";
    }
        }
    
    
}
echo $statusMsg;
?>