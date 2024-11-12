import { useParams } from "react-router-dom"

export function EditFlower() {
    //grabbing id from clicked flower
    let params = useParams()
    let id = params.id

    return (
        <>
            <p>edit flower</p>
            <p>{id}</p>
        </>

    )

}
