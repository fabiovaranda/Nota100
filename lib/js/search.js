var dbb;

function VerPergunta(idPergunta, tabela){
    alert(idPergunta + " " + tabela);
    //mostrarPerguntaParaResponder(-1, tabela, idPergunta);
}

function pesquisarPerguntas(){
    SpinnerDialog.show();    
    var txt = $('#txtPesquisar').val();
    var table = $('#tabela').val();
    mostrarFormularioPesquisa(table, txt);
    var tabela = "";
    
    switch(table){
        case "1": tabela = 'perguntas'; break;
        case "2": tabela = 'perguntasIngles'; break;
        case "3": tabela = 'perguntasFutsal'; break;
    }

    var query = "select * from "+tabela+" where texto like '%"+txt+"%' or resposta1 like '%"+txt+"%' or resposta2 like '%"+txt+"%' or resposta3 like '%"+txt+"%' or resposta4 like '%"+txt+"%'";
    
    dbb.executeSql(query, [], function(res){
        var data = $('#mainDiv').html();        
        if (res != null && res.rows != null){
            var conta = 0;
            for (var i = 0 ; i< res.rows.length; i++){

                if (conta %2 == 0)
                    data += "<div class='row'>";
                else
                    data += "<div class='row gradientFV'>";

                    data += "<div class='large-12 columns'>";
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
            setTimeout(function(){ 
                SpinnerDialog.hide();        
            }, 2000);
        }
    },function(err){
        alert('search executeSql error: ' + err.message);
    });
}


function mostrarFormularioPesquisa(tabela, txt){
    var data = "<div class='row'>";
            data += "<div class='medium-12 small-12 columns'>";
                data += "<label>Pesquisar perguntas</label><hr/>";
            data += "</div>";
             data += "</div>";
     data += "<div class='row'>";
            data += "<div class='medium-3 small-12 columns'>";
                data += "<select id='tabela'>";
                if (tabela != undefined){
                    switch(tabela){
                        case '1': 
                            data += "<option value='1' selected>Futebol</option>";
                            data += "<option value='2'>Soccer</option>";
                            data += "<option value='3'>Futsal</option>";
                        break;
                        case '2': 
                            data += "<option value='1' >Futebol</option>";
                            data += "<option value='2' selected>Soccer</option>";
                            data += "<option value='3'>Futsal</option>";
                        break;
                        case '3': 
                            data += "<option value='1' >Futebol</option>";
                            data += "<option value='2'>Soccer</option>";
                            data += "<option value='3' selected>Futsal</option>";
                        break;
                    }
                }else{
                    data += "<option value='1'>Futebol</option>";
                    data += "<option value='2'>Soccer</option>";
                    data += "<option value='3'>Futsal</option>";
                }
                    
                data += "</select>";
            data += "</div>";
            data += "<div class='medium-7 small-12 columns'>";
                if (txt != undefined)
                    data += "<input type='text' id='txtPesquisar' placeholder='texto a pesquisar' value='"+txt+"'/>";
                else
                    data += "<input type='text' id='txtPesquisar' placeholder='texto a pesquisar' value='jogo'/>";
            data += "</div>";
        data += "<div class='medium-2 small-12 columns'>";
            data += "<center><input type='button' id='btPesquisarPerguntas' value='Pesquisar' class='tiny round button'/></center>";
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
   mostrarFormularioPesquisa(undefined, undefined);
});