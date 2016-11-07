//Path aponta para o banco 'amorim_test' 
//muito cuidado ao alterar este script
var path = "http://plataformaamorim.org/WebServicePlataformaAmorimTeste/";

//var pathCache = "http://177.55.99.90/plataformaAmorimGet/path/";

var pathCache = "http://172.16.31.24:8888/plataformaAmorimGet/path/";

/*Function base para listagem de registros*/
function getData(Tabela, ID){
	
	var ValorRetorno;
	if(ID == null){
		if(Tabela === "Roteiro" || Tabela === "Calendario" || Tabela === "Grupo" || Tabela === "Usuario" || Tabela === "Objetivo" || Tabela === "Chamada" || Tabela === "Mensagens" || Tabela === "PlanejamentoRoteiro"){				
			$.ajax({
				url: pathCache+Tabela,			
				type: "GET",
				async:false,
				crossDomain: true,				
				dataType:'jsonp'          
			}).then(function(data) {
				console.log(data);
				ValorRetorno = data;
			});
		}else{
			$.ajax({
				type: "GET",
				async:false,
				crossDomain: true,
				url: path+Tabela+"/"+(ID == null ? "":ID)            
			}).then(function(data) {
				console.log(data);
				ValorRetorno = data;			
			});
		}
		return ValorRetorno;
	}else{
		$.ajax({
			type: "GET",
			async:false,
			crossDomain: true,
			url: path+Tabela+"/"+(ID == null ? "":ID)            
		}).then(function(data) {
			ValorRetorno = data;			
		});			
		return ValorRetorno;
	}   
}

/*Function base para criar registro*/
function setCreateData(Tabela,Valores){	
	var retorno;
	$.ajax({
		url: path+Tabela,
		type: "POST",
		async:false,
		crossDomain: true,
		data: "action=create&"+Valores,
		success: function(d) {
			retorno = d;
		},error: function() {
			retorno = "erro";
		}
	});
	return retorno;
}

/*Function base para editar registro*/
function setUpdateData(Tabela,Valores,ID){
	//console.log("action=update&"+Valores+"&id="+ID);
	var retorno;
	$.ajax({
		url: path+Tabela,
		type: "POST",
		async:false,
		crossDomain: true,
		data: "action=update&"+Valores+"&id="+ID,
		success: function(d) {
			retorno = d;
		},error: function() {
			retorno = "erro";
		}
	});
	return retorno;
}

/*Function base para deletar registro*/
function deleteData(Tabela,ID){
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+Tabela+"/delete/"+ID
	});	
}

/*Function base para fazer upload de arquivo*/
function upload(Tabela,ID,FormData){
	var retorno;
	$.ajax({
		url: path+Tabela+ID,
		type: "POST",
		mimeType:"multipart/form-data",
		contentType: false,
		cache: false,
		processData:false,
		data: FormData,
		success: function(d) {
			$(".blackPainel").css("display","none");
			mensagem("Arquivo salvo com sucesso!","OK","bt_ok","sucesso");
		}
	});
}


function verificaTutor(ID){
    var ValorRetorno;w
    $.ajax({
        type: "GET",
        async:false,
        crossDomain: true,
        url: path+"relatorio/existAlunoVariavelGrupo/"+ID
	}).then(function(data) {
		ValorRetorno = data;
	});
    return ValorRetorno;
}