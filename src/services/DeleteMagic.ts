import { getRepository } from 'typeorm';

import Magic from '../models/Magic';

interface Request {
  id: number;
}

class DeleteMagicService {
  public async execute({ id }: Request): Promise<true | number> {
    const magicRepository = getRepository(Magic);

    const user = await magicRepository.findOne({ where: { id } });

    if (!user) {
      return 1;
    }

    const response = await magicRepository.remove(user);
    
    if (response) {
      return true;
    }

    return 2;
  }
}

export default DeleteMagicService;
