function menuEvents() {
  $(".menu-toggle").on("click", function() {
    $(".menu-list").toggle();
  });
}

var ultimosJogos = function(limit, target) {
	var htmlUltimosJogos = "", count = 1, limit = !limit ? 6 : limit;

	for(var i in jogos) {
    if(jogos[i].placar1 == null && jogos[i].placar2 == null) {
      continue;
    }

		htmlUltimosJogos+= '<div class="item-jogo' + (count == 1 ? ' primeira-linha' : '') + '">';
		htmlUltimosJogos+= 	'<i class="data-jogo">' + jogos[i].data +  '</i> - <span class="nome-time">' + jogos[i].time1 +  '</span><span class="placar-jogo">' + jogos[i].placar1 +  '</span> x <span class="placar-jogo">' + jogos[i].placar2 +  '</span><span class="nome-time">' + jogos[i].time2 +  '</span>';
		htmlUltimosJogos+= '</div>';

		if(count == limit) break;

		count++;
	}

	$(target).after(htmlUltimosJogos);
};

var proximosJogos = function(limit, target) {
	var htmlProximosJogos = "", count = 1, limit = !limit ? 4 : limit;

  jogos.reverse();

	for(var i in jogos) {
    if(jogos[i].placar1 == null && jogos[i].placar2 == null) {
      htmlProximosJogos+= '<div class="item-jogo' + (count == 1 ? ' primeira-linha' : '') + '">';
  		htmlProximosJogos+= 	'<i class="data-jogo">' + jogos[i].data +  ' ' + jogos[i].horario +  '</i> - <span class="nome-time">' + jogos[i].time1 +  '</span> x <span class="nome-time">' + jogos[i].time2 +  '</span>';
  		htmlProximosJogos+= '</div>';
      htmlProximosJogos+= '<div class="info-jogo">';
      htmlProximosJogos+= '(<strong>' + jogos[i].tipo +  ':</strong> <i>' + jogos[i].onde +  '</i>)';
      htmlProximosJogos+= '</div>';

  		if(count == limit) break;

  		count++;
    }
	}

	$(target).after(htmlProximosJogos);
};

var agenda = function(titulo, target) {
	var htmlAgenda = "";

  jogos.reverse();

  htmlAgenda+= '<h2 class="time-laranja"># ' + titulo + '</h2>';
  htmlAgenda+= '<div class="row">';

	for(var i in jogos) {
    if(jogos[i].placar1 == null && jogos[i].placar2 == null) {
      htmlAgenda+= '<span class="col-left data-evento">' + jogos[i].diaDaSemana + ' ' + jogos[i].data + '</span> -';
      htmlAgenda+= '<span class="col-right titulo-evento">' + jogos[i].tipo + '</span>';
      htmlAgenda+= '<br clear="all" /><br clear="all" />';
      htmlAgenda+= '<div class="row">';
      htmlAgenda+= '<span class="col-left"></span>';
      htmlAgenda+= '<span class="col-right">&nbsp;&nbsp;09:00 - ' + jogos[i].time1 +  ' x ' + jogos[i].time2 +  '</span>';
      htmlAgenda+= '</div>';
      htmlAgenda+= '<div class="row">';
      htmlAgenda+= '<span class="col-left local-evento">Onde:</span>';
      htmlAgenda+= '<span class="col-right local-evento-desc">' + jogos[i].onde + '</span>';
      htmlAgenda+= '</div>';
      htmlAgenda+= '<br clear="all" />';
      htmlAgenda+= '<hr />';
      htmlAgenda+= '<br clear="all" />';
    }
	}

  htmlAgenda+= '</div>';

	$(target).after(htmlAgenda);
};

var montaArtilharia = function(target, quadro) {
	var htmlArtilheiros = "", count = 1;

	artilheiros.sort(ordenaArtilharia);

	for(var i in artilheiros) {
		if(artilheiros[i].quadro == quadro) {
			htmlArtilheiros+= '<div class="row artilharia-item-quadro-' + quadro + '">';
			htmlArtilheiros+= '	<span class="col-left-min">#' + count + '</span>';
			htmlArtilheiros+= '	<span class="col-left nome-jogador">' + artilheiros[i].nome + '</span><span class="col-right qtd-gols">' + artilheiros[i].gols + ' gol(s)</span>';
			htmlArtilheiros+= '</div>';

			count++;
		}
	}

	$(target).after(htmlArtilheiros);
};

var ordenaArtilharia = function(a, b) {
	return b.gols - a.gols;
}

$(document).ready(function() {
	ultimosJogos(6, ".destaques .ultimos-jogos h2");
	ultimosJogos(100, ".estatisticas .ultimos-jogos h2");

  proximosJogos(4, ".destaques .proximos-jogos h2");

  agenda("Agenda de Agosto", ".agenda h1");

	montaArtilharia(".estatisticas .artilheiros-quadro-1", 1);
	montaArtilharia(".estatisticas .artilheiros-quadro-2", 2);

	$(".artilharia-item-quadro-1:last").addClass("last");
	$(".artilharia-item-quadro-2:last").addClass("last");

  $('.links').click(function (event) {
      event = event || window.event;
      var target = event.target || event.srcElement,
          link = target.src ? target.parentNode : target,
          options = {index: link, event: event},
          links = this.getElementsByTagName('a');
      blueimp.Gallery(links, options);
  });

	menuEvents();
});
