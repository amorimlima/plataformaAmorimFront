// JavaScript Document
var usuario = localStorage.getItem("usuarioTipo");
var usuarioId = localStorage.getItem("usuarioId");
var confTutor;
var dadosUser;

var dadosUsuario = JSON.parse(localStorage.getItem("objetoUsuario"));

if(usuario == "Aluno"){	
	if(localStorage.getItem("alunoVariavel")){
		dadosUser = JSON.parse(localStorage.getItem("alunoVariavel"));
	}else{
		$.ajax({
			url: path+"AlunoVariavel/aluno/"+dadosUsuario.aluno.idAluno,
			type: "GET",
			async:false,
			crossDomain: true,
			success: function(d) {
				localStorage.setItem("alunoVariavel", JSON.stringify(d));
				dadosUser = d;
			}		
		});
	}
}
	
if((localStorage.getItem("usuarioTipo") == "semTipo" || localStorage.getItem("usuarioTipo") == undefined) && 
	(localStorage.getItem("usuarioId") == "semId" || localStorage.getItem("usuarioId") == undefined) )
{
	alert("Deve-se logar antes");
	localStorage.setItem("usuarioTipo","semTipo");
	localStorage.setItem("usuarioId","semId");
	window.location = 'index.html';
}

$(document).ready(function(){
	var menu = "";	
	localStorage.setItem("user",dadosUsuario.login);
			
	if ((usuario == 'Professor')||(usuario == 'Coordenacao')){	
		
		if (verificaTutor(dadosUsuario.professor.idprofessorFuncionario) == 1) {
			confTutor = true;
		}else {
			
			confTutor = false;
		}			
	}	
				
	switch (usuario){
		case "Aluno":	
			var alunoId = localStorage.setItem("alunoId",dadosUsuario.aluno.idAluno);			
			var aluno = abreviaNome(dadosUsuario.aluno.nome)+" | "+dadosUser.anoEstudo.ano+"º ano";
			
			menu = '<div class="Content_lateral_Menu_Opcao">'+
						'<a href="planoDeEstudo.html" class="plano">Plano de estudo</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="recursosAprendizagem.html" class="recurso"><span id="menu_recurso">Recursos de aprendizagem</span></a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="roteirosPlanejamento.html" class="roteiros">Roteiros</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="forum.html" class="forum">Fórum</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="mensagens.html" class="mensagens">Mensagens</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao" id="menuCalendario">'+
						'<a href="pageCalendario.html" class="calendario">Calendário</a>'+
					'</div>';

			$("#Content_lateral_Menu").html(menu);
			$( "#Cabecalho_Perfil_Area_Foto" ).html("<img id='_foto' src='"+dadosUsuario.aluno.fotoAluno+"'/>");
			$( "#Cabecalho_Perfil_Area_Descricao" ).html(aluno);
			$("#home").attr('href', 'areaAluno.html');
			$("#area_acesso").html("Área do Aluno");
			//Inclui o calendário nas páginas HTML
											
			if((typeof dadosUser != 'undefined') && (dadosUser.grupo != null))
			{			
				if(dadosUser.grupo.lider != null){
					if(dadosUser.grupo.lider.idAluno == dadosUsuario.aluno.idAluno)
					{
						$("#rodape_calendario").css("display","block");
						$("#rodape_calendario p").show();
						$( ".boxCalendario" ).load( "presencaAluno.html" );	
					}	
				}						
			}
		break;
		case "Professor":
			menu = '<div class="Content_lateral_Menu_Opcao">'+
				   '<a href="grupoTutoria.html" class="tutoria">Tutoria</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="recursosAprendizagem.html" class="recurso"><span id="menu_recurso">Recursos de aprendizagem</span></a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="roteirosProfessor.html" class="roteiros">Roteiros</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="forum.html" class="forum">Fórum</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="mensagens.html" class="mensagens">Mensagens</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao" id="menuCalendario">'+
					'<a href="pageCalendario.html" class="calendario">Calendário</a>'+
				'</div>';
					
			$("#Content_lateral_Menu").html(menu);
			$("#Cabecalho_Perfil_Area_Foto" ).html("<img id='_foto' src='"+dadosUsuario.professor.fotoProfessorFuncionario+"' />");
			$("#Cabecalho_Perfil_Area_Descricao").html(abreviaNome(dadosUsuario.professor.nome)); 
			$("#home").attr('href', 'areaProfessor.html');	
			$("#area_acesso").html("Área do Professor");
			$(".total").addClass("semTop");
				
			//Inclui o calendário nas páginas HTML			
			if(confTutor==true){
				$("#rodape_calendario").css("display","block");
				$("#rodape_calendario p").show();
				$( ".boxCalendarioProfessor" ).load( "presencaProfessor.html" );
			}					
			localStorage.setItem("professorId",dadosUsuario.professor.idprofessorFuncionario);
			
		break;
		case "Coordenacao":			
			menu = '<div class="Content_lateral_Menu_Opcao">'+
					'<a href="tutorias.html" class="tutores">Tutores</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="recursosAprendizagem.html" class="recurso"><span id="menu_recurso">Recursos de aprendizagem</span></a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="roteiros.html" class="roteiros">Roteiros</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="grupo.html" class="grupos">Grupos</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao">'+
					'<a href="mensagens.html" class="mensagens">Mensagens</a>'+
				'</div>'+
				'<div class="Content_lateral_Menu_Opcao" id="menuCalendario">'+
					'<a href="pageCalendario.html" class="calendario">Calendário</a>'+
				'</div>';
									
			$( "#Content_lateral_Menu" ).html(menu);
			$( "#Cabecalho_Perfil_Area_Foto" ).html("<img id='_foto' src='"+dadosUsuario.professor.fotoProfessorFuncionario+"' />");
			$( "#Cabecalho_Perfil_Area_Descricao" ).html(abreviaNome(dadosUsuario.professor.nome));			
			$("#home").attr('href', 'areaCoordenacao.html');	
			$("#bt_Inserir").show();
			$("#area_acesso").html("Área da Coordenação");
			$("#cad_observacoes").remove();
			$("#box_geral_observacao").css("height","308px");
		break;
		
		case "Secretaria":
			menu = '<div class="Content_lateral_Menu_Opcao">'+
					   '<a href="cadastros.html" class="cadastro">Cadastro</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="agenda.html" class="agenda">Agenda</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="presenca.html" class="presenca">Presença</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao" style="pointer-events: none;cursor: default;">'+
						'<a href="carteirinhas.html" class="carteirinhas">Carterinhas</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao">'+
						'<a href="mensagens.html" class="mensagens">Mensagens</a>'+
					'</div>'+
					'<div class="Content_lateral_Menu_Opcao" id="menuCalendario">'+
						'<a href="pageCalendario.html" class="calendario">Calendário</a>'+
					'</div>';
					
			$( "#Content_lateral_Menu" ).html(menu);
			$( "#Cabecalho_Perfil_Area_Foto" ).html("<img id='_foto' src='"+dadosUsuario.professor.fotoProfessorFuncionario+"' />");
			$( "#Cabecalho_Perfil_Area_Descricao" ).html(abreviaNome(dadosUsuario.professor.nome));			
			$("#home").attr('href', 'cadastros.html');
			$("#area_acesso").html("Área da Secretaria");
								
			if(usuarioId == 1223)
			{
				$("#rodape_calendario").html("<p id='mudarSenha'><a href='alterarSenhaAluno.html'  style='color: #FFF;text-decoration: none;font-size: 16px;'>Alterar Senha</a></p>").css("display","block");
				$("#rodape_calendario p").show();
			}
						
		break;
	}
	$("#logout").click(function(){
		localStorage.clear();
		window.location = 'index.html';
	});

});

/*Function que abrevia nome do usuário*/
function abreviaNome(nome){
	nome = nome.split(" ");
	var nomeFinal = new Array();
	var nomeAbreviado = "";
	nome = nome.filter(function(item, index, array){
		if(item != "de" && item != "De"){
			return item;
		}		
	});	
	for(var i=0;i<nome.length;i++){
		if(i<1){
			nomeFinal[i] = nome[i];
		}else if(i==nome.length-1){
			nomeFinal[i] = nome[i];
		}else{
			nomeFinal[i] = nome[i].substring(0, 1)+"."; 
		}
		nomeAbreviado += nomeFinal[i]+" ";
	}	
	return nomeAbreviado;
}
