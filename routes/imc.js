var express = require("express");
var router = express.Router();

function calcularImc(dados) {
  let imc = dados.weight / dados.height ** 2;

  dados.imc = Number(imc.toFixed(2));
}

function descricaoImc(dados) {
  dados.imcDescription = "obesidade";

  if (dados.imc < 18.5) dados.imcDescription = "magreza";
  if (dados.imc >= 18.5 && dados.imc < 24.9) dados.imcDescription = "normal";
  if (dados.imc >= 24.9 && dados.imc < 30) dados.imcDescription = "sobrepeso";
}

router.post("/", function (req, res, next) {
  const { height, weight } = req.body;

  let dados = { height, weight };

  calcularImc(dados);
  descricaoImc(dados);

  res.status(200);

  res.send(dados);
});

module.exports = router;
