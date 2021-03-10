<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$result = $conn->query("SELECT * FROM `event` where Status='Open' and Topic='".$_POST['Topic']."'"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'Topic'=> $row['Topic'],
            'Description'=> $row['Description'],
            'Time'=> $row['Time'],
            
            'Image'=>base64_encode($row['Image']),
            'SpeakerName'=>$row['SpeakerName'],
            'SpeakerPosition'=>$row['SpeakerPosition'],
            'SpeakerImage'=>base64_encode($row['SpeakerImage']),
            'SpeakerName2'=>$row['SpeakerName2'],
            'SpeakerImage2'=>base64_encode($row['SpeakerImage2']),
            'SpeakerPosition2'=>$row['SpeakerPosition2'],
            'Status'=>$row['Status'],
        
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Data not found...</p> 
<?php } ?>

