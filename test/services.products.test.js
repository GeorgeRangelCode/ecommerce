const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  getAllStub,
  createStub,
  mongoLibMock,
} = require("../utils/mocks/mongoLib");

const {
  productsMock,
  filteredProductsMock,
} = require("../utils/mocks/products");

describe("Services products", () => {
  const ProductsService = proxyquire("../services/products", {
    "../lib/mongo": mongoLibMock,
  });

  const productsService = new ProductsService();

  describe("when getProducts method is called", async () => {
    it("should call the getAll MongoLib method", async () => {
      await productsService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    it("should return an array of products", async function () {
      const result = await productsService.getProducts({});
      const expected = productsMock;
      assert.deepEqual(result, expected);
    });
  });

  describe("when getProducts method is called with tags", async function () {
    it("should all the getAll MongoLib method with tags args", async function () {
      await productsService.getProducts({ tags: ["expensive"] });
      const tagQuery = { tags: { $in: ["expensive"] } };

      assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
    });

    it("should return an array of products filtered by the tag", async function () {
      const result = await productsService.getProducts({ tags: ["expensive"] });
      const expected = filteredProductsMock("expensive");
      assert.deepEqual(result, expected);
    });
  });
});
