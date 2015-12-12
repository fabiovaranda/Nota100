$('#btLogin').click(function(){
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
        beforeSend: function() { $('#wait').show(); },
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
                $('#wait').hide();
                $('#divMenu').show();
                stats(db);
                //$('#mainDiv').show();
            }else{
                $('#wait').hide();
                alert('E-mail ou Password inválidos');
            }
            
        },
        error: function(err){
            alert("login error: " + err.status);
        }
    });
    
});