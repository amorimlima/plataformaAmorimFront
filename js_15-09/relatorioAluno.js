//Murano Design

//------------------------------------------------------------------------------------------------------------------------

//Get Usuario Efetivado

//Carrega os dados da URL GET
var usuarioID = usuarioId;
var alunoID = base64_decode(GetURLParameter('ID'));

var UsuarioAtivo = 2;
var alunoIdCoded = GetURLParameter('ID');

//------------------------------------------------------------------------------------------------------------------------

var dataPlanoEstudoAtual;
$.ajax({
	url: path + "PlanoEstudo/aluno/" +  alunoID,
	async: false,
	crossDomain: true,
	type: "GET",
	success: function (d) {
		dataPlanoEstudoAtual = d;
	}
});

var dataUsuario;
$.ajax({
	url: path + "Usuario/" + usuarioID,
	async: false,
	crossDomain: true,
	type: "GET",
	success: function (d) {
		dataUsuario = d;
	}
});

//Carrega a funçao de Load do JQuery

/*Gráfico area_aluno*/



$(document).ready(function(){
	
	if(!base64_decode(GetURLParameter('TU'))){
		var data = new Date();										
		var ano = data.getFullYear();	
		$.ajax({
			url: path + "Tutoria/Professor/"+localStorage.getItem("professorId")+"/"+ano,
			async: false,
			crossDomain: true,
			type: "GET",
			success: function (d) {
				$('#tutoria').val(d[0].idtutoria);
			}
		});	
	}else{
		$('#tutoria').val(base64_decode(GetURLParameter('TU')));
	}

	if (confTutor == true){
		$('#observacao_box').css('display','block');
	}

	//Cria as variaveis q serão utilizadas
	//var objetivos;
	var alunoVarSelecionado = -1;
	var planejamentosAluno = [];
	var roteiros = [];
	var roteirosFiltrados = [];
	var htmlContent = '';
	var arrayAux = [];
	var contadorRoteiros = 0;
	var contadorObjetivos = 0;
	var contTotalObj = 0;
	var aux;
	var aux2;
	var aluno = getAluno(alunoID);

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
		$('.link_plano a').attr("href","mPlanoDeEstudo.html?ID="+alunoIdCoded);
	else
		$('.link_plano a').attr("href","planoDeEstudo.html?ID="+alunoIdCoded);	
	
	//Pego todos os alunos variaveis para colocar no grupo!!

	//Pego os dados do aluno váriavel pelo seu ID
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"AlunoVariavel/aluno/"+alunoID
	}).then(function(data) {
		alunoVarSelecionado = data;
	});
		
	//Busca os roteiros atribuidos do aluno
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"Roteiro/RoteiroAluno/"+alunoID+"/"+alunoVarSelecionado.anoLetivo.ano
	}).then(function(data) {
		roteiroExtra = data;
	});
	
	//Busca os roteiros do ano
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"Roteiro/RoteiroAno/"+alunoVarSelecionado.anoEstudo.idanoEstudo
	}).then(function(data) {
		roteiros = data;
	});

	var objetivosFiltrados;
	$.ajax({
		url: path + "Objetivo/ObjetivoAluno/" + alunoVarSelecionado.idalunoVariavel,
		async: false,
		crossDomain: true,
		type: "GET",
		success: function (d) {
			objetivosFiltrados = d;
		}
	});

	console.log(objetivosFiltrados);

	//Executa 3 FORs com os resultados dos serviços anteriores e monta apenas um vetor
	//Variavel IdsRoteirosPendentes serve como um verificador para não permitir que duplique os roteiros.
	for (var i = 0; i < roteiros.length; i++){
		roteirosFiltrados[roteirosFiltrados.length] = [];
		roteirosFiltrados[roteirosFiltrados.length-1][0] = roteiros[i];
	}
	for (var i = 0; i < roteiroExtra.length; i++){
			roteirosFiltrados[roteirosFiltrados.length] = [];
			$.ajax({
				type: "GET",
				crossDomain: true,
				async: false,
				url: path+"Roteiro/"+roteiroExtra[i].roteiro.idroteiro
			}).then(function(data) {
				roteirosFiltrados[roteirosFiltrados.length-1][0] = data;
			});
	}
			
						
	//Seleciona os planejamentos do aluno
	planejamentosAluno = getPlanejamentoRoteiro();

	//Coloca os objetivos em roteirosFiltrados, dessa forma 
	//roteirosFiltrados é uma matrix e cada posição do array corresponde a um roteiro através
	//de outro array onde a primeira posição tem as informações do roteiro (objeto roteiro puxado do banco)
	//as proximas posições contem os objetivos, cada um em seu numero correto na pos 0, e o status é armazenado 
	//na pos 1
	//ex
		//objetivosFiltrados[0][0] = <obj roteiro X>
		//objetivosFiltrados[0][1][0] = <obj objetivo 1 do roteiro X>
		//objetivosFiltrados[0][1][1] = <status do primeiro objetivo do roteiro X>

	//faz um for no roteiro colocando os objetivos conforme explificado acima
	for (var j = 0; j < roteirosFiltrados.length; j++){	
		objetivo = '';
		//Busca os objetivos de cada roteiro
		$.ajax({
			type: "GET",
			crossDomain: true,
			async: false,
			url: path+"Objetivo/ObjetivoRoteiro/"+roteirosFiltrados[j][0].idroteiro
		}).then(function(data) {
			if (data.length>0){
				for (var i = 0; i<data.length;i++){
					arrayAux[0]=data[i];
					arrayAux[1]=0;
					roteirosFiltrados[j][parseInt(data[i].numero)]=data[i];
					roteirosFiltrados[j][parseInt(data[i].numero)]=arrayAux.slice();
				}
			}
		});
	}
	//Daqui para baixo, nada foi alterado!!
	
	for(var i = 0; i < planejamentosAluno.length; i++){
		for(var j = 0; j < roteirosFiltrados.length; j++){				
			if(planejamentosAluno[i].objetivo.roteiro.nome == roteirosFiltrados[j][0].nome){
				roteirosFiltrados[j][planejamentosAluno[i].objetivo.numero][1]=planejamentosAluno[i].status;
				roteirosFiltrados[j][planejamentosAluno[i].objetivo.numero][2]=planejamentosAluno[i].idplanejamentoRoteiro;
				roteirosFiltrados[j][planejamentosAluno[i].objetivo.numero][3]=planejamentosAluno[i].objetivo.idobjetivo;
				roteirosFiltrados[j][planejamentosAluno[i].objetivo.numero][4]=planejamentosAluno[i].planoEstudo.idplanoEstudo;
			}
		}
	}

   var numPort = 0;	
   for(var i = 0; i < roteirosFiltrados.length; i++){
			   
	   htmlContent += '<div class="linha_roteiro" id="' + roteirosFiltrados[i][0].idroteiro +'"> <p class="titulo"> ' + roteirosFiltrados[i][0].nome + '</p> <table class="rot_aluno"><tr>';
			 
			aux = 0;
			aux2 = 0;
			var cont=1;
			

			for(var j = 1; j < roteirosFiltrados[i].length; j++){
				/*if(cont==23){
					htmlContent += "</tr><tr>";
					cont=1;
				}*/
				
				cont++;
				
				if(roteirosFiltrados[i][j] != null){
					aux2++;
					contTotalObj++;
					htmlContent += '<td id="'+roteirosFiltrados[i][j][2]+'" objid="'+roteirosFiltrados[i][j][3]+'" class= ';
					if(roteirosFiltrados[i][j][1] == 0  || 
						(roteirosFiltrados[i][j][1] == 1 && roteirosFiltrados[i][j][4] != dataPlanoEstudoAtual[0].idplanoEstudo)){
						htmlContent += '"cinza">';
					} else if ( roteirosFiltrados[i][j][1] == 1 &&
					roteirosFiltrados[i][j][4] == dataPlanoEstudoAtual[0].idplanoEstudo){
						htmlContent += '"laranja">';

					} else if ( roteirosFiltrados[i][j][1] == 2){
						htmlContent += '"verde">';
						contadorObjetivos++;

					} else if ( roteirosFiltrados[i][j][1] == 3){
						htmlContent += '"verde_tk">';
						aux++;
						contadorObjetivos++;

					}
						
				}
				if(roteirosFiltrados[i][j] != null){

					htmlContent +=  roteirosFiltrados[i][j][0].numero + '</td>';
				}
				
			}

			if (aux == aux2){
				contadorRoteiros++;


			}
			
			htmlContent += '</tr> </table> </div>'
		   }
			graficoBarra(alunoID,planejamentosAluno);
			//preenche estatisticas de roteiros e objetivos feitos
	
			$('#res_roteiros').empty();
			$('#res_roteiros').append('<span id="res_vermelho">'+contadorRoteiros+'</span> roteiros de '+ roteirosFiltrados.length+'</p>');		
			
			var totGraficoR = ((contadorRoteiros/roteirosFiltrados.length)*100)
			
			var doughnutData = [
				{
					value: totGraficoR,
					color:"#EB5B61",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: (100-totGraficoR),
					color: "#C5C4B1",
					highlight: "#5AD3D1",
					label: "Green"
				}
			];
			
			var ctx = document.getElementById("chart1").getContext("2d");
			window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, 
			{responsive : true, showTooltips: false, animation: true});
			
			
			$('#res_objetivos').empty();
			$('#res_objetivos').append('<span id="res_azul">'+contadorObjetivos+'</span> objetivos de '+ objetivosFiltrados +'</p>');
		
			var totGrafico = ((contadorObjetivos/contTotalObj)*100)
			
			var doughnutData2 = [
				{
					value: totGrafico,
					color:"#4861AA",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: (100-totGrafico),
					color: "#C5C4B1",
					highlight: "#5AD3D1",
					label: "Green"
				}
			];
			var ctx = document.getElementById("chart2").getContext("2d");
			window.myDoughnut = new Chart(ctx).Doughnut(doughnutData2, 
			{responsive : true, showTooltips: false, animation: true});
			
			/*Grafico de faltas*/
			var faltaLocal = presencaAluno(alunoID);
			var totGraficoF = ((faltaLocal/180)*100)
			var doughnutData3 = [
				{
					value: totGraficoF,
					color:"#FF7800",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: (100-totGraficoF),
					color: "#C5C4B1",
					highlight: "#5AD3D1",
					label: "Green"
				}
			];
			
			var ctx = document.getElementById("chart3").getContext("2d");
			window.myDoughnut = new Chart(ctx).Doughnut(doughnutData3, 
			{responsive : true, showTooltips: false, animation: true});

			$('#res_laranja').html(faltaLocal);
			//dias letivos do ano
			var diasUteis = diasLetivos();
			
			$("#letivos").html(diasUteis);
	
			//preenche a lista de roteiros
	
			$('.box_aluno_left').empty(); 
			$('.box_aluno_left').append(htmlContent);

			for(var i = 0; i < roteirosFiltrados.length; i++){
				
				var totalObjetivos;

				$.ajax({
					url: path + "Objetivo/ObjetivoRoteiroTotal/" + roteirosFiltrados[i][0].idroteiro,
					async: false,
					crossDomain: true,
					type: "GET",
					success: function(d) {
						totalObjetivos = d;
					}
				});
		   

				if($("#" + roteirosFiltrados[i][0].idroteiro + " .verde_tk").length == totalObjetivos)
				{
					$("#" + roteirosFiltrados[i][0].idroteiro + " .verde_tk").remove();
					$("#" + roteirosFiltrados[i][0].idroteiro + " tr").remove();
					$("#" + roteirosFiltrados[i][0].idroteiro + " tbody").append("<tr></tr>");

					var portfolio;
					var fichaFinalizacao = -1;
					var existeFicha;
					$.ajax({
						url: path + "FichaFinalizacao/" + roteirosFiltrados[i][0].idroteiro,
						async: false,
						crossDomain: true,
						type: "GET",
						success: function(d){
							existeFicha = d;
						}
					});

					if (existeFicha.length > 0)
					{
						$.ajax({
							url: path + "ProducaoAluno/Filtos/" + alunoID + "/4/" + roteirosFiltrados[i][0].idroteiro,
							async: false,
							crossDomain: true,
							type: "GET",
							success: function(d){
								fichaFinalizacao = (d.length > 0) ? d[0] : "";
							}
						});

						if (fichaFinalizacao != "")
						{
							if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
								$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port verdePort'><a href='mGaleriaAluno.html?ID="+ base64_encode((""+alunoID))+"'> Ficha de Finalização </a></td>");
							else
								$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port verdePort'><a href='galeriaAluno.html?ID="+ base64_encode((""+alunoID))+"'> Ficha de Finalização </a></td>");
						}
						else
							$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port cinza'>Ficha de Finalização</td>");

					}

					$.ajax({
						url: path + "ProducaoAluno/Filtos/" + alunoID + "/5/" + roteirosFiltrados[i][0].idroteiro,
						async: false,
						crossDomain: true,
						type: "GET",
						success: function(d){
							portfolio = (d.length > 0) ? d[0] : "";
						}
					});

					if (portfolio != "")
					{
						if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
							$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port verdePort'><a href='mGaleriaAluno.html?ID="+ base64_encode((""+alunoID))+"'> Portfolio </a></td>");
						else
							$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port verdePort'><a href='galeriaAluno.html?ID="+ base64_encode((""+alunoID))+"'> Portfolio </a></td>");
					}
					else
						$("#" + roteirosFiltrados[i][0].idroteiro + " tbody tr").append("<td class='link_port cinza'>Portfolio</td>");				
				}
			}
		
			$(".FotoAluno").html("<img src='"+aluno.fotoAluno+"' width='110' height='110'/>");
	
			//preenche cabecalho aluno
	
			$('.nome_aluno').empty();
			$('.nome_aluno').append(aluno.nome);
	
			$('.ano').empty();
			$('.ano').append( alunoVarSelecionado.anoEstudo.ano + '° ano' );
	
			$('#tutor_nome').empty();
			if(alunoVarSelecionado.grupo.tutoria != null)
			{
				
				$('#tutor_nome').append(alunoVarSelecionado.grupo.tutoria.tutor.nome);
	
			} else {
				$('#tutor_nome').append("Não Atribuido");
			}
	
	
			aux = '';

			var grupoAluno;

			$.ajax({
				url: path + "AlunoVariavel/grupo/" + alunoVarSelecionado.grupo.idgrupo,
				async: false,
				crossDomain: true,
				type: "GET",
				success: function (d) {
					grupoAluno = d;
				}
			});

			for(var i = 0; i<grupoAluno.length;i++){
				aux += '<p>'+grupoAluno[i].aluno.nome+'</p>';       		     	
			}
			
			$('.alunos_grupo').empty();
			$('.alunos_grupo').append(aux);
			
		
		var perfil = getUrlVars();
		
		if(perfil['id']=="coordenacao"){
			$("#Cabecalho_Perfil_Area_Descricao").html("João Antônio");
			$("#coord").html("Área da Coordenação");
			$(".mudar").removeAttr("id");
			$(".mudar").attr("id","Cabecalho_Perfil_Area_Foto_cood");
		}

	
	listaObservacao();
		
	//Passa o id do aluno para o cadastro de observação
	$('#aluno').val(alunoID);
	//Passa o id do aluno para o cadastro de observação
	//Passa a data para o cadastro de observação
	var data = new Date();
	var dia = (data.getDate().toString().length<2 ? "0"+data.getDate():data.getDate());
	var mes = data.getMonth()+1;
	var ano = data.getFullYear();	
	$('#data').val(ano+"-"+mes+"-"+dia);
	
	//Cadastro de observação
	$("#btnSalvar").click(function(){
		var obs = $("#observacao").val();		
		if(obs!=""){
			$.ajax({
				url: path+"RelatorioTutoria/",
				type: "POST",
				crossDomain: true,
				dataType: 'json',
				data: $("#obsRelatorio").serialize(),				
				success: function(d) {
					mensagem("Dados salvos com sucesso!","OK","bt_ok","sucesso");
					listaObservacao();
					$("#observacao").val("");
				}
			});
		}else{
			mensagem("Por favor, preencha o campo de relatório!","OK","bt_ok","erro");
		}
						
	});
	$('td.verde').click(function(){

		if (dataUsuario.professor != null && 
			dataUsuario.professor.idprofessorFuncionario == alunoVarSelecionado.grupo.tutoria.tutor.idprofessorFuncionario)
		{
			if($(this).hasClass("verde"))
  			{
  				$(this).removeClass( "verde" ).addClass( "verde_tk" );
  				$(this).css("color","rgba(255,255,255,0)");
  			}
	
	  			$.ajax({
				    url: path+"PlanejamentoRoteiro/",
				    type: "POST",
				    crossDomain: true,
				    dataType: 'json',
				    data: "id="+$(this).attr('id')+"&action=update&status=3&idAluno="+	alunoID+"&objetivo="+$(this).attr('objid'),
				    beforeSend: function() {
				    	loading("inicial");
				    },
				    error: function() {
				    	alert("Não modificado, verifique os campos.");
				    },
				    complete: function() {
				    	loading("final");
				    }
			   	});
		}
		  
  		/*Fim*/  		
  	});

  	$("#right_scroll").click(function(){
  		$("#horiz_container li").css('margin-left', parseInt($("#horiz_container li").css('margin-left')) - 10);
  	});
  	$("#left_scroll").click(function(){
  		$("#horiz_container li").css('margin-left', parseInt($("#horiz_container li").css('margin-left')) + 10);
  	});		
	
