import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markAsFinished(id: string): Promise<ReadingListItem> {
    this.storage.update((list) => {
      return list.map((item) => {
        if (item.bookId === id) {
          item.finished = !item.finished;
          item.finishedDate = this.getFullDate() 
        }
        return item;
      });
    });
    const updatedList = await this.storage.read();
    return updatedList.find((item) => item.bookId === id);
  }

  getFullDate() {
    const currentDate = new Date();
    const isoString = currentDate.toISOString();
    return isoString;
  }
}