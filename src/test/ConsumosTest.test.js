const {
  FindAllConsumo,
  CreateConsumo,
  deleteConsumo,
  updateConsumo,
} = require("../repository/ConsumosRepository");
const { Response } = require("../utils/Response");

jest.mock("../repository/ConsumosRepository");
const ConsumoModel = require("../models/ListaConsumosModels");

const returnConsumos = {
  status: 200,
  message: "Registros Encontrados",
  result: [
    {
      _id: "65416cea960f11d1edd17c42",
      fecha: "2023-10-13T12:45:00.000Z",
      consumo_energetico: 123,
      numero_de_piso: 1,
    },
    {
      _id: "654171d6960f11d1edd17c4a",
      fecha: "2023-10-13T12:45:00.000Z",
      consumo_energetico: 999,
      numero_de_piso: 2,
    },
    {
      _id: "654172b0960f11d1edd17c51",
      fecha: "2023-10-13T12:45:00.000Z",
      consumo_energetico: 121212,
      numero_de_piso: 1,
    },
    {
      _id: "6542f6ffa798bad6e9f45a10",
      fecha: "2023-10-13T12:45:00.000Z",
      consumo_energetico: 12312,
      numero_de_piso: 3,
    },
  ],
};

const FindOneMock = {
  _id: "6542f6ffa798bad6e9f45a10",
  fecha: "2023-10-13T12:45:00.000Z",
  consumo_energetico: 12312,
  numero_de_piso: 3,
};

const createMock = {
  fecha: "2023-10-13T12:45:00.000Z",
  consumo_energetico: 12312,
  numero_de_piso: 3,
};

describe("Test Consumption Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should data Consumption Model", () => {
    Response.message = returnConsumos.message;
    Response.status = returnConsumos.status;
    Response.result = returnConsumos.result;
    FindAllConsumo.mockReturnValueOnce(Response);
    const response = FindAllConsumo();
    expect(response).toBe(Response);
  });
  it("should data Consumption Model reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    FindAllConsumo.mockReturnValueOnce(Response);
    const response = FindAllConsumo();
    expect(response).toBe(Response);
  });

  it("should data Consumption findAll", () => {
    FindAllConsumo.mockReturnValueOnce(returnConsumos);
    const response = FindAllConsumo();
    expect(response).toBe(returnConsumos);
  });
  it("should data Consumption findAll reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    FindAllConsumo.mockReturnValueOnce(Response);
    const response = FindAllConsumo();
    expect(response).toBe(Response);
  });

  it("should data Consumption Create", () => {
    CreateConsumo.mockReturnValueOnce(createMock);
    const response = CreateConsumo();
    expect(response).toBe(createMock);
  });

  it("should data Consumption Create Reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    CreateConsumo.mockReturnValueOnce(Response);
    const response = CreateConsumo(createMock);
    expect(response.status).toBe(Response.status);
  });

  it("should delete a consumption", () => {
    const id = "654172b0960f11d1edd17c51"; //654172b0960f11d1edd17c51 consumo
    deleteConsumo.mockReturnValueOnce(FindOneMock);
    const response = deleteConsumo(id);
    expect(response._id).toBe(FindOneMock._id);
  });
  it("should delete a consumption reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    deleteConsumo.mockReturnValueOnce(Response);
    const response = deleteConsumo(FindOneMock);
    expect(response.status).toBe(Response.status);
  });
});
