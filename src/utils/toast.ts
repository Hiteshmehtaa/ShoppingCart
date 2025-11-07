import toast from "react-hot-toast";

export const notifyAdd = () =>
  toast.success("Added to cart!", { style: { borderRadius: "8px" } });

export const notifyRemove = () =>
  toast.error("Removed from cart", { style: { borderRadius: "8px" } });

export const notifyCheckout = () =>
  toast.success("Order placed successfully!", {
    style: { borderRadius: "8px" },
  });
