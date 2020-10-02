import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(
    private storage: Storage,
  ) {

    //storage.set("comidas", [{ nome: "Pizza" }]);

    // Or to get a key/value pair
    //storage.get("comidas").then((val) => {
    //  console.log("Comidasss", val);
    // });

  }


  public salvarComida(comida) {
    //console.log(">>>>>>>>", comida);
    this.getAll().then(comidas => {
      this.storage.set("comidas", comidas.push(comida));
      //console.log(comidas, 'comidas');
    });

  }
  public getAll() {
    return this.storage.get("comidas").then((comidas) => {
      if (!comidas) {
        return [];
      }
      return !comidas.isArray ? [] : comidas;
    });
  }
}
