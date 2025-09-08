import { Item, NewItem } from '../types/Item';
const CONTENT = "todos";

//const API_BASE = ''; 
export const itemsApi = {
  getAll: async (content: string): Promise<Item[]> => {
    const response = await fetch(`/api/todos/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: "",
    });
    if (!response.ok) {
      throw new Error('Failed to create item');
    }    
    const json = await response.json();
    let dataValue = {};
    const newItems = [];
    json.data.forEach((element) => {
      console.log(element.data);
      try{
        dataValue = JSON.parse(element.data);
        element.data = dataValue;
      }catch(e){
        console.error(e);
      }
      newItems.push(element);
    });    
    console.log(newItems);    
    return newItems;
  },

  getById: async (id: number): Promise<Item> => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item');
    }
    return response.json();
  },

  create: async (item: NewItem): Promise<Item> => {
    console.log(item);
    const response = await fetch("/api/todos/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to create item');
    }

    return response.json();
  },

  update: async (id: number, item: Partial<NewItem>): Promise<Item> => {
    item.id = id;
    const response = await fetch(`/api/todos/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to update item');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const item = { id: id }
    const response = await fetch(`/api/todos/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
  },
};