const ConsumoModel = require("../models/ListaConsumosModels")
const {CreateConsumo , deleteConsumo, updateConsumo }= require("../repository/ConsumosRepository")

async function create(req, res) {
    const params = req.body;
  
    const consumo = new ConsumoModel();
  
    if (
      !params.consumo_energetico ||
      !params.numero_de_piso 
    ) {
      res.status(400).send({ message: "Todos los campos son requeridos" });
      return;
    }

    consumo.consumo_energetico = params.consumo_energetico
    consumo.numero_de_piso = params.numero_de_piso

    const response = await CreateConsumo(consumo)
    res.status(response.status).send(response)
}

async function deleteConsumoData(req, res){
  const id = req.params["id"];
  const response = await deleteConsumo(id);
  res.status(response.status).send(response);
}

async function updateConsumoData(req, res){
  const id = req.params["id"];
  const body = req.body;

  let consumo = new ConsumoModel();
  consumo.consumo_energetico = body.consumo_energetico;
  consumo.numero_de_piso = body.numero_de_piso;

  const response = await updateConsumo(id, consumo);
  res.status(response.status).send(response);
}
  
module.exports = {
    create, deleteConsumoData, updateConsumoData,
};


  