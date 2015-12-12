function replaceSpecialChar(str){
    var res = str.replace("´","'");
    res = str.replace('´', '"');
    return res;
}

function formUpdate(db){
    var data = "<div class='row'>";
            data += "<div class='medium-12 small-12 columns'>";
                data += "<label>Atualizar Base de Dados</label><hr/>";
            data += "</div>";
             data += "</div>";
     data += "<div class='row'>";
     	data += "<div class='medium-3 medium-offset-3 hide-for-small columns'>&nbsp</div>";
            data += "<div class='medium-3 small-12 columns'>";
                data += "<select id='tabela'>";
                    data += "<option value='perguntas'>Futebol</option>";
                    data += "<option value='perguntasIngles'>Soccer</option>";
                    data += "<option value='perguntasFutsal'>Futsal</option>";
                data += "</select>";
            data += "</div>";            
        data += "<div class='medium-3 small-12 columns'>";
            data += "<input type='button' onclick='updateTables("+db+")' value='Atualizar' class='tiny round button'/>";
        data += "</div>";
    data += "</div>";
	$('#mainDiv').html(data);
    $('#mainDiv').show();
}

function updateTables(db){
    SpinnerDialog.show();
    var table = $('#tabela').val();
    $.ajax({
        url:"http://www.nota100.pt/WS/index.php",
        type:"GET",
        dataType:"json",
        async: false,
        data: { tabela: table },
        ContentType: "application/json",
        crossDomain: true,
        success: function(response){        
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
                        db.executeSql(dat, [], function(){}, function(err){
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
                        db.executeSql(dat);
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
                        db.executeSql(dat);
                    }
                break;
            }
        },  
        error: function(err){
            alert(" update db error " + eval(err.status));
        }                       
    });
    SpinnerDialog.hide();  
}

$('#atualizarBD').click(function(){
    formUpdate(db);
});