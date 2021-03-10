<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 





$result = $conn->query("SELECT * FROM `frequentquestion` Where Level= '".$_POST['Title']."'"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        $enquiry[] = $row ;
        
        ?>
       
        <?php } ?> 
        <?php
      echo json_encode($enquiry) ; 
      ?>
     
    
<?php } ?> 
    