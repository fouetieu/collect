import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {

  constructor() {}

  public async setItem(key, value): Promise<void>{
    value = JSON.stringify(value);
    await Preferences.set({key : key, value: value});
  }

  public async getItem<T>(key: string): Promise<T> {
    const item = await Preferences.get({ key: key });
    return item ? JSON.parse(item.value) as T : null;
  }

  async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }

  public async clear():Promise<void> {
    await Preferences.clear();
  }

  public async keys():Promise<any> {
    const keys = await Preferences.keys();
    return keys;
  }
}