//Fim Jquery ready	
}); 
	
	
	

	
	
	
	
	
	
function btnFechar(){
	$('#caixaRelatorio').css("display","none");
}	
	
function listaObservacao(){
	//Lista as observações que o tutor fez sobre o aluno
	var resultado;
	var professorId = $('#tutoria').val();
	var HtmlContent_rt="";
	$.ajax({
		type: "GET",
		crossDomain: true,
		async:false,
		url: path+"RelatorioTutoria/RelatorioTutorAluno/"+professorId+"/"+alunoID,		
		success: function(data_rt){	
			console.log(data_rt);
			if(data_rt!=""){
				$("#box_geral_observacao").css('display','block');	
				$("#observacao_box").css('padding-bottom','25px');
				for(var p=data_rt.length-1; p>=0;p--)
				{												
					var dataBR = data_rt[p].data;
					var retorno = dataBR.split("-");
					dataBR = retorno[2]+"/"+retorno[1]+"/"+retorno[0];
	
					HtmlContent_rt+='<div class="box_obs">'
						+'<p class="titulo_obs">'
							+'<span class="nome">'+data_rt[p].tutoria.tutor.nome+'</span> | ' 
							+'<span class="cargo">'+retornaPerfil(data_rt[p].tutoria.tutor.idprofessorFuncionario)+'</span></span>'	
							+'<span class="right">'+dataBR+'</span>'	
						+'</p>'	
						+'<div class="vizu"><a href="#" onclick="mostrarAba(\''+data_rt[p].idrelatorioTutoria+'\')">Visualizar</a></div></div>';				
				}
				resultado = $("#observacoes").html(HtmlContent_rt);
			}
		}

	}); 

	return (resultado);	
}

