$('#btLogin').click(function(){
    if ( checkConnection() == 'No network connection'){
        alert('Error. No network connection');
    }else{
        var mail = $('#email').val();
        var pwd = $('#password').val();
        
        $.ajax({
            url:"http://www.nota100.pt/WS/login.php",
            type:"GET",
            dataType:"json",
            async: false,
            data: { email: mail, password: pwd },
            ContentType: "application/json",
            crossDomain: true,
            beforeSend: function() {  SpinnerDialog.show();  },
            success: function(response){    
                if (response.status_message == "login"){
                    var query = "insert into utilizador(id, email) values ("+response.id+", '"+response.email+"')";                    
                    
                    db.executeSql(query,[],function(res){
                        query = "select * from utilizador where id = " + response.id;
                        db.executeSql(query,[],function(res){
                            alert(res.rows.item(0).email);
                        });
                    },function(err){    
                        alert("query error " +err.message);
                    });

                    $('#divLogin').hide();
                     SpinnerDialog.hide(); 
                    $('#divMenu').show();
                    stats(db);
                    //$('#mainDiv').show();
                }else{
                    SpinnerDialog.hide(); 
                    alert('E-mail ou Password inválidos');
                }
                
            },
            error: function(err){
                SpinnerDialog.hide(); 
                alert('Error. No network connection ' + err.message);
            }
        });
    }
});