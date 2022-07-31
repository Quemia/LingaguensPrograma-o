function api() {
  fetch("http://localhost:3000/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (data) {
      var container = document.querySelector(".container");
      Consulta(data, container);
    });
}

function Consulta(data, container) {
  //relação quais os imóveis a venda de um determinado tipo
  const listImovelTipo = (data, container) => {
    //pegando todos os dados dos obj
    const imovel = [...data.IMOVEL_CASA, ...data.IMOVEL_APTO];

    imovel.map((index) => {
      let dadoConsulta = index.vendido;

      //verificando qual imóvel está a venda
      if (dadoConsulta === false) {
        if (index.tipo === "casa") {
          container.innerHTML +=
            `<div class="card"> 
            Casa à Venda
            <p class="cardText">` +
            "Bairro: " +
            index.loc +
            `</p>
            <p  class="cardText">` +
            "Preço: " +
            index.preco +
            `</p>
            <p  class="cardText">` +
            "Área: " +
            index.area +
            `m²</p>
          </div>`;
        } else {
          container.innerHTML +=
            `<div class="card"> 
          Apartamento à Venda
          <p class="cardText">` +
            "Bairro: " +
            index.loc +
            `</p>
          <p  class="cardText">` +
            "Preço: " +
            index.preco +
            `</p>
          <p  class="cardText">` +
            "Área: " +
            index.area +
            `m²</p>
        </div>`;
        }
      }
    });
  };

  //Verificando quais terrenos estão a venda de um determinado tamanho
  const VendaTamanho = (data, container) => {
    //pegando todos os dados dos obj
    const terreno = [...data.TERRENO_RURAL, ...data.TERRENO_URBANO];

    terreno.map((index) => {
      let dadoConsulta = index.vendido;

      //verificando qual terreno está a venda
      if (dadoConsulta === false) {
        if (index.tipo === "rural") {
          container.innerHTML +=
            `<div class="card"> 
            Terreno Rural
            <p class="cardText">` +
            "Situação: Disponível" +
            `</p>
            <p  class="cardText">` +
            "Área: " +
            index.area +
            `m²</p>
          </div>`;
        } else {
          container.innerHTML +=
            `<div class="card"> 
            Terreno Urbano
            <p class="cardText">` +
            "Situação: Disponível" +
            `</p>
            <p  class="cardText">` +
            "Área: " +
            index.area +
            `m²</p>
          </div>`;
        }
      }
    });
  };

  //Verificando os imóveis vendidos por determinado corretor
  const VendaPorCorretor = (data, container) => {
    const imovel = [...data.IMOVEL_CASA, ...data.IMOVEL_APTO];
    const funcionario = data.FUNCIONARIO;

    var imoveIdVenda = [];
    imovel.map((index) => {
      if (index.idVenda !== "") {
        imoveIdVenda.push(index.idVenda);
        funcionario.map((id) => {
          if (
            id.idVenda[0] === imoveIdVenda[0] ||
            id.idVenda[2] === imoveIdVenda[2]
          ) {
            container.innerHTML +=
              `<div class="card"> 
            Imóveis Vendidos por Corretor
            <p class="cardText">` +
              "Id-Venda: " +
              id.idVenda +
              `</p>
            <p  class="cardText">` +
              "Funcionário: " +
              id.nome +
              `</p>  
          </div>`;
          }
        });
      }
    });
    // funcionario.map((id) => {
    //   if (
    //     id.idVenda[0] === imoveIdVenda[0] ||
    //     id.idVenda[2] === imoveIdVenda[2]
    //   ) {
    //     console.log(id.idVenda, id.nome);
    //   }
    // });
  };

  //Verificando imóveis para alugar em determinado bairro
  const imoveisAlugar = (data, container) => {
    const imovelAlugar = [...data.IMOVEL_CASA, ...data.IMOVEL_APTO];

    imovelAlugar.map((id) => {
      if (id.vendido === false) {
        container.innerHTML +=
          `<div class="card"> 
            Imóveis P/ Alugar
            <p class="cardText">` +
          "Bairro: " +
          id.loc +
          `</p>
            <p  class="cardText">` +
          "Tipo: " +
          id.tipo +
          `</p>  
          </div>`;
      }
    });
  };

  //Verificando imoveis para alugar com menos de 2 anos de construção
  const imoveisAlugarData = (data, container) => {
    const imovelAlugar = [...data.IMOVEL_CASA, ...data.IMOVEL_APTO];

    const date = new Date();
    date.getFullYear();
    imovelAlugar.map((id) => {
      if (id.ano_construcao >= "2020" && id.vendido === false) {
        container.innerHTML +=
          `<div class="card"> 
              Imóveis P/ Alugar com menos de 2 anos
              <p class="cardText">` +
          "Bairro: " +
          id.loc +
          `</p>
              <p  class="cardText">` +
          "Área: " +
          id.area +
          `m²</p>  
            </div>`;
      }
    });
  };

  listImovelTipo(data, container);
  VendaTamanho(data, container);
  VendaPorCorretor(data, container);
  imoveisAlugar(data, container);
  imoveisAlugarData(data, container);
}

api();
