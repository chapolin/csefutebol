function menuEvents() {
  $(".menu-toggle").on("click", function() {
    $(".menu-list").toggle();
  });
}

var ultimosJogos = function(limit, target) {
	var htmlUltimosJogos = "", count = 1, limit = !limit ? 6 : limit;

	for(var i in jogos) {
		htmlUltimosJogos+= '<div class="item-jogo' + (count == 1 ? ' primeira-linha' : '') + '">';
		htmlUltimosJogos+= 	'<i class="data-jogo">' + jogos[i].data +  '</i> - <span class="nome-time">' + jogos[i].time1 +  '</span><span class="placar-jogo">' + jogos[i].placar1 +  '</span> x <span class="placar-jogo">' + jogos[i].placar2 +  '</span><span class="nome-time">' + jogos[i].time2 +  '</span>';
		htmlUltimosJogos+= '</div>';

		if(count == limit) break;

		count++;
	}

	$(target).after(htmlUltimosJogos);
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

var jogos = [
  {
		data: "14.06.15",
		time1: "C.S.E (B)",
		placar1: 5,
		time2: "The Brothers",
		placar2: 7
	},
  {
		data: "14.06.15",
		time1: "C.S.E (A)",
		placar1: 8,
		time2: "The Brothers",
		placar2: 9
	},
  {
		data: "07.06.15",
		time1: "C.S.E (B)",
		placar1: 5,
		time2: "Real Madrid",
		placar2: 10
	},
  {
		data: "07.06.15",
		time1: "C.S.E (A)",
		placar1: 6,
		time2: "Real Madrid",
		placar2: 7
	},
  {
		data: "06.06.15",
		time1: "C.S.E (A)",
		placar1: 0,
		time2: "Só Mulekes",
		placar2: 6
	},
  {
		data: "06.06.15",
		time1: "C.S.E (B)",
		placar1: 3,
		time2: "Império F.S",
		placar2: 6
	},
	{
		data: "30.05.15",
		time1: "Real Estrela",
		placar1: 9,
		time2: "C.S.E (B)",
		placar2: 4
	},
	{
		data: "30.05.15",
		time1: "Real Estrela",
		placar1: 7,
		time2: "C.S.E (A)",
		placar2: 14
	},
	{
		data: "24.05.15",
		time1: "Só Mulekes",
		placar1: 8,
		time2: "C.S.E (B)",
		placar2: 7
	},
	{
		data: "24.05.15",
		time1: "Só Mulekes",
		placar1: 8,
		time2: "C.S.E (A)",
		placar2: 6
	},
	{
		data: "17.05.15",
		time1: "G 3",
		placar1: 11,
		time2: "C.S.E (B)",
		placar2: 4
	},
	{
		data: "17.05.15",
		time1: "G 3",
		placar1: 5,
		time2: "C.S.E (A)",
		placar2: 13
	},
    {
    	data: "16.05.15",
    	time1: "Real Maloka",
    	placar1: 5,
    	time2: "C.S.E (B)",
    	placar2: 10
    },
    {
    	data: "16.05.15",
    	time1: "Real Maloka",
    	placar1: 10,
    	time2: "C.S.E (A)",
    	placar2: 5
    },
    {
    	data: "10.05.15",
    	time1: "C.S.E (B)",
    	placar1: 4,
    	time2: "Red Bull",
    	placar2: 4
    },
    {
    	data: "10.05.15",
    	time1: "C.S.E (A)",
    	placar1: 2,
    	time2: "Red Bull",
    	placar2: 4
    },
    {
    	data: "02.05.15",
    	time1: "Unidos de Jandira",
    	placar1: 1,
    	time2: "C.S.E (B)",
    	placar2: 8
    },
    {
    	data: "02.05.15",
    	time1: "Unidos de Jandira",
    	placar1: 5,
    	time2: "C.S.E (A)",
    	placar2: 5
    },
    {
    	data: "26.04.15",
    	time1: "Canela Seca",
    	placar1: 12,
    	time2: "C.S.E (B)",
    	placar2: 7
    },
    {
    	data: "26.04.15",
    	time1: "Canela Seca",
    	placar1: 18,
    	time2: "C.S.E (A)",
    	placar2: 2
    },
    {
    	data: "25.04.15",
    	time1: "Tigres do Morro",
    	placar1: 7,
    	time2: "C.S.E (B)",
    	placar2: 5
    },
    {
    	data: "25.04.15",
    	time1: "Tigres do Morro",
    	placar1: 7,
    	time2: "C.S.E (A)",
    	placar2: 2
    },
    {
    	data: "19.04.15",
    	time1: "Acabou o Sussego",
    	placar1: 3,
    	time2: "C.S.E (B)",
    	placar2: 6
    },
    {
    	data: "19.04.15",
    	time1: "Acabou o Sussego",
    	placar1: 3,
    	time2: "C.S.E (A)",
    	placar2: 7
    },
    {
    	data: "05.04.15",
    	time1: "C.S.E (B)",
    	placar1: 3,
    	time2: "Preto no Branco",
    	placar2: 1
    },
    {
    	data: "05.04.15",
    	time1: "C.S.E (A)",
    	placar1: 10,
    	time2: "Preto no Branco",
    	placar2: 9
    },
    {
    	data: "29.03.15",
    	time1: "C.S.E (B)",
    	placar1: 4,
    	time2: "Shadow",
    	placar2: 4
    },
    {
    	data: "29.03.15",
    	time1: "C.S.E (A)",
    	placar1: 6,
    	time2: "Shadow",
    	placar2: 8
    },
    {
    	data: "28.03.15",
    	time1: "Os Abusados",
    	placar1: 1,
    	time2: "C.S.E (B)",
    	placar2: 7
    },
    {
    	data: "28.03.15",
    	time1: "Amigos Futsal",
    	placar1: 7,
    	time2: "C.S.E (B)",
    	placar2: 6
    },
    {
    	data: "28.03.15",
    	time1: "Amigos Futsal",
    	placar1: 7,
    	time2: "C.S.E (A)",
    	placar2: 4
    },
    {
    	data: "22.03.15",
    	time1: "C.S.E (B)",
    	placar1: 8,
    	time2: "Real Futsal",
    	placar2: 5
    },
    {
    	data: "22.03.15",
    	time1: "C.S.E (A)",
    	placar1: 1,
    	time2: "Real Futsal",
    	placar2: 2
    },
    {
    	data: "21.03.15",
    	time1: "Esquadrão Futsal",
    	placar1: 9,
    	time2: "C.S.E (B)",
    	placar2: 5
    },
    {
    	data: "21.03.15",
    	time1: "Esquadrão Futsal",
    	placar1: 13,
    	time2: "C.S.E (A)",
    	placar2: 8
    },
    {
    	data: "15.03.15",
    	time1: "Estrelinhas",
    	placar1: 7,
    	time2: "C.S.E (B)",
    	placar2: 4
    },
    {
    	data: "15.03.15",
    	time1: "Estrelinhas",
    	placar1: 9,
    	time2: "C.S.E (A)",
    	placar2: 9
    },
    {
    	data: "08.03.15",
    	time1: "C.S.E (B)",
    	placar1: 8,
    	time2: "Shadow",
    	placar2: 7
    },
    {
    	data: "08.03.15",
    	time1: "C.S.E (A)",
    	placar1: 12,
    	time2: "Shadow",
    	placar2: 10
    },
    {
    	data: "22.02.15",
    	time1: "C.S.E (B)",
    	placar1: 4,
    	time2: "Real Estrela",
    	placar2: 4
    },
    {
    	data: "22.02.15",
    	time1: "C.S.E (A)",
    	placar1: 5,
    	time2: "Real Estrela",
    	placar2: 5
    }
];

var artilheiros = [
    {
    	nome: "Nenen",
    	gols: 35,
    	quadro: 1
    },
    {
    	nome: "Paulo",
    	gols: 31,
    	quadro: 2
    },
    {
    	nome: "Ítalo",
    	gols: 32,
    	quadro: 1
    },
    {
    	nome: "Samuray",
    	gols: 17,
    	quadro: 1
    },
    {
    	nome: "Bruninho",
    	gols: 18,
    	quadro: 2
    },
    {
    	nome: "Ney",
    	gols: 13,
    	quadro: 1
    },
    {
    	nome: "Tuí",
    	gols: 13,
    	quadro: 1
    },
    {
    	nome: "Alan",
    	gols: 17,
    	quadro: 1
    },
    {
    	nome: "Caique",
    	gols: 12,
    	quadro: 2
    },
    {
    	nome: "Felipe",
    	gols: 11,
    	quadro: 2
    },
    {
    	nome: "Alemão",
    	gols: 10,
    	quadro: 1
    },
    {
    	nome: "Digo",
    	gols: 9,
    	quadro: 2
    },
    {
    	nome: "Josuel",
    	gols: 7,
    	quadro: 2
    },
    {
    	nome: "Cláudio",
    	gols: 5,
    	quadro: 1
    },
    {
    	nome: "Índio",
    	gols: 6,
    	quadro: 1
    },
    {
    	nome: "Marcelo",
    	gols: 5,
    	quadro: 2
    },
    {
    	nome: "Danilo",
    	gols: 4,
    	quadro: 2
    },
    {
    	nome: "Leandrão",
    	gols: 2,
    	quadro: 2
    },
    {
    	nome: "Rafael",
    	gols: 3,
    	quadro: 2
    },
    {
    	nome: "Alcymar",
    	gols: 0,
    	quadro: 1
    },
    {
    	nome: "Luciano",
    	gols: 0,
    	quadro: 2
    },
    {
    	nome: "Danilo Nil",
    	gols: 0,
    	quadro: 2
    },
    {
    	nome: "Leandro",
    	gols: 0,
    	quadro: 1
    }
];

var ordenaArtilharia = function(a, b) {
	return b.gols - a.gols;
}

$(document).ready(function(){
	ultimosJogos(6, ".destaques .ultimos-jogos h2");
	ultimosJogos(100, ".estatisticas .ultimos-jogos h2");

	montaArtilharia(".estatisticas .artilheiros-quadro-1", 1);
	montaArtilharia(".estatisticas .artilheiros-quadro-2", 2);

	$(".artilharia-item-quadro-1:last").addClass("last");
	$(".artilharia-item-quadro-2:last").addClass("last");

	menuEvents();
});
