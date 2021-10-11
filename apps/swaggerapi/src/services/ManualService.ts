import * as uuid from 'uuid';

import ManualRepository from '../repositories/ManualRepository';
import { ManualItem } from '../models/ManualItem';

export default class ManualService {
  manualRepository: ManualRepository;

  constructor(manualRepository: ManualRepository = new ManualRepository()) {
    this.manualRepository = manualRepository;
  }

  async getAllManuals(): Promise<ManualItem[]> {
    return this.manualRepository.getAllManuals();
  }

  async createManual(
    slug: string,
    title: string,
    description: string,
    video: string,
    image: string
  ): Promise<ManualItem> {
    const id = uuid.v4();

    return await this.manualRepository.createManual({
      id,
      slug,
      title,
      description,
      video,
      image,
      createdAt: new Date().toISOString(),
    });
  }

  async updateManual(partialManual: Partial<ManualItem>) {
    return await this.manualRepository.updateManual(partialManual);
  }

  async deleteManualById(id: string) {
    return await this.manualRepository.deleteManualById(id);
  }
}
