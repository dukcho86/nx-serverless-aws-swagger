import * as uuid from 'uuid';

import ManualRepository from '../repositories/ManualRepository';
import { ManualItem } from '../models/ManualItem';

export default class ManualService {
  manualRepository: ManualRepository;

  constructor(manualRepository: ManualRepository = new ManualRepository()) {
    this.manualRepository = manualRepository;
  }

  async getAllTodos(): Promise<ManualItem[]> {
    return this.manualRepository.getAllTodos();
  }

  async createTodo(name: string): Promise<ManualItem> {
    const id = uuid.v4();

    return await this.manualRepository.createTodo({
      id,
      name,
      done: false,
      createdAt: new Date().toISOString(),
    });
  }

  async updateTodo(partialTodo: Partial<ManualItem>) {
    return await this.manualRepository.updateTodo(partialTodo);
  }

  async deleteTodoById(id: string) {
    return await this.manualRepository.deleteTodoById(id);
  }
}
