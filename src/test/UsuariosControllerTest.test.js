const { CreateUser, FindOneUsername } = require("../repository/UserRepository");
const UserModel = require("../models/UsuariosModels");
const { create, login } = require("../controllers/UsuariosController");
const { mockRequest, mockResponse } = require("../test/mocks/mocks");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../utils/jwt");
const jwtsimple = require("jwt-simple");
const moment = require("moment");
const { createToken, verifyToken } = require("../utils/jwt");

jest.mock("../../node_modules/bcrypt-nodejs");
jest.mock("../repository/UserRepository");
jest.mock("../models/UsuariosModels", () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});

describe("Test Users Controller", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  it("should return 404 if required fields are missing", async () => {
    req.body = { nombres: "stiven" }; // Not all required fields are provided
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Todos los campos son requeridos",
    });
  });

  it("should create user and return 200 status on success", async () => {
    // Mock bcrypt hash to resolve with a fake hash
    bcrypt.hash.mockImplementation(
      (password, saltOrRounds, options, callback) => {
        callback(null, "hashedpassword");
      }
    );

    req.body = {
      nombres: "stiven",
      apellidos: "barajas",
      usuario: "stiven",
      password: "123",
      email: "brayan@gmail.com",
    };

    // Mock CreateUser to simulate successful user creation
    CreateUser.mockResolvedValue({
      status: 200,
      message: "User created successfully",
    });

    await create(req, res);

    expect(UserModel).toHaveBeenCalledTimes(1); // UserModel constructor should be called
    expect(CreateUser).toHaveBeenCalledWith(expect.any(Object)); // CreateUser should be called with a user object
    expect(res.status).toHaveBeenCalledWith(200); // Expect a 200 status code
    expect(res.send).toHaveBeenCalledWith({
      status: 200,
      message: "User created successfully",
    });
  });
});

describe("Test Login Controller", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  it("should return 404 if username or password is missing", async () => {
    req.body = { usuario: "stiven" }; // Password is missing
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Por favor, proporcione un usuario y una contraseña.",
    });
  });

  it("should return 200 if username and password are correct", async () => {
    req.body = {
      usuario: "stiven",
      password: "123",
    };

    // Mock FindOneUsername to simulate finding a user
    const mockUser = { result: { password: "hashedpassword" } };
    FindOneUsername.mockResolvedValue(mockUser);

    // Mock bcrypt compare to simulate a successful password match
    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, true); // The 'true' signifies a successful match
    });

    // Mock createToken using jest.spyOn
    const createTokenMock = jest.spyOn(jwt, "createToken");
    createTokenMock.mockReturnValue("fakeToken");

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "el usuario se encuentra logueado",
      token: "fakeToken",
    });

    // Restaurar la implementación original después de la prueba
    createTokenMock.mockRestore();
  });

  it("should return 404 if username is correct but password is incorrect", async () => {
    req.body = {
      usuario: "stiven",
      password: "incorrectpassword",
    };

    const mockUser = { result: { password: "hashedpassword" } };
    FindOneUsername.mockResolvedValue(mockUser);

    // Mock bcrypt compare to simulate an unsuccessful password match
    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, false); // The 'false' signifies a failed match
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Usuario o contraseña Invalida",
    });
  });

  it("should return 404 if username does not exist", async () => {
    req.body = {
      usuario: "nonexistentuser",
      password: "123",
    };

    // Simulate user not found
    FindOneUsername.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Usuario o contraseña Invalida",
    });
  });
});

describe("JWT Functions", () => {
  const mockUser = {
    _id: "fakeUserId",
    nombres: "John",
    apellidos: "Doe",
    email: "john.doe@example.com",
  };

  it("should create a valid token", () => {
    const token = createToken(mockUser);

    // Decode the token to inspect its contents
    const decodedToken = jwtsimple.decode(
      token,
      "VWP&q6gAt3W!84k3k^bMxuySWwywU$36",
      "HS256"
    );

    // Ensure that the decoded token has the expected properties
    expect(decodedToken.sub).toBe(mockUser._id);
    expect(decodedToken.nombres).toBe(mockUser.nombres);
    expect(decodedToken.apellidos).toBe(mockUser.apellidos);
    expect(decodedToken.email).toBe(mockUser.email);
    expect(decodedToken.role).toBe("admin");
    expect(decodedToken.iat).toBeDefined();
    expect(decodedToken.exp).toBeDefined();
  });

  it("should verify a valid token", () => {
    // Create a token to be verified
    const token = createToken(mockUser);

    // Verify the token
    const verifiedUser = verifyToken(token);

    // Ensure that the verified user has the expected properties
    expect(verifiedUser.sub).toBe(mockUser._id);
    expect(verifiedUser.nombres).toBe(mockUser.nombres);
    expect(verifiedUser.apellidos).toBe(mockUser.apellidos);
    expect(verifiedUser.email).toBe(mockUser.email);
    expect(verifiedUser.role).toBe("admin");
  });

  it("should throw an error for an invalid token", () => {
    // Create an intentionally invalid token
    const invalidToken = "invalid.token.string";

    // Attempt to verify the invalid token
    expect(() => {
      verifyToken(invalidToken);
    }).toThrowError("Unexpected token � in JSON at position 0"); // Ajusta esto según el mensaje de error real de tu aplicación
  });
});
