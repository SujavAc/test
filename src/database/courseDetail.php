<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$result = $conn->query("SELECT * FROM `andy` WHERE Title='".$_POST['Title']."'"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'Picture'=>base64_encode($row['Picture']),
            'Title'=>$row['Title'],
            'Description'=>$row['Description'],
            'Details'=>$row['Details'],
            
            
        
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Data not found...</p> 
<?php } ?>

