import { useState } from "react"
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        })
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-1 border-0 justify-start"
                type='button'
            >
                {isOpen && (
                    <ChevronDown />
                )}
                {!isOpen && (
                    <ChevronUp />
                )}
                <span>{name}</span>
                <span>{props?.length}</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <div>
                            <label>Name</label>
                            <input
                                type='text'
                                placeholder="Size name"
                                value={size.name}
                                onChange={ev => editProp(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra Price</label>
                            <input
                                type='text'
                                placeholder="Extra price"
                                value={size.price}
                                onChange={ev => editProp(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button type='button'
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2 px-2"
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={addProps}
                    className="bg-white items-center"
                >
                    <Plus />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}
