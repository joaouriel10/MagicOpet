import { Router } from 'express';

import CreateMagic from './services/CreatMagic';

import ListMagics from './services/ListMagics';

import UpdateMagic from './services/UpdateMagic';

const routes = Router();

routes.post('/create-card', async (request, response) => {
  const { name, qtd_mana, type } = request.body;

  const createMagic = new CreateMagic();

  const card = await createMagic.execute({ name, qtd_mana, type });

  if (!card) {
    return response.status(400).json({status: "false", message: "Não foi possivel criar sua carta de Magic."});
  }

  return response.status(201).json({status: "success", card});
});

routes.get('/list-card', async (request, response) => {
  const listMagics = new ListMagics();

  const cards = await listMagics.execute();

  if (!cards) {
    return response.status(400).json({status: 'false',  message: "Erro ao encontrar todas as cartas."})
  }

  return response.status(200).json({status: 'success', cards});
});

routes.put('/update-card', async (request, response) => {
  const { id, name, qtd_mana, type } = request.body;
  
  if (!id) {
    return response.status(400).json({status: 'false',  message: "Favor enviar id para ajuste."})
  }
  if(type) {
    if (type !== 'Magia' && type !== 'Criatura') {
      return response.status(400).json({status: 'false',  message: "Tipo de Carta invalido."})
    }
  }
  
  if (!name && !qtd_mana && !type) {
    return response.status(400).json({status: 'false',  message: "Favor enviar algum campo para ajuste."})
  }

  const updateMagic = new UpdateMagic();

  const updatedCard = await updateMagic.execute({ id, name, qtd_mana, type });

  if (updatedCard == 1) {
    return response.status(400).json({status: 'false',  message: "Id não encontrado."})
  }

  return response.status(200).json({status: 'success', updatedCard});
});


export default routes;
