import axios from "axios"

export const CoursePayment = async (productId) => {
    
  const response = await axios.get("/checkout/ssl", {
      params: {
        productId: productId,
        type: "course_payment",
      },
  });
    return response;
}
