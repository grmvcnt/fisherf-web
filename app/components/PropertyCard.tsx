import {PropertyType} from "@/utils/types/property";
import {MouseEventHandler} from "react";
import {floorLabel, priceLabel, roomLabel} from "@/utils/formats/label";

export default function PropertyCard({data, onPropertyCardClick, isSelected}: {
    data: PropertyType,
    onPropertyCardClick: MouseEventHandler<HTMLDivElement>,
    isSelected: boolean,
}) {
    return (
        <div id={data.uuid} className={`${isSelected ? 'border-4' : 'border'} p-2 cursor-pointer`} onClick={(e) => onPropertyCardClick(e)}>
            <div>{roomLabel(data.room)}</div>
            <div>{floorLabel(data.floor)}</div>
            <div>{data.city.name}</div>
            <div>{priceLabel(data.price)}</div>
        </div>
    )
}