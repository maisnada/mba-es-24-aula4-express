var express = require("express");
var router = express.Router();

function calcularImc(dados) {
  let imc = dados.peso / dados.altura ** 2;

  dados.imc = Number(imc.toFixed(2));
}

function descricaoImc(dados) {
  dados.descricao = "obesidade";

  if (dados.imc < 18.5) dados.descricao = "magreza";
  if (dados.imc >= 18.5 && dados.imc < 24.9) dados.descricao = "normal";
  if (dados.imc >= 24.9 && dados.imc < 30) dados.descricao = "sobrepeso";
}

router.post("/", function (req, res, next) {
  const { altura, peso } = req.body;

  let dados = { altura, peso };

  calcularImc(dados);
  descricaoImc(dados);

  res.status(200);

  res.send(dados);
});

module.exports = router;
