$.ajax({
        url:"http://www.nota100.pt/WS/index.php",
        type:"GET",
        dataType:"json",
        async: false,
        data: { tabela: table },
        ContentType: "application/json",
        crossDomain: true,
        beforeSend: function(){
			window.plugins.spinnerDialog.show('','Loading...');
        },
        success: function(response){        
            //execução de querys para inserir 500 registos 
        },
        error: function(err){
            alert(" update db error " + eval(err.status));
        }
    }).always(function(){
    	window.plugins.spinnerDialog.hide();
    });