import { useParams } from "react-router-dom"
import { useEffect } from "react"
const ProductSingle = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>ProductSingle</div>
  )
}
export default ProductSingle