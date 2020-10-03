import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class ComidaService {
  constructor(private storage: Storage) {
    //this.removeAll();
    //storage.set("comidas", [{ nome: "Pizza" }]);
    // Or to get a key/value pair
    //storage.get("comidas").then((val) => {
    //  console.log("Comidasss", val);
    // });
  }

  public async getAll() {
    let comidas = await this.storage.get("comidas");
    comidas = JSON.parse(comidas);
    return comidas;

    //return this.storage.get("comidas").then((comidas) => {

    //return Promise.resolve(comidas);
    // });
  }
  public async salvarComida(comida) {
    let comidas = await this.getAll();
    if (!comidas) {
      comidas = [];
    }
    comidas.push(comida);
    this.storage.set("comidas", JSON.stringify(comidas));
    // this.getAll().then((comidas) => {
    // comidas.push(comida);
    // console.log(comidas);
    // this.storage.set("comidas", comidas);
    // });
  }
  public async removeAll() {
    await this.storage.remove("comidas");
  }
  public async remove(key: number) {
    let comidas = await this.getAll();
    comidas.splice(key, 1);
    await this.storage.set("comidas", JSON.stringify(comidas));
  }
}
