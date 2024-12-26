import {reverseString} from "@/utils/common";

export function priceLabel(price: number): string {
    if(!price) return 'Prix Inconnu';

    const reversedPrice = reverseString(price.toString());
    let idx = 0;
    let result = '';
    for (let i = 0; i < reversedPrice.length; i++) {
        if (idx === 3) {
            result += ' '
            idx = 0;
        }
        result += reversedPrice[i].toString();
        idx++;
    }


    return reverseString(result)+' €';
}

export function floorLabel(floor: number): string {
    if(floor === null) {
        return "Étage inconnu";
    }

    if (floor <= 1) {
        switch (floor) {
            case 0:
                return 'Rez-de-Chaussé';
            case 1:
                return '1er Étage';
            default:
                return '';
        }
    }

    return `${floor}ème Étage`;
}

export function roomLabel(room: number): string {
    if(room === null) {
        return "Nombre de Pièce(s) inconnu";
    }

    if (room === 1) {
        return "1 Pièce"
    }

    return `${room} Pièces`
}