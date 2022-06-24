const createHttpError = require("http-errors");
const { response } = require("../helper/common");
const productModel = require("../models/products");
const client = require('../config/redis')

let products = [
  {
    id: 1,
    name: "baju",
    price: 0,
    stock: 0,
  },
];

const insert = async(req, res) => {
  try {
    
 console.log(req.get('host'));
  // console.log(req.file);
  const { name, price, description, stock, id_category } = req.body;

  const data = { 
    name, 
    price, 
    description, 
    stock, 
    id_category,
    photo: `http://${req.get('host')}/img/${req.file.filename}`
  };
  await productModel.create(data)
  response(res, data, 201, 'berhasil di tambahkan')
} catch (error) {
  console.log(error);  
  next(new createHttpError.InternalServerError())
}
};

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {rows:[product]} = await productModel.getProductById(id);
    // client.setEx(`product/${id}`, 60*60, JSON.stringify(product))
    
    response(res, product, 200, 'get data dari database')
  } catch (error) {
    console.log(error);
  }

  //   http::/localhost:4000/product/2
};

const update = (req, res) => {
  const { name, price, stock } = req.body;
  const id = req.params.id;

  products = products.map((item) => {
    if (item.id === id) {
      const result = {
        id,
        name,
        price,
        stock,
      };
      return result;
    } else {
      return item;
    }
  });
  res.json({
    message: "data berhasil di update",
  });
};
const deleteProduct = (req, res) => {
  const id = req.params.idproduct;
  productModel.deleteProductById(id)
  res.json({
    message: "data berhasil di update",
  });
};
const getProduct = async(req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const offset = (page - 1) * limit
  const {rows} = await productModel.getProduct({limit, offset});
  const { rows: [count] } = await productModel.countProduct()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }
    response(res, rows, 200, 'get data dari database', pagination)
};

module.exports = {
  getProduct,
  delete: deleteProduct,
  update,
  insert,
  detailProduct,
};
