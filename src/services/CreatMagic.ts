import { getRepository } from 'typeorm';

import Magic from '../models/Magic';

interface Request {
  name: string; 
  qtd_mana: number;
  type: string;
}

class CreateUserService {
  public async execute({ name, qtd_mana, type }: Request): Promise<Magic | false> {
    const magicRepository = getRepository(Magic);

    const checkCardExists = await magicRepository.findOne({ where: { name } });

    if (checkCardExists) {
      return false
    }

    if (type !== 'Magia' && type !== 'Criatura') {
      return false;
    }

    const card = magicRepository.create({ name, qtd_mana, type });

    await magicRepository.save(card);

    delete card.created_at
    delete card.updated_at

    return card;
  }
}

export default CreateUserService;
