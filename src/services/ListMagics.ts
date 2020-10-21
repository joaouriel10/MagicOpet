import { getRepository } from 'typeorm';

import Magic from '../models/Magic';

class ListMagic {
  public async execute(): Promise<Magic[] | false> {
    const magicRepository = getRepository(Magic);

    const cards = await magicRepository.find();

    if (!cards) {
      return false;
    }

    cards.forEach(function (card) {
      delete card.created_at
      delete card.updated_at
    })

    return cards;
  }
}

export default ListMagic;
