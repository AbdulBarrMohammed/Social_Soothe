import { Link } from "react-router-dom"
import { useState } from "react"



export function Flower ({flower}) {



    return (
        <>
            <Link to={`/selectedFlower/${flower.id}`} >
                <div className={`flex items-center justify-center absolute rounded-full h-7 w-7 shadow-md`}
                    style={{
                        backgroundColor: flower.color,
                        left: `${flower.x}px`, // Use pixels or a specific unit as needed
                        top: `${flower.y}px`,  // Use pixels or a specific unit as needed
                    }}

                >

                </div>
            </Link>

        </>
    )
}
