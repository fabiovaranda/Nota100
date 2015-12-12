function replaceSpecialChar(str){
    var res = str.replace("´","'");
    res = str.replace('´', '"');
    return res;
}

function updateTables(table,db){
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
    //$('#wait').hide();
}

$('#atualizarFutebol').click(function(){
    //updateTables("perguntas", db);    
    setTimeout(function () {
        $('#btCloseWait').trigger('click');    
    }, 5000);
    
});
$('#atualizarFutebolIng').click(function(){
    updateTables("perguntasIngles",db);    
    $('#btCloseWait').trigger('click');
});
$('#atualizarFutsal').click(function(){
    updateTables("perguntasFutsal",db);
    $('#btCloseWait').trigger('click');    
});
