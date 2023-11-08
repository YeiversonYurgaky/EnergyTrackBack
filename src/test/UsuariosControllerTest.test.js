const { FindOneUsername, CreateUser } = require("../repository/UserRepository");
const { Response } = require("../utils/Response");
const { mockRequest, mockResponse } = require("../test/mocks/mocks");
const { create, login } = require("../controllers/UsuariosController");

jest.mock("../repository/UserRepository");
const bcrypt = require("bcrypt-nodejs");

const createMock = {
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
  ],
};

const CreateUserMock = {
  status: 201,
  message: "Se ha creado el Usuario Correctamente",
  result: {
    _id: "65495a877db6fd05da1c7193",
    nombres: "jest",
    apellidos: "jest",
    email: "jest@gmail.1com",
    usuario: "jest",
    password: "$2a$10$hZpp2AFtvI.04KR9QEmCH.RsrdhE5M.aM2cvXRuNfF8.0LKr5v85S",
    __v: 0,
  },
};

describe("Test Users Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should if fields are missing", async () => {
    let req = mockRequest({}); // Simula que faltan campos en la solicitud
    const res = mockResponse();
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Todos los campos son requeridos",
    });
  });

  // it("should create user", async () => {
  //   const req = mockRequest();
  //   const res = mockResponse();
  //   CreateUser.mockReturnValueOnce(CreateUserMock);

  //   await create(req, res);
  //   expect(create).toHaveBeenCalledWith(CreateUserMock);
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.send).toHaveBeenCalledWith(CreateUserMock);
  // });
  it("should create fail user", async () => {
    const req = mockRequest();
    req.params.password = "123";
    req.params.nombres = "stiven";
    req.params.apellidos = "barajas";
    req.params.email = "brayan@gmail.com";
    req.params.usuario = "stiven";

    const res = mockResponse();

    Response.message = createMock.message;
    Response.status = createMock.status;
    Response.result = createMock.result;

    CreateUser.mockReturnValueOnce(createMock);

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
