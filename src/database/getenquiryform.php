<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 





$result = $conn->query("SELECT * FROM `enquiry`"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ ?>
        <?php
         $enquiry[] = array(
            'ID'=> $row['ID'],
            'FullName'=>$row['FullName'],
            'Email'=>$row['Email'],
            'Message'=>$row['Message'],
            'Date'=>$row['Date']
        
        );
        ?>
        
        
       
        <?php } ?> 
        <?php
      echo json_encode($enquiry) ; 
      ?>
     
    
<?php } ?> 
    
