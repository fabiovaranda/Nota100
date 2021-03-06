var dbb;

function replaceSpecialChar(str){
    var res = str.replace("´","'");
    res = str.replace('´', '"');
    return res;
}

function formUpdate(){
    /*
    var data = "<div class='row'>";
            data += "<div class='medium-11 medium-centered small-12 columns'>";
                data += "<label>Atualizar Base de Dados</label><hr/>";
            data += "</div>";
             data += "</div>";
             */
    var data = "<div class='row' style='margin-top:8%'>";
     	    data += "<div class='medium-8 medium-centered small-8 small-centered large-12 large-centered columns'><center>";
                data += "<select id='tabela'>";
                    data += "<option value='perguntas'>Futebol</option>";
                    data += "<option value='perguntasIngles'>Soccer</option>";
                    data += "<option value='perguntasFutsal'>Futsal</option>";
                data += "</select>";
            data += "</center></div>";            
        data += "<div class='medium-12 large-12 small-12 columns'><center>";
            data += "<input id='btAtualizarBD' type='button' value='Atualizar' class='hollow button'/>";
        data += "</center></div>";
        data += "<div class='medium-3 columns'>&nbsp;</div>";
    data += "</div>";

    data += "<script>$('#btAtualizarBD').click(function(){ updateTables(); });</script>";

	$('#mainDiv').html(data);
    $('#mainDiv').show();
}

function updateTables(){
	var table = $('#tabela').val();    
    var request = $.ajax({
        url:"http://www.nota100.pt/WS/index.php",
        type:"GET",
        dataType:"json",
        async: false,
        data: { tabela: table },
        ContentType: "application/json",
        crossDomain: true,
        beforeSend: function(){
			SpinnerDialog.show();
        },
        success: function(response){    
        },
        error: function(err){
        	SpinnerDialog.hide();
            alert(" Error. No network connection. ");
        }
    }).done(function(response){
    	//alert(response[0].texto);
    	dbb.transaction(function(tx){
    		var conta = 0;
            var dat = "";
            switch (table){
                case 'perguntas':                 	
                    while(response[conta] != null){
                        var texto = replaceSpecialChar(response[conta].texto);
                        var r1 = replaceSpecialChar(response[conta].r1);
                        var r2 = replaceSpecialChar(response[conta].r2);
                        var r3 = replaceSpecialChar(response[conta].r3);
                        var r4 = replaceSpecialChar(response[conta].r4);
                        dat = "insert into perguntas(id,texto, resposta1,resposta2,resposta3,resposta4,respostaCorreta) values ("+response[conta].id+", '"+texto+"','"+r1+"','"+r2+"','"+r3+"','"+r4+"',"+response[conta].rc+");";
                        conta++;
                        tx.executeSql(dat, [], function(){}, function(err){
                            alert('insert error ' + err.message);
                        });
                    }
                break;
                case 'perguntasIngles': 
                    while(response[conta] != null){
                        var texto = replaceSpecialChar(response[conta].texto);
                        var r1 = replaceSpecialChar(response[conta].r1);
                        var r2 = replaceSpecialChar(response[conta].r2);
                        var r3 = replaceSpecialChar(response[conta].r3);
                        var r4 = replaceSpecialChar(response[conta].r4);
                        dat = "insert into perguntasIngles(id,texto, resposta1,resposta2,resposta3,resposta4,respostaCorreta) values ("+response[conta].id+", '"+texto+"','"+r1+"','"+r2+"','"+r3+"','"+r4+"',"+response[conta].rc+");";
                        conta++;
                        tx.executeSql(dat, [], function(){}, function(err){
                            alert('insert error ' + err.message);
                        });
                    }
                break;
                case 'perguntasFutsal': 
                    while(response[conta] != null){
                        var texto = replaceSpecialChar(response[conta].texto);
                        var r1 = replaceSpecialChar(response[conta].r1);
                        var r2 = replaceSpecialChar(response[conta].r2);
                        var r3 = replaceSpecialChar(response[conta].r3);
                        var r4 = replaceSpecialChar(response[conta].r4);
                        dat = "insert into perguntasFutsal(id,texto, resposta1,resposta2,resposta3,resposta4,respostaCorreta) values ("+response[conta].id+", '"+texto+"','"+r1+"','"+r2+"','"+r3+"','"+r4+"',"+response[conta].rc+");";
                        conta++;
                        tx.executeSql(dat, [], function(){}, function(err){
                            alert('insert error ' + err.message);
                        });
                    }
                break;
            }
    	},function(err){
    		console.log('transaction error: ' + err.message);
    	},function(){
    		//transaction ok    		
    		SpinnerDialog.hide();
    	});
    }).fail(function(){
    	console.error('fail'); 
    }).always(function(){
    	console.error('always');
    });
}

$('#atualizarBD').click(function(){
	if ( checkConnection() == 'No network connection'){
		alert('Error. No network connection');
	}else{
		dbb = db;
    	formUpdate();	
	}
});