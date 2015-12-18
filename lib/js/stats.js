function HaPerguntasNaTabela(db,table){
    var queryCountPerguntas = "select count(*) as cp from " + table;
    db.executeSql(queryCountPerguntas, [], function(res){
        var x = parseInt(res.rows.item(0).cp);
        var y = x > 0;        
        return y;
    });
}


function stats(db){
    SpinnerDialog.show();
    var data = "";
    data = "<div class='row'>";
        data += "<div class='large-12 medium-12 small-12 columns'>";
            data += "<br/><center><img src='lib/foundation/img/banner.png' /></center><br/>";
        data += "</div>";
    data += "</div>";
    
    $('#mainDiv').html(data);

    var queryCountPerguntas = "select count(*) as cp from perguntas";    
    db.executeSql(queryCountPerguntas, [], function(res){
        var q1 = $('#mainDiv').html();
        q1 += "<div class='row' >";
            q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-top: solid 1px #666666; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                q1 += JSON.stringify(res.rows.item(0).cp) + " perguntas de Futebol";
            q1 += "</div>";
        q1 += "</div>";
        $('#mainDiv').html(q1);
    }, function(err){
        alert('error query count ' + err.message);
    });

    queryCountPerguntas = "select count(*) as cp from perguntasIngles";
    db.executeSql(queryCountPerguntas,[],function(res){
        var q1 = $('#mainDiv').html();
        q1 += "<div class='row' >";
            q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                q1 += res.rows.item(0).cp + " perguntas de Futebol em Inglês";
            q1 += "</div>";
        q1 += "</div>";
        $('#mainDiv').html(q1);
    });

    queryCountPerguntas = "select count(*) as cp from perguntasFutsal";
    db.executeSql(queryCountPerguntas,[],function(res){
        var q1 = $('#mainDiv').html();
        q1 += "<div class='row' >";
            q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                q1 += res.rows.item(0).cp + " perguntas de Futsal";
            q1 += "</div>";
        q1 += "</div>";
        $('#mainDiv').html(q1);
    });

    var queryCountRespostasFutebol = "select count(*) as cp from respostas where idDesporto = 1";
    var respostasFutebol = -1;
    db.executeSql(queryCountRespostasFutebol, [], function (res) {
        respostasFutebol = res.rows.item(0).cp;
        if (respostasFutebol>0){
            var queryCountRespostasCertasFutebol = "select count(*) as cp from respostas where idDesporto = 1 and respostaCorreta == respostaUtilizador";
        
            db.executeSql(queryCountRespostasCertasFutebol, [], function(result){
                var percent = (result.rows.item(0).cp/respostasFutebol)*100;
                var percentagem = percent.toString().substring(0,4);
                var q1 = $('#mainDiv').html();
                q1 += "<div class='row'>";
                    q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                        q1 += "Futebol - "+ percentagem + " % de respostas certas (" + result.rows.item(0).cp + " / " + res.rows.item(0).cp + ")";
                    q1 += "</div>";
                q1 += "</div>";
                $('#mainDiv').html(q1);
            });    
        }
        
    });

    var queryCountRespostasFutebolIngles = "select count(*) as cp from respostas where idDesporto = 2";
    var respostasFutebolIngles = -1;
    db.executeSql(queryCountRespostasFutebolIngles, [], function (res) {
        respostasFutebolIngles = res.rows.item(0).cp;
        if (respostasFutebolIngles > 0){
            var queryCountRespostasCertasFutebolIngles = "select count(*) as cp from respostas where idDesporto = 2 and respostaCorreta == respostaUtilizador";
            
            db.executeSql(queryCountRespostasCertasFutebolIngles, [], function(result){
                var percent = (result.rows.item(0).cp/respostasFutebolIngles)*100;
                var percentagem = percent.toString().substring(0,4);
                var q1 = $('#mainDiv').html();
                q1 += "<div class='row'>";
                    q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                        q1 += "Soccer - "+ percentagem + " % de respostas certas (" + result.rows.item(0).cp + " / " + res.rows.item(0).cp + ")";
                    q1 += "</div>";
                q1 += "</div>";
                $('#mainDiv').html(q1);
            });    
        }        
    });

    var queryCountRespostasFutsal = "select count(*) as cp from respostas where idDesporto = 3";
    var respostasFutsal = -1;
    db.executeSql(queryCountRespostasFutsal, [], function (res) {
        respostasFutsal = res.rows.item(0).cp;
        if (respostasFutsal >0){
            var queryCountRespostasCertasFutsal = "select count(*) as cp from respostas where idDesporto = 2 and respostaCorreta == respostaUtilizador";
            
            db.executeSql(queryCountRespostasCertasFutsal, [], function(result){
                var percent = (result.rows.item(0).cp/respostasFutsal)*100;
                var percentagem = percent.toString().substring(0,4);
                var q1 = $('#mainDiv').html();
                q1 += "<div class='row'>";
                    q1 += "<div class='large-12 medium-6 medium-centered small-12 columns' style='background-color: transparent; border-left: solid 1px #666666;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);'>";
                        q1 += "Futsal - "+ percentagem + " % de respostas certas (" + result.rows.item(0).cp + " / " + res.rows.item(0).cp + ")";
                    q1 += "</div>";
                q1 += "</div>";
                $('#mainDiv').html(q1);
            
            });
        }
    });

    $('#mainDiv').html(data);
    $('#mainDiv').show();
    SpinnerDialog.hide();
}