function retornaPerfil(idProfessorFuncionario){
	var perfil;
	$.ajax({
		url: path+"Usuario/professor/"+idProfessorFuncionario,
		type: "GET",
		crossDomain: true,
		dataType: 'json',
		async:false,
		success: function(dataProf) {
			perfil = dataProf.perfil.perfil;
		}
	});
	
	return perfil; 	
}



function mostrarAba(id){		
	var dataRelatorio = getData("RelatorioTutoria", id);

	var dataUsuarioProfessor = getData("Usuario/professor",dataRelatorio.tutoria.tutor.idprofessorFuncionario);
	//Inverte a data para formato BR
	var dataBR = dataRelatorio.data;
	var retorno = dataBR.split("-");
	dataBR = retorno[2]+"/"+retorno[1]+"/"+retorno[0];
	//fim
	
	var cssBoxRT = "width: 600px;height: 400px;background-color: #F2F2EE;position: absolute;margin: 0px 20%;top: 18%;border: 2px solid #FFFFFF;padding: 15px;";
	var cssTitulo = "padding:0;margin:0;color:#878787;font-size:18px;";
	var cssNome = "margin-right:5px;font-size: 14px;";
	var cssCargo = "font-size:14px;";		
	var cssRight = "float:right;font-size:16px;margin-right:15px;";
	var cssTexto = "color:#878787;font-size:12px;margin-right: 10px;width: 100%;height: 240px;border:0;padding: 15px;";
	
	var HtmlContent="";
	var HtmlContent = 	'<div class="boxRT" style="'+cssBoxRT+'">'
								+'<p class="fechar">'
								+'<a href="#" id="btnCancel" onclick="btnFechar()">X</a>'
								+'</p>'
								+'<p id="subir_div" style="'+cssTitulo+'">'
									+'<span class="n_exibir" style="'+cssNome+'">'+dataRelatorio.tutoria.tutor.nome+'</span> <span class="n_exibir">|</span>' 
									+'<span class="n_exibir" style="'+cssCargo+'">'+dataUsuarioProfessor.perfil.perfil+'</span></span>'	
									+'<span style="'+cssRight+'">'+dataBR+'</span>'	
								+'</p>'
								+'<div class="scrollbar" id="ex3">'
								+'<textarea style="'+cssTexto+'" id="texto">'+/*dataRelatorio.relatorio+*/'</textarea>'
								+'</div>'
								+'<p class="btnRT">'								
								+'<a href="#" id="btnPrint" onclick="imprimir()"></a>'
								+'<a href="#" id="btnAtualizar" onclick="editarObservacao()">Salvar</a>'
								+'</p>'
						+'</div>'
						+'<input type="hidden" name="id" id="id" value="'+id+'" >';
	//console.log(plugin);
	$("#caixaRelatorio").html(HtmlContent).show();
	$("#texto").html(dataRelatorio.relatorio);

	if ($("#aluno").val() == undefined)
		$("#btnAtualizar").css("display", "none");
}

