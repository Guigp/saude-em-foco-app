const dengue = [
  { symptom: "Maior que 39 graus" },
  { symptom: "Dor de cabeça" },
  { symptom: "Manchas vermelhas no corpo" },
  { symptom: "Dor articular moderada" },
  { symptom: "Dor muscular forte" },
  { symptom: "Dor atrás dos olhos" },
  { symptom: "Cansaço" },
  { symptom: "Sangramento" },
  { symptom: "Vômito" },
  { symptom: "Inchaço articular moderado" },
  { symptom: "Glânglios linfáticos aumentados" }
];

const zika = [
  { symptom: "Menor que 39 graus" },
  { symptom: "Dor de cabeça" },
  { symptom: "Manchas vermelhas no corpo" },
  { symptom: "Dor articular moderada" },
  { symptom: "Dor muscular moderada" },
  { symptom: "Cansaço" },
  { symptom: "Conjuntivite" },
  { symptom: "Fotofobia" },
  { symptom: "Vômito" },
  { symptom: "Inchaço articular moderado" },
  { symptom: "Glânglios linfáticos aumentados" }
];

const chikungunya = [
  { symptom: "Maior que 39 graus" },
  { symptom: "Dor de cabeça" },
  { symptom: "Manchas vermelhas no corpo" },
  { symptom: "Dor articular forte" },
  { symptom: "Dor muscular moderada" },
  { symptom: "Conjuntivite" },
  { symptom: "Inchaço articular forte" },
  { symptom: "Glânglios linfáticos aumentados" }
];

verifica_sintomas = userAnswer => {
  //sintoma não presente na lista principal mas também possível
  switch (userAnswer) {
    case "Dor articular forte":
      cont_dengue++;
      cont_zika++;
      break;

    case "Inchaço articular forte":
      cont_dengue++;
      cont_zika++;
      break;

    case "Dor articular moderada":
      cont_dengue++;
      cont_chiku++;
      break;

    case "Dor muscular forte":
      cont_zika++;
      cont_chiku++;
      break;

    case "Inchaço articular moderado":
      cont_chiku++;
      break;
  }

  for (var i = 0; i < dengue.length; i++) {
    if (dengue[i].symptom == userAnswer) {
      if (
        userAnswer == "Maior que 39 graus" ||
        userAnswer == "Dor muscular forte"
      )
        //principal sintoma tem peso maior
        cont_dengue = cont_dengue + 2;
      else cont_dengue++;
    }
  }

  for (var a = 0; a < zika.length; a++) {
    if (zika[a].symptom == userAnswer) {
      if (userAnswer == "Manchas vermelhas no corpo")
        //principal sintoma tem peso maior
        cont_zika = cont_zika + 2;
      else cont_zika++;
    }
  }

  for (var b = 0; b < chikungunya.length; b++) {
    if (chikungunya[b].symptom == userAnswer) {
      if (
        userAnswer == "Maior que 39 graus" ||
        userAnswer == "Dor articular forte"
      )
        //principal sintoma tem peso maior
        cont_chiku = cont_chiku + 2;
      else cont_chiku++;
    }
  }
};

doencas_provaveis = () => {
  var dengue = {
    nome: "dengue",
    Valor: cont_dengue
  };
  var zika = {
    nome: "zika",
    Valor: cont_zika
  };
  var chikungunya = {
    nome: "chikungunya",
    Valor: cont_chiku
  };

  const array = [cont_dengue, cont_zika, cont_chiku];
  var max = array.reduce((a, b) => {
    return Math.max(a, b);
  });

  if (cont_dengue === max) maior.push(dengue);
  if (zika === max) maior.push(zika);
  if (cont_chiku === max) maior.push(chikungunya);
};

export const teste_sintomas = userAnswers => {
  maior = [];
  cont_dengue = 0;
  cont_zika = 0;
  cont_chiku = 0;
  userAnswers[0].segmentedQuestions.forEach(element => {
    verifica_sintomas(element.answer);
  });
  userAnswers[1].toggleQuestions.forEach(element => {
    if (element.answer != false) verifica_sintomas(element.question);
  });

  doencas_provaveis();
  return maior;
};
