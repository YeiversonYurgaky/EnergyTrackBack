const { create } = require("../controllers/UsuariosController");
const UsuariosModels = require("../models/UsuariosModels");
const { FindOneUsername, CreateUser } = require("../repository/UserRepository");
const { Response } = require("../utils/Response");

jest.mock("../repository/UserRepository");

//para testear todos los consumos
const returnUsers = {
  status: 200,
  message: "Registros Encontrados",
  result: [
    {
      _id: "651dc5e8016dc5b14c0bdda5",
      password: "$2a$10$zRiVr9OjycUc/YcDWXF/4elHo7dJglBEAfrJKhfWQ/9rJ252KGP/W",
      nombres: "stiven",
      apellidos: "barajas",
      email: "brayan@gmail.com",
      usuario: "stiven",
    },
    {
      _id: "6507ac64016dc5badc0bd4ad",
      password: "$2a$10$qPeMksU6eH7952T1sChsBOEJSvNYGsoPl8YXCbq62WsUxix9GtOd2",
      nombres: "juan",
      apellidos: "quiroga",
      email: "mq137267@gmail.com",
      usuario: "quiroguin",
    },
    {
      _id: "65369802016dc5360d0bde9d",
      password: "$2a$10$YujMM0xWAx9ms16R9/3C1./bAfWW/YL1l3XTL6ySIsKhV5Jo4LwxG",
      nombres: "juan",
      apellidos: "quiroga",
      email: "mq137267@gmail.co",
      usuario: "juan",
    },
  ],
};

const FindOneMock = {
  _id: "651dc5e8016dc5b14c0bdda5",
  password: "$2a$10$zRiVr9OjycUc/YcDWXF/4elHo7dJglBEAfrJKhfWQ/9rJ252KGP/W",
  nombres: "stiven",
  apellidos: "barajas",
  email: "brayan@gmail.com",
  usuario: "stiven",
};

const createMock = {
  password: "123",
  nombres: "Amilkar",
  apellidos: "Hernandez",
  email: "amilkar@gmail.com",
  usuario: "amijotta",
};

describe("Test Users Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test de los registros/create user
  it("should data User Create", () => {
    CreateUser.mockReturnValueOnce(createMock);
    const response = CreateUser();
    expect(response).toBe(createMock);
  });

  it("should one only User", () => {
    const id = "652b1f8d83a99b07253f1fee";
    FindOneUsername.mockReturnValueOnce(FindOneMock);
    const response = FindOneUsername(id);
    expect(response._id).toBe(FindOneMock._id);
    expect(response).not.toBeNull();
  });

  it("should data User Create Reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    CreateUser.mockReturnValueOnce(Response);
    const response = CreateUser(createMock);
    expect(response.status).toBe(Response.status);
  });

  it("should data only user Reject", () => {
    Response.status = 500;
    Response.message = "Ocurrio un error en el servidor";
    FindOneUsername.mockReturnValueOnce(Response);
    const response = FindOneUsername(createMock);
    expect(response.status).toBe(Response.status);
  });
});