function editarObservacao () {
	$.ajax({
		url: path+"RelatorioTutoria/",
		type: "POST",
		crossDomain: true,
		dataType: 'json',
		data: "relatorio="+$("#texto").val()+"&aluno="+$("#aluno").val()+"&action=update&tutoria="+$("#tutoria").val()+"&data="+$("#data").val()+"&id="+$("#id").val(),				
		beforeSend: function() {
			loading("inicial");
		},
		success: function(d) {
			mensagem("Dados salvos com sucesso!","OK","bt_ok","sucesso");
		},
		complete: function() {
			loading("final");
		}
	});
}

function getPlanejamentoRoteiro(){
	var auxPR;
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"PlanejamentoRoteiro/aluno/" + alunoID
	}).then(function(data) {
		auxPR = data;
	});  
	
	return auxPR;
}

function getRoteiros(){
	var auxR;
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"Roteiro"
	}).then(function(data) {
		auxR = data;
	});	
	return auxR;
}

function getAluno(alunoID){
	var auxAL;
	$.ajax({
		type: "GET",
		crossDomain: true,
		async: false,
		url: path+"Alunos/"+alunoID	
	}).then(function(data) {
		auxAL = data;
	});  	
	return auxAL;
}

/*function getUltimoPE(ID){
	var max= 0;
	for(var a=0; a< dataPlanoEstudo.length; a++){
			max = (max < dataPlanoEstudo[a].idplanoEstudo ? dataPlanoEstudo[a].idplanoEstudo:max);
	}
	return max;
}*/
   
