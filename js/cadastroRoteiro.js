function abreCombo(a,b){if($("#"+a).toggle(),"block"==$("#"+a).css("display")){var c=a.replace(/[^0-9]+/g,"");$("#ano_"+c).html("<option value=''></option>"+HtmlContent),$("#ano_"+c+" option[value="+b+"]").hide()}return!1}function listaRoteiroMultiplaEscolhas(a,b,c){var a=("lista_combo_"+a.substring(4),$("#"+a).val()),e=getData("Roteiro/RoteiroAno",a);HtmlContentR='<div class="multiselect">',HtmlContentR+='<div class="selectBox  styled-select" onclick="showCheckboxes(\'check_'+b+'\')" name="ok">',HtmlContentR+="<select>",HtmlContentR+="<option>Selecione um roteiro</option>",HtmlContentR+="</select>",HtmlContentR+='<div class="overSelect"></div>',HtmlContentR+="</div>",HtmlContentR+='<div class="checkboxes check_'+b+'">';for(var f=0,g=0;g<e.length;g++)0==VerificaAtribuicaoRoteiroExtra(c,e[g].idroteiro)&&(HtmlContentR+='<label class="'+b+"_"+e[g].idroteiro+'" for="'+b+"_"+e[g].idroteiro+'"><input type="checkbox" id="'+b+"_"+e[g].idroteiro+'" name="'+e[g].idroteiro+'" class="op op_'+b+'"/>'+e[g].nome+"</label>",f++);return HtmlContentR+="</div>",HtmlContentR+="</div>",$("#"+b).html(f>0?HtmlContentR:'<div class="celulaGrande"><div class="infoTotal"> Nenhum roteiro dispon\xedvel!!</div></div>'),!1}function criarRoteiro(a,b,c){var d,e,f="nome="+b+"&descricao="+c+"&anoEstudo="+a+"&ativo=1";return d=setCreateData("Roteiro",f),"erro"!=d?(mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso"),e=d):(mensagem("Erro ao cadastrar!","OK","bt_ok","erro"),e="erro"),e}function fltRoteiro(){var a=$("#anoEstudo").val();HtmlContentRot="";for(var b=0;b<dataRoteiro.length;b++)a==dataRoteiro[b].anoEstudo.idanoEstudo&&(HtmlContentRot+="<div class='item' id=rot_"+dataRoteiro[b].idroteiro+"><div class='titulo_roteiro'>"+dataRoteiro[b].nome+"</div> <span class='editar' onclick='editarROA(\"Roteiro\","+dataRoteiro[b].idroteiro+")'></span><span class='excluir' onclick='excluirROA(\"Roteiro\","+dataRoteiro[b].idroteiro+")'></span></div>");$("#roteiros_listados").html(HtmlContentRot)}function criarObjetivo(a,b,c,d){var e,f="nome="+a+"&numero="+b+"&descricao="+c+"&roteiro="+d+"&ativo=1";return e=setCreateData("Objetivo",f),"erro"!=e?(mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso"),status=e):(mensagem("Erro ao cadastrar!","OK","bt_ok","erro"),status="erro"),status}function listaRoteiro(a,b){var c=getData("Roteiro",null),a=$("#"+a).val();HtmlContentR="";for(var d=0;d<c.length;d++)a==c[d].anoEstudo.idanoEstudo&&(HtmlContentR+="<option value='"+c[d].idroteiro+"'>"+c[d].nome+"</option>");$("#"+b).html("<option value=''></option>"+HtmlContentR)}function fltRoteiroObjetivo(){var c,a=$("#roteiroObj").val(),b=$("#anoEObj").val();HtmlContentOEx="";for(var d=0;d<dataObjetivo.length;d++)a!=dataObjetivo[d].roteiro.idroteiro&&""!=a||b!=dataObjetivo[d].roteiro.anoEstudo.idanoEstudo&&""!=b||(HtmlContentOEx+="<div class='item' id='obj_"+dataObjetivo[d].idobjetivo+"'><div class='titulo_objetivo'>"+dataObjetivo[d].nome+"</div> <span class='editar' onclick='editarROA(\"Objetivo\","+dataObjetivo[d].idobjetivo+")'> </span><span class='excluir' onclick='excluirROA(\"Objetivo\","+dataObjetivo[d].idobjetivo+")'></div>");c=$("#objetivos_listados").html(HtmlContentOEx)}function criarAtividade(a,b,c,d,e,f){var g,h="nome="+a+"&numero="+b+"&descricao="+c+"&objetivo="+d+"&paginaLivro="+e+"&livro="+f+"&ativo=1";return g=setCreateData("Atividade",h),"erro"!=g?(mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso"),status=g):(mensagem("Erro ao cadastrar!","OK","bt_ok","erro"),status="erro"),status}function listagemObjetivo(a){var b=getData("Objetivo",null),c=$("#anoEAtv").val(),d=$("#roteiroAtv").val();HtmlContentR="";for(var e=0;e<b.length;e++)c==b[e].roteiro.anoEstudo.idanoEstudo&&d==b[e].roteiro.idroteiro&&(HtmlContentR+="<option value='"+b[e].idobjetivo+"'>"+b[e].nome+"</option>");$("#"+a).html("<option value=''></option>"+HtmlContentR)}function fltAtividades(){var a=getData("Atividade",null),b=$("#objetivoAtv").val(),c=$("#roteiroAtv").val(),d=$("#anoEAtv").val();$("#idAtv").val(""),$("#nomeAtv").val(""),$("#numeroAtv").val(""),$("#livroAtv").val(""),$("#paginaAtv").val(""),$("#btnSalvarAtividade").css("display","block"),$("#btnEditarAtividade").css("display","none");HtmlContentARx="";for(var f=0;f<a.length;f++)null==a[f].objetivo||b==a[f].objetivo.idobjetivo&&c==a[f].objetivo.roteiro.idroteiro&&d==a[f].objetivo.roteiro.anoEstudo.idanoEstudo&&(HtmlContentARx+="<div class='item' id='atv_"+a[f].idatividade+"'><div class='titulo_atividade'>"+a[f].descricao+"</div> <span class='editar' onclick='editarROA(\"Atividade\","+a[f].idatividade+")'> </span><span class='excluir' onclick='excluirROA(\"Atividade\","+a[f].idatividade+")'></div>");$("#atividades_listadas").html(HtmlContentARx)}function editarROA(a,b){var c=getData(a,b);"Roteiro"==a?($("#id").val(b),$("#nome").val(c.nome),$("#btnSalvar").css("display","none"),$("#btnEditar").css("display","block")):"Objetivo"==a?($("#idObj").val(b),$("#nomeObj").val(c.nome),$("#numeroObj").val(c.numero),$("#btnSalvarObjetivo").css("display","none"),$("#btnEditarObjetivo").css("display","block")):"Atividade"==a&&($("#idAtv").val(b),$("#nomeAtv").val(c.descricao),$("#numeroAtv").val(c.numero),$("#livroAtv").val(c.livro),$("#paginaAtv").val(c.paginaLivro),$("#btnSalvarAtividade").css("display","none"),$("#btnEditarAtividade").css("display","block"))}function alterarROA(a){loading("inicial");var f,b="",c="",d="",e="";if(HtmlContent="","Roteiro"==a){var g=$("#anoEstudo").val(),h=$("#nome").val(),i=$("#id").val();d="rot_"+i;var e="";c="&nome="+h+"&descricao="+e+"&anoEstudo="+g+"&ativo=1&id="+i,HtmlContent="<div class='item selecionado'><div class='titulo_roteiro'>"+h+"</div> <span class='editar' onclick='editarROA(\"Roteiro\","+i+")'></span><span class='excluir' onclick='excluirROA(\"Roteiro\","+i+")'></div>",f="Roteiro alterado com sucesso!"}else if("Objetivo"==a){var j=$("#roteiroObj").val(),l=($("#anoEObj").val(),$("#numeroObj").val()),m=$("#nomeObj").val(),n=$("#idObj").val();d="obj_"+n;var e="";c="&nome="+m+"&numero="+l+"&descricao="+e+"&roteiro="+j+"&ativo=1&id="+i,HtmlContent="<div class='item selecionado'><div class='titulo_objetivo'>"+m+"</div> <span class='editar' onclick='editarROA(\"Objetivo\","+i+")'></span><span class='excluir' onclick='excluirROA(\"Objetivo\","+i+")'></div>",f="Objetivo alterado com sucesso!"}else if("Atividade"==a){var o=$("#objetivoAtv").val(),p=$("#idAtv").val(),e=$("#nomeAtv").val(),q="",r=$("#numeroAtv").val(),s=$("#livroAtv").val(),t=$("#paginaAtv").val();if(d="atv_"+p,c="&nome="+q+"&numero="+r+"&descricao="+e+"&objetivo="+o+"&paginaLivro="+t+"&livro="+s+"&ativo=1&id="+p,HtmlContent="<div class='item selecionado'><div class='titulo_objetivo'>"+e+"</div> <span class='editar' onclick='editarROA(\"Atividade\","+p+")'></span><span class='excluir' onclick='excluirROA(\"Atividade\","+p+")'></div>",f="Atividade alterada com sucesso!",""==e||""==r||""==o||""==s)return mensagem("Os campos nome, n\xfamero, objetivo e livro s\xe3o obrigat\xf3rios!","OK","bt_ok","alerta"),!1;$("#idAtv").val(""),$("#nomeAtv").val(""),$("#numeroAtv").val(""),$("#livroAtv").val(""),$("#paginaAtv").val(""),$("#btnSalvarAtividade").css("display","block"),$("#btnEditarAtividade").css("display","none")}var b=setUpdateData(a,c,i);return loading("inicial"),"erro"!=b?($("#"+d).html(HtmlContent),mensagem(f,"OK","bt_ok","sucesso"),loading("final"),console.log("8"),!1):(mensagem("Erro ao alterar!","OK","bt_ok","erro"),loading("final"),!1)}function excluirROA(a,b){mensagem("Deseja realmente excluir?","Cancelar","bt_cancelar","confirm",a,b,"excluirRegistro")}function excluirRegistro(a,b){var c=getData(a,b);"Roteiro"==a?(alterar="&nome="+c.nome+"&descricao="+c.descricao+"&anoEstudo="+c.anoEstudo.idanoEstudo+"&ativo=0&id="+b,$("#rot_"+b).remove(),msg="Roteiro exclu\xeddo com sucesso!"):"Objetivo"==a?(alterar="&nome="+c.nome+"&numero="+c.numero+"&descricao="+c.descricao+"&roteiro="+c.roteiro.idroteiro+"&ativo=0&id="+b,$("#obj_"+b).remove(),msg="Objetivo exclu\xeddo com sucesso!"):"Atividade"==a&&(alterar="&nome="+c.nome+"&numero="+c.numero+"&descricao="+c.descricao+"&objetivo="+c.objetivo.idobjetivo+"&paginaLivro="+c.paginaLivro+"&livro="+c.livro+"&ativo=0&id="+b,$("#atv_"+b).remove(),msg="Atividade exclu\xedda com sucesso!");var d=setUpdateData(a,alterar,b);return"erro"!=d?($("#boxMensagemGeral").hide(),mensagem(msg,"OK","bt_ok","sucesso")):($("#boxMensagemGeral").hide(),mensagem("Erro ao alterar!","OK","bt_ok","erro"))}function VerificaAtribuicaoRoteiroExtra(a,b){var c;return $.ajax({type:"GET",async:!1,crossDomain:!0,url:path+"AtribuicaoRoteiroExtra/RoteiroAluno/"+a+"/"+b}).then(function(a){c=a}),c}var ultimo_id,dataAnoEstudo=getData("AnoEstudo",null),dataRoteiro=getData("Roteiro",null),dataObjetivo=getData("Objetivo",null),dataAtividade=getData("Atividade",null);$(document).ready(function(){$("a.accordion").click(function(){$(this).parent().find("div.secao_cadastro").slideToggle("slow"),$(this).closest("div.secao_bloco").attr("id")}),HtmlContent="";for(var a=0;a<dataAnoEstudo.length;a++)HtmlContent+="<option value='"+dataAnoEstudo[a].idanoEstudo+"'>"+dataAnoEstudo[a].ano+"\xba</option>";$(".anoEstudoRoteiro").html("<option value=''></option>"+HtmlContent),$("#anoEObj").html("<option value=''></option>"+HtmlContent),$("#anoEAtv").html("<option value=''></option>"+HtmlContent),$("#btnSalvar").click(function(){var d,a=$("#anoEstudo").val(),b=$("#nome").val(),c="",e="";if(""==b)mensagem("Campo nome \xe9 obrigat\xf3rio!","OK","bt_ok","alerta");else{ultimo_id=criarRoteiro(a,b,c),d=getData("Roteiro",ultimo_id),e+="<div class='item' id=rot_"+d.idroteiro+"><div class='titulo_roteiro'>"+d.nome+"</div> <span class='editar' onclick='editarROA(\"Roteiro\","+d.idroteiro+")'></span><span class='excluir' onclick='excluirROA(\"Roteiro\","+d.idroteiro+")'></span></div>";var f=$("#roteiros_listados .item");f.length>0?$(e).insertBefore("#roteiros_listados .item:first"):$("#roteiros_listados").html(e),mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso")}}),$("#btnSalvarObjetivo").click(function(){var a=$("#nomeObj").val(),b=$("#numeroObj").val(),c="",d="",e=$("#roteiroObj").val();if(mensagem("Os campos nome, n\xfamero e roteiro s\xe3o obrigat\xf3rios!","OK","bt_ok","alerta"),""==a||""==b||""==e)mensagem("Os campos nome, n\xfamero e roteiro s\xe3o obrigat\xf3rios!","OK","bt_ok","alerta");else{ultimo_id=criarObjetivo(a,b,c,e),cadastrado=getData("Objetivo",ultimo_id),d+="<div class='item' id='obj_"+cadastrado.idobjetivo+"'><div class='titulo_objetivo'>"+cadastrado.nome+"</div> <span class='editar' onclick='editarROA(\"Objetivo\","+cadastrado.idobjetivo+")'></span><span class='excluir' onclick='excluirROA(\"Objetivo\","+cadastrado.idobjetivo+")'></span></div>";var f=$("#objetivos_listados .item");f.length>0?$(d).insertBefore("#objetivos_listados .item:first"):$("#objetivos_listados").html(d),mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso")}}),$("#btnSalvarAtividade").click(function(){var a="",b=$("#numeroAtv").val(),c=$("#nomeAtv").val(),d=$("#objetivoAtv").val(),e=$("#paginaAtv").val(),f=$("#livroAtv").val(),g="",h="";if(""==c||""==b||""==d||""==f)mensagem("Os campos nome, n\xfamero, objetivo e livro s\xe3o obrigat\xf3rios!","OK","bt_ok","alerta");else{h=criarAtividade(a,b,c,d,e,f),cadastrado=getData("Atividade",h),g+="<div class='item'  id='atv_"+cadastrado.idatividade+"'><div class='titulo_atividade'>"+cadastrado.descricao+"</div> <span class='editar' onclick='editarROA(\"Atividade\","+cadastrado.idatividade+")'></span><span class='excluir' onclick='excluirROA(\"Atividade\","+cadastrado.idatividade+")'></span></div>";var i=$("#atividades_listadas .item");i.length>0?$(g).insertBefore("#atividades_listadas .item:first"):$("#atividades_listadas").html(g),mensagem("Cadastrado com sucesso!","OK","bt_ok","sucesso"),$("#idAtv").val(""),$("#nomeAtv").val(""),$("#numeroAtv").val(""),$("#livroAtv").val(""),$("#paginaAtv").val("")}return!1}),$("#roteiros_cabecalho div").click(function(){$("#roteiros_cabecalho div").css("background","#87CFDE"),$(this).css("background-color","#29B8CE"),"cabecalho_roteiro"==$(this).attr("id")?($("#Roteiro").show(),$("#Objetivo").hide(),$("#Atividade").hide(),$("#RoteiroExtra").hide()):"cabecalho_objetivo"==$(this).attr("id")?($("#Roteiro").hide(),$("#Objetivo").show(),$("#Atividade").hide(),$("#RoteiroExtra").hide()):"cabecalho_atividade"==$(this).attr("id")?($("#Roteiro").hide(),$("#Objetivo").hide(),$("#Atividade").show(),$("#RoteiroExtra").hide()):($("#Roteiro").hide(),$("#Objetivo").hide(),$("#Atividade").hide(),$("#RoteiroExtra").show())}),$("body").on("click",".item",function(){$(".item").removeClass("selecionado"),$(this).addClass("selecionado")}),$("#inserir_atividade").hover(function(){$("#over_inserir").css("opacity","1")},function(){$("#over_inserir").css("opacity","0")}),$("#inserir_atividade").click(function(){$("#separador").append("<input id='nomeAtv' name='novaAtividade' placeholder='Atividade'> </div>")}),$.ajax({type:"GET",crossDomain:!0,url:path+"AlunoVariavel/listar/1"}).then(function(a){var b=[[]];$("#alunos_listados").empty();for(var c=0;c<a.length;c++)null!=a[c].aluno&&$("#alunos_listados").append('<div class="box_item_aluno"><div class="item" onclick="abreCombo(\'lista_combo_'+a[c].idalunoVariavel+"','"+a[c].anoEstudo.idanoEstudo+'\');"><div class="titulo_objetivo">'+a[c].aluno.nome+'</div></div><div class="lista_combo" id="lista_combo_'+a[c].idalunoVariavel+'"><div class="celulaPequena rightMargin"><div class="infoP"> Ano estudo </div><div class="infoValueP"><div class="anoEstudoValor styled-select" ><select class="anoEstudo" name="ano_'+a[c].idalunoVariavel+'" id="ano_'+a[c].idalunoVariavel+'" onchange="listaRoteiroMultiplaEscolhas(\'ano_'+a[c].idalunoVariavel+"','roteiro_"+a[c].idalunoVariavel+"','"+a[c].aluno.idAluno+'\')"></select></div></div></div><div class="celulaMedia"><div class="infoM"> Motivo </div><div class="infoValueM"><input type="text" class="" name="motivo'+a[c].idalunoVariavel+'" id="motivo'+a[c].idalunoVariavel+'" ></div></div><div class="celulaGrande"><div class="infoP" style="width: 14.5%"> Roteiro </div><div class="infoValueG"><div id="roteiro_'+a[c].idalunoVariavel+'"></div></div></div><div class="btnAtribuirRoteiro" idVar="'+a[c].idalunoVariavel+'" id="'+a[c].aluno.idAluno+'" anoLetivo="'+a[c].anoLetivo.idanoLetivo+'"> Salvar </div></div></div>'),b[c]=[],b[c][0]=a[c],b[c][1]=0;var d;$("#pesquisaAluno").keyup(function(){aux=[],d=$("#pesquisaAluno").val();for(var c=0;c<b.length;c++)0==b[c][0].aluno.nome.toLowerCase().search(d.toLowerCase())&&(aux[aux.length]=[],aux[aux.length-1][0]=b[c][0],aux[aux.length-1][1]=b[c][1]);$("#alunos_listados").empty();for(var c=0;c<aux.length;c++)$("#alunos_listados").append('<div class="box_item_aluno"><div class="item" onclick="abreCombo(\'lista_combo_'+aux[c][0].idalunoVariavel+"','"+aux[c][0].anoEstudo.idanoEstudo+'\');"><div class="titulo_objetivo">'+aux[c][0].aluno.nome+'</div></div><div class="lista_combo" id="lista_combo_'+aux[c][0].idalunoVariavel+'"><div class="celulaPequena rightMargin"><div class="infoP"> Ano estudo </div><div class="infoValueP"><div class="anoEstudoValor styled-select" ><select class="anoEstudo" name="ano_'+aux[c][0].idalunoVariavel+'" id="ano_'+aux[c][0].idalunoVariavel+'" onchange="listaRoteiroMultiplaEscolhas(\'ano_'+aux[c][0].idalunoVariavel+"','roteiro_"+aux[c][0].idalunoVariavel+"','"+aux[c][0].aluno.idAluno+'\')"></select></div></div></div><div class="celulaMedia"><div class="infoM"> Motivo </div><div class="infoValueM"><input type="text" class="" name="motivo'+aux[c][0].idalunoVariavel+'" id="motivo'+aux[c][0].idalunoVariavel+'" ></div></div><div class="celulaGrande"><div class="infoP" style="width: 14.5%"> Roteiro </div><div class="infoValueG"><div id="roteiro_'+aux[c][0].idalunoVariavel+'"></div></div></div><div class="btnAtribuirRoteiro" idVar="'+aux[c][0].idalunoVariavel+'" id="'+aux[c][0].aluno.idAluno+'" anoLetivo="'+a[c].anoLetivo.idanoLetivo+'"> Salvar </div></div></div>')})}),$("body").delegate(".btnAtribuirRoteiro","click",function(){var a=$(this).attr("id"),b=$(this).attr("anoLetivo"),c=$(this).attr("idVar"),d=$("#motivo"+c).val(),f=(new Date,!1),g="idaluno="+a+"&motivo="+d+"&idano_letivo="+b,h="";return $(".op_roteiro_"+c).each(function(){if(1==$(this).hasClass("checado")&&(h=g+"&idroteiro="+$(this).attr("name"),"erro"!=setCreateData("AtribuicaoRoteiroExtra/",h))){f=!0;var a=$(this).attr("id");$("."+a).remove()}}),0==f?mensagem("Por favor, selecione um roteiro!","OK","bt_ok","erro"):mensagem("Roteiros adicionados com sucesso!","OK","bt_ok","sucesso"),!1})});