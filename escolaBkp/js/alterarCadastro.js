function editarProfessor(a,b){if(0==b){var c=getData("ProfessorFuncionarioVariavel/Professor",a);void 0!=c[0]?a=c[0].idprofessorFuncionarioVariavel:(f="id=0&action=create&professorFuncionario="+a+"&fotoProfessorFuncionario=&descontoQuinquenio=0&formacao=&cargo=&quinquenio=0&qpe=&letra=A&periodo=8&anoLetivo=55&observacao=",a=setCreateData("ProfessorFuncionarioVariavel/",f))}var d=getData("ProfessorFuncionarioVariavel",a),e=getData("Usuario/professor",d.professorFuncionario.idprofessorFuncionario),f="professorFuncionario="+d.professorFuncionario.idprofessorFuncionario+"&anoLetivo="+d.anoLetivo.idanoLetivo,g=!1;null==d.periodo&&(f+="&periodo=-1",g=!0),null==d.descontoQuinquenio&&(f+="&descontoQuinquenio=0",g||(f+="&periodo="+d.periodo.idperiodo,g=!0)),g&&setUpdateData("ProfessorFuncionarioVariavel",f,d.idprofessorFuncionarioVariavel),$(".box_margin_barra").load("cadastroProfessor.html",function(){if($("#frmCadastroProfessorVariavel").css("display","block"),$("#cadUsuarioProfessor").css("display","block"),$(".opcaoFoto").css("display","block"),$("#fotoCad").css("display","block").html("<img id='_foto' src='"+d.professorFuncionario.fotoProfessorFuncionario+"' width='150' height='150'/>"),void 0!=e){$("#idEdtUserProfessor").val(e.idusuario),$("#actionUserProfessor").val("update"),$("#professorUser").val(d.professorFuncionario.idprofessorFuncionario),$("#loginProfessor").attr("value",e.login),$("#senhaUserProfessor").attr("disabled","true"),$("#senhaUserProfessor").val("******"),$("#emailUsuarioProfessor").attr("value",e.email),$("#inserirArquivo .arquivo").attr("id","imagem"),$("#inserirArquivo .arquivo").attr("name","imagem");for(var a=0;a<$("#perfilCadastro option").length;a++)$("#perfilCadastro option")[a].selected=$("#perfilCadastro option")[a].value==e.perfil.idperfil?!0:!1}else $("#idEdtUserProfessor").val(""),$("#actionUserProfessor").val("create"),$("#professorUser").val(""),$("#loginProfessor").attr(""),$("#emailUsuarioProfessor").attr("value",""),$("#perfilCadastro option")[0].selected=!0}),$("#box_cadastro").css("background","#F1F1EC"),localStorage.setItem("professorEdt",a)}function listadados(){var b=localStorage.getItem("alunoEdt");$("#editarId").val(b);$("#idAluno").val();if(null!=b&&""!=b){var d=getData("Alunos",b);$("#action").val("update"),$("#actionUser").val("update"),$("#actionUserVar").val("update"),$("#aluno").val(b),$("#idAluno").val(b),$("#alunoUser").val(b),$("#nome").val(d.nome),$("#email").val(d.email),$("#sexo").val(d.sexo),$("#naturalPais").val(d.naturalPais),$("#rg").val(d.rg),$("#cpf").val(d.cpf),$("#observacao").val(d.observacao),$("#celular").val(d.celular),$("#endereco").val(d.endereco),$("#numero").val(d.numero),$("#bairro").val(d.bairro),$("#complemento").val(d.complemento),$("#cep").val(d.cep.substring(0,5)+"-"+d.cep.substring(5,9)),$("#dataMatricula").val(d.dataMatricula),$("#dataNascimento").val(d.dataNascimento),$("#endereco").val(d.endereco),$("#numero").val(d.numero),$("#numeroEol").val(d.numeroEol),$("#numeroRA").val(d.numeroRA);var e=$("#etnia");e.val(e.find('option[value="'+d.etnia+'"]').val()),""!=d.naturalCidade&&$("#naturalCidade").append('<option value="'+d.naturalCidade+'">'+d.naturalCidade+"</option>");var f=$("#naturalEstado");f.val(f.find('option[value="'+d.naturalEstado+'"]').val());var g=$("#uf");g.val(g.find('option[value="'+d.uf+'"]').val()),""!=d.cidade&&$("#cidade").html('<option value="'+d.cidade+'">'+d.cidade+"</option>"),$("#nomeMae").val(d.nomeMae),$("#complementoMae").val(d.complementoMae),$("#email1Mae").val(d.email1Mae),$("#email2Mae").val(d.email2Mae),$("#enderecoMae").val(d.enderecoMae),$("#numeroMae").val(d.numeroMae),$("#telefoneCelularMae").val(d.telefoneCelularMae),$("#telefoneComercialMae").val(d.telefoneComercialMae),$("#telefoneResidencialMae").val(d.telefoneResidencialMae);var h=$("#ufMae");h.val(h.find('option[value="'+d.ufMae+'"]').val()),null!=d.cidadeMae&&$("#cidadeMae").html('<option value="'+d.cidadeMae+'">'+d.cidadeMae+"</option>"),null!=d.cidadePai&&$("#cidadePai").html('<option value="'+d.cidadePai+'">'+d.cidadePai+"</option>"),null!=d.cidadeResponsavel&&$("#cidadeResponsavel").html('<option value="'+d.cidadeResponsavel+'">'+d.cidadeResponsavel+"</option>"),$("#nomePai").val(d.nomePai),$("#complementoPai").val(d.complementoPai),$("#email1Pai").val(d.email1Pai),$("#email2Pai").val(d.email2Pai),$("#enderecoPai").val(d.enderecoPai),$("#numeroPai").val(d.numeroPai),$("#telefoneCelularPai").val(d.telefoneCelularPai),$("#telefoneComercialPai").val(d.telefoneComercialPai),$("#telefoneResidencialPai").val(d.telefoneResidencialPai);var i=$("#ufPai");i.val(i.find('option[value="'+d.ufPai+'"]').val()),$("#complementoResponsavel").val(d.complementoResponsavel),$("#email1Responsavel").val(d.email1Responsavel),$("#email2Responsavel").val(d.email2Responsavel),$("#enderecoResponsavel").val(d.enderecoResponsavel),$("#nomeResponsavel").val(d.nomeResponsavel),$("#numeroResponsavel").val(d.numeroResponsavel),$("#responsaveisResponsavel").val(d.responsaveisResponsavel),$("#telefoneCelularResponsavel").val(d.telefoneCelularResponsavel),$("#telefoneComercialResponsavel").val(d.telefoneComercialResponsavel),$("#parentescoResponsavel").val(d.parentescoResponsavel),$("#eresponsavelLegalMae").val(d.eresponsavelLegalMae),$("#eresponsavelLegalPai").val(d.eresponsavelLegalPai),$("#eresponsavelLegalResponsavel").val(d.eresponsavelLegalResponsavel),$("#fotoCad").css("display","block").html("<img id='_foto' src='"+d.fotoAluno+"' width='150' height='150'/>"),window.setTimeout(function(){if("S"==d.enecessidadeEspecial?$('.infoValueMm:contains("Sim")').filter(":first").next().trigger("click"):"N"==d.enecessidadeEspecial&&$('.infoValueMm:contains("N\xe3o")').filter(":first").next().trigger("click"),"S"==d.eresponsavelLegalMae?$('.resp:contains("M\xe3e")').filter(":first").next().trigger("click"):"S"==d.eresponsavelLegalPai?$('.resp:contains("Pai")').filter(":first").next().trigger("click"):"S"==d.eresponsavelLegalResponsavel&&$('.resp:contains("Outro")').filter(":first").next().trigger("click"),(null==d.eresponsavelLegalMae||"N"==d.eresponsavelLegalMae)&&(null==d.eresponsavelLegalPai||"N"==d.eresponsavelLegalPai)&&(null==d.eresponsavelLegalResponsavel||"N"==d.eresponsavelLegalResponsavel)){var a=d.dataNascimento.split("-"),b=idade(a[0],a[1],a[2]);b>=18&&$('.resp:contains("Aluno maior de idade")').filter(":first").next().trigger("click")}},10)}}var StoredCamposini=[],StoredCamposfim=[];