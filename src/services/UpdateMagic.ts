import { getRepository } from 'typeorm';

import Magic from '../models/Magic';

interface Request {
  id: number;
  name: string; 
  qtd_mana: number;
  type: string;
}

class UpdateMagic {
  public async execute({ id, name, qtd_mana, type }: Request): Promise<Magic | number> {
    const cardRepository = getRepository(Magic);

    const card = await cardRepository.findOne({ where: { id } });

    if (!card) {
      return 1;
    }

    if (name !== card.name) {
      const nameExists = await cardRepository.findOne({ where: { name } });

      if (nameExists) {
        return 2;
      }
    }
    
    if (type) {
      card.type = type;
    }

    if (name) {
      card.name = name;
    }

    if (qtd_mana) {
      card.qtd_mana = qtd_mana;
    }

    const updatedCard = await cardRepository.save(card);

    if (!updatedCard) {
      return 3;
    }

    delete card.created_at
    delete card.updated_at

    return updatedCard;
  }
}

export default UpdateMagic;