function graficoBarra(alunoID, planejamentosAluno){
	//esse código assume que todos os planejamentos desse aluno pertencem a algum plano desse aluno
	var htmlContentgrafico = "";

	$.ajax({
		url: path + "PlanoEstudo/alunoTotal/" + alunoID,
		async: false,
		crossDomain: true,
		type: "GET",
		success: function(dataPlanosEstudo){
			
			dataPlanosEstudo.sort(function (a, b) {
				if (a.dataInicio > b.dataInicio)
					return -1;
				else
					return 1;
			})

			for (var i = 0; i < dataPlanosEstudo.length; i++)
			{
				var countPlanejados = 0;
				var countFeitos = 0;


				$.ajax({
					url: path + "PlanejamentoRoteiro/RoteirosAtivos/" + dataPlanosEstudo[i].idplanoEstudo,
					async: false,
					crossDomain: true,
					type: "GET",
					success: function (dataPlanejamentos) {
						for (var j = 0; j < dataPlanejamentos.length; j++)
						{
							if (dataPlanejamentos[j].status == 1)
							{
								countPlanejados++;
							}

							else if (dataPlanejamentos[j].status == 2 || dataPlanejamentos[j].status == 3)
							{
								countPlanejados++;
								countFeitos++;
							}
						}
					}
				});

				var planejadosPorcento = (countPlanejados/20) * 100;
				var feitosPorcento = (countFeitos/20) * 100;

				if (i == 0 || dataPlanosEstudo[i-1].dataInicio.substring(5,7) != dataPlanosEstudo[i].dataInicio.substring(5,7))
					htmlContentgrafico += '<div class="divMes">'


				htmlContentgrafico +=   '<div class="barra">'+
											'<div class="col_barra">'+
												'<p class="laranja barra_proposto" style="height:'+planejadosPorcento+'%"></p>'+
												'<p class="verde barra_concluido" style="height:'+feitosPorcento+'%"></p>'+
											'</div>'+
											 '<p class="dia_plano">'+ dataPlanosEstudo[i].dataInicio.substring(8,10) + '</p>'+
										'</div>';

				if (i == dataPlanosEstudo.length -1 || dataPlanosEstudo[i].dataInicio.substring(5,7) != dataPlanosEstudo[i + 1].dataInicio.substring(5,7))
				{	
					htmlContentgrafico += '<center><div class="mesNome">' + retornaMesByNumero(parseInt(dataPlanosEstudo[i].dataInicio.substring(5,7))) + '</div></center>'
					htmlContentgrafico += '</div>'
				}

			}
		}
	});

	$('.box_mes').empty();
	$('.box_mes').append(htmlContentgrafico);
}

function visualizarDados(){
	//console.log(base64_decode(GetURLParameter('ID')));
	localStorage.setItem("alunoEdt",base64_decode(GetURLParameter('ID')));	
	$(location).attr('href','visualizarDados.html');
}

function getAnoLetivo(formato){
	var dataSalvaPortifolio = new Date();
	var anoAtual;
	
	if(formato == "idAnoLetivo"){		
		var dataAnoLetivo = getData("AnoLetivo",null);
		for(var i=0;i<dataAnoLetivo.length;i++){
			var anoLetivo = dataAnoLetivo[i].ano;
			anoLetivo = anoLetivo.split("-");		
			if(anoLetivo[0]==dataSalvaPortifolio.getUTCFullYear()){
				anoAtual = dataAnoLetivo[i].idanoLetivo;
			}
		}	
	}else if(formato == "anoAnoLetivo"){
		anoAtual = dataSalvaPortifolio.getUTCFullYear();
	}
	
	return anoAtual;
}