import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemContent.module.css';

/* Import สีและไอคอนตามประเภทของโปเกม่อน */
import { typeColors, typeIcon } from '../../function/TypePoke'

const ItemContent = memo(({ value }) => {
    /* ใช้เช็คว่าเอาเมาส์มาวางไว้Itemไหม ถ้าวางก็ให้ */
    const [hoverItem, setHoverItem] = useState(false)
    /* ดึงข้อมูลที่เก็บไว้ใน brower storage หรือ sessionStaorage */
    const storageLikePoke = new Map(JSON.parse(sessionStorage.getItem('favPoke'))) || false
    /* ดึงข้อมูลจำนวนตัวโปเกมม่อนที่เก็บไว้ใน sessionStorage storage */
    const likePoke = storageLikePoke.get(value.name) ? true : false

    /* ใช้กับปุ่มหัวใจเพื่อกดชอบ */
    const addLikePoke = (name, id) => {
        /* โค้ดสำหรับเปลี่ยนแปลงค่าใน sessionstorage ซึ่งเราใช้Object Map */
        const storageFavPokeJSON = sessionStorage.getItem('favPoke');
        const storageFavPoke = storageFavPokeJSON ? new Map(JSON.parse(storageFavPokeJSON)) : new Map();
        if (storageFavPoke.get(name)) { return }
        else {
            storageFavPoke.set(name, id)
            const storageFavPokeUpdate = JSON.stringify(Array.from(storageFavPoke))
            sessionStorage.setItem('favPoke', storageFavPokeUpdate)
            console.log(storageFavPoke);
        }
    }
    /* ใช้กับปุ่มหัวใจ ฟังก์ชั่นสำหรับลบข้อมูลโปเกม่อนที่ชอบ */
    const removeLikePoke = (name) => {
        /* โค้ดสำหรับเปลี่ยนแปลงค่าใน sessionstorage */
        const storageFavPokeJSON = sessionStorage.getItem('favPoke');
        const storageFavPoke = storageFavPokeJSON ? new Map(JSON.parse(storageFavPokeJSON)) : new Map();

        if (storageFavPoke.get(name)) {
            storageFavPoke.delete(name)
            const storageFavPokeUpdate = JSON.stringify(Array.from(storageFavPoke))
            sessionStorage.setItem('favPoke', storageFavPokeUpdate)
            console.log(new Map(JSON.parse(sessionStorage.getItem('favPoke'))))
        }
        else {
            console.log("ไม่มีPokemonที่จะลบ")
        }
    }
    const itemCards = document.querySelectorAll('.items'); /* get element items มาใช้ */

    if (itemCards.length > 0 && itemCards) { // ตรวจสอบว่ามี elements ที่ตรงตามเงื่อนไขหรือไม่
        itemCards.forEach(card => {
            card.addEventListener('mouseover', () => {
                // เล็กกว่านี้เป็นมือถือหรือแท็บเล็ต hover ไม่ได้ เลยไม่ใส่ filter สีซีด
                if (window.innerWidth >= 1171) {
                    card.style.filter = 'grayscale(0)';
                }
            })
        })
        itemCards.forEach(card => {
            card.addEventListener('mouseout', () => {
                if (window.innerWidth >= 1171) {
                    card.style.filter = 'grayscale(0.44)';
                }
            })
        })
    }
    return (
        <>
            <div
                className={`${styles.item} items`}
                style={{
                    outline: hoverItem && `2px solid ${typeColors[value?.types[0]?.type?.name]}`,
                    boxShadow: hoverItem && `1px 1px 10px ${typeColors[value?.types[0]?.type?.name]}, 0 0 30px ${typeColors[value?.types[0]?.type?.name]}`,
                    borderBottom: hoverItem && `.14rem solid ${typeColors[value?.types[0]?.type?.name]}`
                }}
                /* เปลี่ยนแปลงตค่า HoverItem เมื่อเอาเมาส์มาวางหรือเลิกวาง */
                onMouseOver={() => setHoverItem(true)}
                onMouseOut={() => setHoverItem(false)}
            >
                {
                    /* ถ้าuserได้กดชอบโปเกม่อน หัวใจก็จะเป็นสีแดง */
                    likePoke
                        ? <div className={`${styles.heart_bg} ${styles.like}`} onClick={() => removeLikePoke(value?.name)}></div>
                        : <div className={styles.heart_bg} onClick={() => addLikePoke(value?.name, value?.id)}></div>
                }
                <img
                    src={
                        value?.sprites?.other["official-artwork"]?.front_default ?
                            value?.sprites?.other["official-artwork"]?.front_default
                            : value?.sprites?.other?.home?.front_default
                            || value?.sprites?.front_default
                            || 'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg'
                    }
                    className='image_items' />
                <h3>Name: {value?.name}</h3>
                <ul className={styles.types_poke}>
                    {value?.types?.map((skill, index) => (
                        <li
                            key={index}
                            style={{ backgroundColor: typeColors[skill?.type.name] }}
                            className={styles.type}>
                            {typeIcon[skill?.type.name]}
                            <p>
                                {skill?.type.name}
                            </p>
                        </li>
                    ))}
                </ul>
                {/* ปุ่มไปยังหน้าข้อมูลแบบละเอียดของโปเกม่อน */}
                <Link to={'/pokemon/' + value?.id}>
                    <button
                        className={styles.button_29}
                        role="button"
                    >Detail</button>
                </Link>
            </div>
        </>
    )
})

export default ItemContent
