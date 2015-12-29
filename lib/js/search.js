var dbb;

function VerPergunta(idPergunta){
    var tabela = $('#tabelaParaResponder').val();
    mostrarPerguntaParaResponder(-1, tabela, idPergunta);
}

function pesquisarPerguntas(){
    SpinnerDialog.show();    
    var txt = $('#txtPesquisar').val();
    var table = $('#tabela').val();

    mostrarFormularioPesquisa(table, txt);
    
    var tabela = "";
    if (txt == ""){
        SpinnerDialog.hide();    
        alert('Pesquisa inválida');
        return;
    }

    switch(table){
        case "1": tabela = 'perguntas'; break;
        case "2": tabela = 'perguntasIngles'; break;
        case "3": tabela = 'perguntasFutsal'; break;
    }

    var query = "select * from "+tabela+" where texto like '%"+txt+"%' or resposta1 like '%"+txt+"%' or resposta2 like '%"+txt+"%' or resposta3 like '%"+txt+"%' or resposta4 like '%"+txt+"%'";
    
    dbb.executeSql(query, [], function(res){
        var data = $('#mainDiv').html();        
        var conta = 0;
        if (res != null && res.rows != null){                
            data += "<input type='hidden' id='tabelaParaResponder' value='"+tabela+"'/>"
            for (var i = 0 ; i< res.rows.length; i++){

                if (conta %2 == 0)
                    data += "<div class='row'>";
                else
                    data += "<div class='row gradientFV'>";

                    data += "<div class='small-12 medium-11 medium-centered columns'>";
                        data += "<label><a href='#' onclick='VerPergunta("+res.rows.item(i).id+")'>";
                        data += "<font color='black'>";
                        data += res.rows.item(i).id + " - " + res.rows.item(i).texto;
                        data += "</font>";
                        data += "</a></label>";
                    data += "</div>";
                data += "</div>";

                conta++;
            }
            $('#mainDiv').html(data);
        }
        if (conta == 0){
             data += "<div class='row gradientFV'>";
                data += "<div class='small-8 medium-16 medium-centered columns'>";
                    data += "<center><font color='black'>";
                    data += "A sua pesquisa não devolveu resultados";
                    data += "</font></center>";
                data += "</div>";
            data += "</div>";
            $('#mainDiv').html(data);
        }
    });

    setTimeout(function(){
        SpinnerDialog.hide();
    },3000);
}


function mostrarFormularioPesquisa(tabela, txt){
    var data = "<div class='row'>";
            data += "<div class='small-12 medium-11 medium-centered columns'>";
                data += "<label>pesquisar</label><hr/>";
            data += "</div>";
             data += "</div>";
     data += "<div class='row'>";
        
            data += "<div class='medium-12 large-12 small-12 columns'>";
                data += "<select id='tabela'>";
                if (tabela != undefined){
                    switch(tabela){
                        case '1': 
                            data += "<option value='1' selected>futebol</option>";
                            data += "<option value='2'>soccer</option>"
                            data += "<option value='3'>futsal</option>";
                        break;
                        case '2': 
                            data += "<option value='1' >futebol</option>";
                            data += "<option value='2' selected>soccer</option>";
                            data += "<option value='3'>futsal</option>";
                        break;
                        case '3': 
                            data += "<option value='1' >futebol</option>";
                            data += "<option value='2'>soccer</option>";
                            data += "<option value='3' selected>futsal</option>";
                        break;
                    }
                }else{
                    data += "<option value='1'>futebol</option>";
                    data += "<option value='2'>soccer</option>";
                    data += "<option value='3'>futsal</option>";
                }
                    
                data += "</select>";
            data += "</div>";
            
        
    data += "<div class='medium-5 medium-offset-1 large-5 large-offset-1 small-10 small-centered columns'>";
        if (txt != undefined)
            data += "<input type='text' id='txtPesquisar' placeholder='texto a pesquisar' value='"+txt+"'/>";
        else
            data += "<input type='text' id='txtPesquisar' placeholder='texto a pesquisar' value=''/>";
    data += "</div>";
    data += "<div class='medium-6 large-6 small-6 columns'>";
            data += "<center><input type='button' id='btPesquisarPerguntas' value='pesquisar' class='hollow button'/></center>";
        data += "</div>";
    data += "</div>";

    data += "<script>$('#btPesquisarPerguntas').click(function(){"; 
            data += "pesquisarPerguntas()";
    data += "});</script>";

    $('#mainDiv').show();
    $('#mainDiv').html(data);
}

$('#pesquisar').click(function(){
   dbb = db;
   var query = "select count(*) as cp from perguntas";
   db.executeSql(query,[],function(res){
        if (res.rows.item(0).cp === 0){ 

            query = "select count(*) as cp from perguntasIngles";
            db.executeSql(query,[],function(res2){
                if (res2.rows.item(0).cp === 0){ 

                    query = "select count(*) as cp from perguntasIngles";
                    db.executeSql(query,[],function(res3){
                        if (res3.rows.item(0).cp === 0){ 
                            alert('Atualize a Base de Dados');
                        }else{
                            mostrarFormularioPesquisa(undefined, undefined);        
                        }
                    });

                }else{
                    mostrarFormularioPesquisa(undefined, undefined);        
                }
            });
            
        }else{            
            mostrarFormularioPesquisa(undefined, undefined);
        }
   });
   
});