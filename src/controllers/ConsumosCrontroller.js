const ConsumoModel = require("../models/ListaConsumosModels");
const {
  CreateConsumo,
  deleteConsumo,
  updateConsumo,
  FindAllConsumo,
} = require("../repository/ConsumosRepository");

async function create(req, res) {
  const params = req.body;

  const consumo = new ConsumoModel();

  if (!params.consumo_energetico || !params.numero_de_piso || !params.fecha) {
    res.status(400).send({ message: "Todos los campos son requeridos" });
    return;
  }

  if (isNaN(params.consumo_energetico) || isNaN(params.numero_de_piso)) {
    res
      .status(400)
      .send({ message: "Los campos solo pueden contener números" });
    return;
  }

  consumo.fecha = params.fecha;
  consumo.consumo_energetico = params.consumo_energetico;
  consumo.numero_de_piso = params.numero_de_piso;

  const response = await CreateConsumo(consumo);
  res.status(response.status).send(response);
}

async function deleteConsumoData(req, res) {
  const id = req.params["id"];
  const response = await deleteConsumo(id);
  res.status(response.status).send(response);
}

async function updateConsumoData(req, res) {
  const id = req.params["id"];
  const body = req.body;

  let consumo = new ConsumoModel();
  consumo.consumo_energetico = body.consumo_energetico;
  consumo.numero_de_piso = body.numero_de_piso;

  const response = await updateConsumo(id, consumo);
  res.status(response.status).send(response);
}

async function findAll(req, res) {
  const response = await FindAllConsumo();
  res.status(response.status).send(response);
}

module.exports = {
  create,
  deleteConsumoData,
  updateConsumoData,
  findAll,
};
