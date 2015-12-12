var dbb;

function corrigirPergunta(){
    SpinnerDialog.show();  
    var RU = $("input[name='resposta']:checked").val();
    var RC = $('#respostaCorreta').val();
    var id = $('#id').val();
    var idDesporto = $('#idDesporto').val();

    var query = "insert into respostas (idPergunta, respostaUtilizador, respostaCorreta, idDesporto) values ("+id+","+RU+","+RC+","+idDesporto+")";
    dbb.executeSql(query,[],function(res){        
    },function(err){
        alert('response error: ' + err.message);
    });

    var tabela = "";
    switch(idDesporto){
        case 1 : tabela = "perguntas"; break;
        case 2 : tabela = "perguntasIngles"; break; 
        case 3 : tabela = "perguntasFutsal"; break; 
        default : tabela = "perguntas"; break;
    }

    if (RC == RU){
        mostrarPerguntaParaResponder(1, tabela);
    }else{
        mostrarCorrecao(RU, RC, id, dbb, tabela);
    }

    SpinnerDialog.hide();  
}

function mostrarCorrecao(respostaUtilizador, respostaCorreta, id, db, tabela){
    var query = "select * from " + tabela + " where id = "+ id;
    var RU;
    db.executeSql(query, [], function(res) {
        switch(respostaUtilizador){
            case '1': RU = res.rows.item(0).resposta1; break;
            case '2': RU = res.rows.item(0).resposta2; break;
            case '3': RU = res.rows.item(0).resposta3; break;
            case '4': RU = res.rows.item(0).resposta4; break;
        }
        
        switch(respostaCorreta){
            case '1': RC = res.rows.item(0).resposta1; break;
            case '2': RC = res.rows.item(0).resposta2; break;
            case '3': RC = res.rows.item(0).resposta3; break;
            case '4': RC = res.rows.item(0).resposta4; break;
        }        
        var data = "<div class='row panel'>";
                data +="<div class='small-12 medium-12 columns'>";
                    data += "<b>"+res.rows.item(0).id + " - " + res.rows.item(0).texto + "</b>";
                data +="</div>";
        data +="</div>";
        data += "<div class='row'>";
                data +="<div class='small-12 medium-12 columns'>";
                    data += " <img src='lib/foundation/img/errado.png'/> " + RU ;
                data +="</div>";
        data +="</div>";
        data += "<div class='row'>";
                data +="<div class='small-12 medium-12 columns'>";
                    data += " <img src='lib/foundation/img/certo.png'/> " + RC ;
                data +="</div>";
        data +="</div>";

        data += "<div class='row'>";
                data +="<div class='small-12 medium-12 columns'>";
                    data += "<br/><center><input type='button' class='small round button' value='Próxima Questão' onclick='mostrarPerguntaParaResponder(-1, "+tabela+")'/></center>";
                data +="</div>";
        data +="</div>";
        
        document.getElementById('mainDiv').innerHTML = data;
    });
}

function mostrarPerguntaParaResponder(acertou, tabela){
     SpinnerDialog.show();    
     var idDesporto = -1;
     //idDesporto - 1 Futebol | 2 - Futebol Inglês | 3 - Futsal
     var sport;
     switch(tabela){
        case "perguntas": idDesporto = 1; sport = 'Futebol'; break;
        case "perguntasIngles": idDesporto = 2; sport = 'Soccer'; break;
        case "perguntasFutsal": idDesporto = 3; sport = 'Futsal'; break;
     }
    var query = "select count(*) as cp from " + tabela;
    dbb.executeSql(query, [], function(result) {
        query = "select * from "+tabela+" P where P.id not in (select R.idPergunta from respostas R where idDesporto = "+idDesporto+" and respostaCorreta = respostaUtilizador) order by RANDOM() limit 1," + result.rows.item(0).cp;
        
        dbb.executeSql(query, [], function(res) {
            
            var data = "<div class='row'>";
                data += "<div class='medium-12 small-12 columns'>";
                    data += "<label>"+sport+"</label><hr/>";
                data += "</div>";
            data += "</div>";

            if (acertou == 1){
                data += "<div class='row'>";
                    data +="<div class='small-10 small-centered medium-centered medium-4 columns'>";
                        data += "<center><div data-alert class='alert-box info radius'><center>Resposta Correta!</center></div></center>";
                    data +="</div>";
                data +="</div>";    
            }
            data += "<form id='myForm'><div class='row'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += res.rows.item(0).id + " - " + res.rows.item(0).texto;
                    data +="<hr/></div>";
            data +="</div>";
            
            data += "<div class='row gradientFV'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += "<label><input type='radio' name='resposta' value='1' id='resposta1'>"  + res.rows.item(0).resposta1+"</label>";
                    data +="</div>";
            data +="</div>";
            data += "<div class='row'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += "<label><input type='radio' name='resposta' value='2' id='resposta2'>"  + res.rows.item(0).resposta2+"</label>";
                    data +="</div>";
            data +="</div>";
            data += "<div class='row gradientFV'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += "<label><input type='radio' name='resposta' value='3' id='resposta3'>"  + res.rows.item(0).resposta3+"</label>";
                    data +="</div>";
            data +="</div>";
            if (res.rows.item(0).resposta4 != ""){
                data += "<div class='row'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += "<label><input type='radio' name='resposta' value='4' id='resposta4'>"  + res.rows.item(0).resposta4+"</label>";
                    data +="</div>";
               data +="</div>";
            }
            data += "<div class='row'>";
                    data +="<div class='small-12 medium-12 columns'>";
                        data += "<br/><center><input type='button' class='small round button' value='Responder' onclick='corrigirPergunta()' id='btResponderPergunta'/></center>";
                        data += "<input type='hidden' id='id' value='"+res.rows.item(0).id+"'/>";
                        data += "<input type='hidden' id='respostaCorreta' value='"+res.rows.item(0).respostaCorreta+"'/>";
                        data += "<input type='hidden' id='idDesporto' value='"+idDesporto+"'/>";
                    data +="</div>";
            data +="</div></form>";

            
            
            document.getElementById('mainDiv').innerHTML = data; 
            $('#mainDiv').show();

            setTimeout(function(){ 
                SpinnerDialog.hide();        
            }, 500);

        },function(error) {
          alert('select questions error: ' + error.message);
        });
    });    
}

$('#perguntasFutebol').click(function(){  
   dbb = db;
   mostrarPerguntaParaResponder(-1, "perguntas");
});

$('#perguntasFutebolIng').click(function(){  
   dbb = db;
   mostrarPerguntaParaResponder(-1, "perguntasIngles");
});

$('#perguntasFutsal').click(function(){  
   dbb = db;
   mostrarPerguntaParaResponder(-1, "perguntasFutsal");
});