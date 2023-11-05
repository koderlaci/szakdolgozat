import { Injectable } from '@angular/core';
import { ProductType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  mapStatusName(status: string) {
    switch (status) {
      case 'paid':
        return 'Kifizetve';
      case 'under preparation':
        return 'Összekészítés alatt';
      case 'under delivery':
        return 'Kiszállítás alatt';
      case 'ready to collect':
        return 'Átvételre kész';
      case 'completed':
        return 'Teljesített';
      default:
        return 'Kifizetve';
    }
  }

  mapDeliveryModeName(deliveryMode: string) {
    switch (deliveryMode) {
      case 'personal':
        return 'Személyes';
      case 'delivery':
        return 'Házhozszállítás';
      default:
        return 'Személyes';
    }
  }

  mapProductTypeName(type: ProductType | string) {
    switch (type) {
      case ProductType.MEN:
        return 'Férfi';
      case ProductType.WOMEN:
        return 'Női';
      case ProductType.ACCESSARY:
        return 'Kiegészítő';
      case 'men':
        return 'Férfi';
      case 'women':
        return 'Női';
      case 'accessary':
        return 'Kiegészítő';
      default:
        return 'Férfi';
    }
  }

  mapProductColorName(color: string) {
    switch (color) {
      case 'black':
        return 'fekete';
      case 'blue':
        return 'kék';
      case 'white':
        return 'fehér';
      case 'gray':
        return 'szürke';
      case 'pink':
        return 'rózsaszín';
      default:
        return 'fekete';
    }
  }
}
