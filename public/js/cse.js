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

var jogos = [
	{
		data: "17.05.15",
		time1: "G 3",
		placar1: 10,
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
    	placar2: 6
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

$(document).ready(function(){
	ultimosJogos(6, ".destaques .ultimos-jogos h2");
	ultimosJogos(100, ".estatisticas .ultimos-jogos h2");
	
	menuEvents();
});