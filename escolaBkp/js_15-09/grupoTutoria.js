function getTutoria(a){var b=[];if(dataTutoria.length>0)for(var c=0;c<dataTutoria.length;c++)dataTutoria[c].tutor.idprofessorFuncionario==a&&(b[b.length]=dataTutoria[c].idtutoria);else b[0]="Este professor n\xe3o possui grupos!";return b}function getGrupo(a){for(var b=0;b<dataGrupo.length;b++)dataGrupo[b].tutoria.idtutoria==a&&(gruposProfessor[gruposProfessor.length]=dataGrupo[b])}function getAlunos(a){var b=[],c=[];if(a.constructor==Array)for(var d=0;d<a.length;d++)b=getData("AlunoVariavel/grupo",a[d].idgrupo),c=c.concat(b);return c}function initCoordena(){dataUsuario=getData("Usuario",professorID),dataTutoria=getData("Tutoria",null),dataGrupo=getData("Grupo",null),professorID=getProfessorByUsuario(usuarioId),dataProfessorFuncionario=getData("ProfessorFuncionario",professorID),dataAlunoVariavel=getData("AlunoVariavel",null),Tutor=base64_decode(GetURLParameter("ID")),dataProfessorFuncionario=getData("ProfessorFuncionario",Tutor),drawBoxProfessor(Tutor),dataTutoria=getData("Tutoria",null),dataGrupo=getData("Grupo",null),dataProfessorFuncionario=getData("ProfessorFuncionario",Tutor),tutoria=getTutoria(dataProfessorFuncionario.idprofessorFuncionario);for(var a=0;a<tutoria.length;a++)getGrupo(tutoria[a]);alunos=getAlunos(gruposProfessor),loadPaginaProfessor()}function initProfessor(){dataUsuario=getData("Usuario",professorID),dataTutoria=getData("Tutoria",null),dataGrupo=getData("Grupo",null),professorID=getProfessorByUsuario(usuarioId),dataProfessorFuncionario=getData("ProfessorFuncionario",professorID),dataAlunoVariavel=getData("AlunoVariavel",null),tutoria=getTutoria(dataProfessorFuncionario.idprofessorFuncionario);for(var a=0;a<tutoria.length;a++)getGrupo(tutoria[a]);alunos=getAlunos(gruposProfessor),loadPaginaProfessor()}function loadPaginaProfessor(){htmlContent="";var a;0==gruposProfessor.length&&$("#Grupos_box").append("Este professor n\xe3o \xe9 tutor de nenhum grupo");for(var b=0;b<gruposProfessor.length;b++){a=0,htmlContent='<div class="Grupo_Content"><div id="grupo1" style="height:150px;"><div id="grupoId"> Grupo'+gruposProfessor[b].nomeGrupo+": </div><ul>";for(var c=0;c<alunos.length;c++){var d;alunos[c].grupo.idgrupo==gruposProfessor[b].idgrupo&&(htmlContent+="<li> "+alunos[c].aluno.nome+" </li>",a++,d=alunos[c].grupo.idgrupo)}htmlContent+='</ul></div><div class="graficos"><div class="Grade_Aluno_Grafico_Content" id="grupo_'+d+'"><div class="Grade_Aluno_Grafico_Legenda_Lateral">Faltas<br />100<br />90<br />80<br />70<br />60<br />50<br />40<br />30<br />20<br />10<br />0</div>';for(var c=0;c<alunos.length;c++)if("Professor"==usuario&&(funcao="onclick='mudarLider("+alunos[c].grupo.idgrupo+","+alunos[c].aluno.idAluno+")'"),alunos[c].grupo.idgrupo==gruposProfessor[b].idgrupo){var e="";null!=alunos[c].grupo.lider&&alunos[c].aluno.idAluno==alunos[c].grupo.lider.idAluno&&(e="lider");var g,f=getAlunoVariavel(alunos[c].aluno.idAluno);$.ajax({type:"GET",async:!1,crossDomain:!0,url:path+"AtribuicaoRoteiroExtra/aluno/"+f.aluno.idAluno}).then(function(a){g=a});for(var i=(getNumeroPlanejamento(alunos[c].aluno.idAluno,1),0),j=0,k=0,l=0;l<dataObjetivo.length;l++)if("1"==dataObjetivo[l].ativo&&"1"==dataObjetivo[l].roteiro.ativo&&dataObjetivo[l].roteiro.anoEstudo.idanoEstudo==f.anoEstudo.idanoEstudo)i++;else for(var m=0;m<g.length;m++)"1"==dataObjetivo[l].ativo&&dataObjetivo[l].roteiro.idroteiro==g[m].idroteiro&&dataObjetivo[l].roteiro.anoEstudo.ano<f.anoEstudo.ano?j++:"1"==dataObjetivo[l].ativo&&dataObjetivo[l].roteiro.idroteiro==g[m].idroteiro&&dataObjetivo[l].roteiro.anoEstudo.ano>f.anoEstudo.ano&&k++;dataPlanejamentoRoteiro=getData("PlanejamentoRoteiro/aluno",f.aluno.idAluno);for(var n=0,o=0,p=0,q=0,r=0,s=0,t=0;t<dataPlanejamentoRoteiro.length;t++)"2"==dataPlanejamentoRoteiro[t].status?dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano==f.anoEstudo.ano?n++:dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano<f.anoEstudo.ano?o++:dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano>f.anoEstudo.ano&&p++:"3"==dataPlanejamentoRoteiro[t].status&&(dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano==f.anoEstudo.ano?(n++,q++):dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano<f.anoEstudo.ano?(o++,r++):dataPlanejamentoRoteiro[t].objetivo.roteiro.anoEstudo.ano>f.anoEstudo.ano&&(p++,s++));var u="";0!=j&&(SerieAnterior=o/j*100,SerieAnteriorCorrigido=r/o*100,u+='<div class="Porcentagem_Objetivos_Serie_Anterior Porcentagem_Left" style="height:'+SerieAnterior+'%;">',u+='<div class="Porcentagem_Objetivos_Serie_Anterior_Corrigido" style="height:'+SerieAnteriorCorrigido+'%;"></div>',u+="</div>"),0!=i&&(SerieAtual=n/i*100,SerieAtualCorrigido=q/n*100,console.log(q/n+" "+q+" "+n),u+='<div class="Porcentagem_Objetivos_Serie_Atual Porcentagem_Center" style="height:'+SerieAtual+'%;">',u+='<div class="Porcentagem_Objetivos_Serie_Atual_Corrigido" style="height:'+SerieAtualCorrigido+'%;"></div>',u+="</div>"),0!=k&&(SerieProxima=p/k*100,SerieProximaCorrigido=s/p*100,u+='<div class="Porcentagem_Objetivos_Serie_Proxima Porcentagem_Right" style="height:'+SerieProxima+'%;">',u+='<div class="Porcentagem_Objetivos_Serie_Proxima_Corrigido" style="height:'+SerieProximaCorrigido+'%;"></div>',u+="</div>"),htmlContent+='<div class="Grafico_Individual_Aluno"><div class="Grafico_Individual_Aluno_Falta_Numero">'+presencaAluno(alunos[c].aluno.idAluno)+'</div><div id="Grade_Aluno_Grafico_Mask"><div class="Grafico_Individual_Aluno_Escala">'+u+'</div></div><a href="relatorioAluno.html?ID='+base64_encode(""+alunos[c].aluno.idAluno)+"&TU="+base64_encode(""+gruposProfessor[b].tutoria.idtutoria)+'"><div class="Grafico_Individual_Aluno_Foto"><img class="foto_aluno" nomeAluno=" '+alunos[c].aluno.nome+' "src="'+alunos[c].aluno.fotoAluno+' "></img>',temPendenciaProf(alunos.idAluno)&&(htmlContent+=' <div id="icone_alerta"> a </div>'),htmlContent+='</div></a><div class="Grafico_Individual_Aluno_Foto_Hover grupo '+e+'" id="LD_'+alunos[c].aluno.idAluno+'" nomeAluno="'+alunos[c].aluno.nome+'" '+funcao+"></div></div>"}htmlContent+="</div> </div></div>",0==a&&(htmlContent=""),$("#Grupos_box").append(htmlContent)}$("#Grupos_box").append('<div class="aluno_foco"> </div>'),$(".Grafico_Individual_Aluno_Foto_Hover").mouseover(mostrarNome).mouseout(function(){$(".aluno_foco").hide()}),$(".foto_aluno").mouseover(mostrarNome).mouseout(function(){$(".aluno_foco").hide()})}function mostrarNome(){$(".aluno_foco").show(),$(".aluno_foco").css("left",$(this).position().left-30+"px"),$(".aluno_foco").css("background-color","white"),$(".aluno_foco").css("top",$(this).position().top+37+"px"),$(".aluno_foco").html($(this).attr("nomeAluno"))}function mudarLider(a,b){var c=$("#grupo_"+a+" .lider").attr("id");$("#boxMensagemGeral").html("<p>Teste loading</p>").show(),$.ajax({url:path+"Grupo/liderGrupo/",type:"POST",async:!1,crossDomain:!0,dataType:"json",contentType:!1,data:"action=update&grupo="+a+"&lider="+b,success:function(){$("#"+c).removeClass("lider"),$("#LD_"+b).addClass("lider"),$("#boxMensagemGeral").html("<p>Teste loading</p>").hide()},error:function(){}})}function drawBoxProfessor(){HtmlContent='<div id="Tutor_box"><div id="tutor_img"><img src='+dataProfessorFuncionario.fotoProfessorFuncionario+'></div><div id="nome_tutor"> '+dataProfessorFuncionario.nome+' </div><div id="turma"> 6 ano - manh\xe3 </div><div id="visualizar_dados"><a href="#" id="visualizar" onclick="visualizarDados()">Visualizar dados</a></div></div>',$(HtmlContent).insertBefore("#Grupos_box")}function getProfessorByUsuario(a){for(var b=0;b<dataUsuario.length;b++)if(dataUsuario[b].idusuario==a)return dataUsuario[b].professor.idprofessorFuncionario}function getAlunoVariavel(a){if(dataAlunoVariavel.length>0)for(var b=0;b<dataAlunoVariavel.length;b++)if(dataAlunoVariavel[b].aluno.idAluno==a)return dataAlunoVariavel[b]}function getNumeroPlanejamento(a,b){var c=0;dataPlanejamentoRoteiro=getData("PlanejamentoRoteiro/aluno",a);for(var d=0;d<dataPlanejamentoRoteiro.length;d++)1==b?("2"==dataPlanejamentoRoteiro[d].status||"3"==dataPlanejamentoRoteiro[d].status||"4"==dataPlanejamentoRoteiro[d].status)&&c++:2==b&&"3"==dataPlanejamentoRoteiro[d].status&&c++;return c}function visualizarDados(){localStorage.setItem("professorEdt",base64_decode(GetURLParameter("ID"))),$(location).attr("href","visualizarDadosProfessor.html")}var dataUsuario,professorID,dataProfessorFuncionario,Tutor,tutoria,grupos,alunos,gruposProfessor=[],funcao,htmlContent,dataObjetivo=getData("Objetivo",null);$(document).ready(function(){"Coordenacao"==usuario?initCoordena():"Professor"==usuario&&initProfessor()});