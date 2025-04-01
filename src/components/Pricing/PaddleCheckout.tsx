"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const PaddleCheckout = ({ productIds, paddleToken }: { productIds: string[], paddleToken: string | undefined }) => {
  useEffect(() => {
    const loadPaddle = () => {
      if (paddleToken && paddleToken.startsWith("test")) {
        window.Paddle.Environment.set("sandbox");
      }
        window.Paddle.Initialize({
          token: paddleToken,
          eventCallback: function(response: any) {
            if (paddleToken && paddleToken.startsWith("test")) {
              console.log('response', response);
            }
          }
        });
    };

    loadPaddle();
  }, [paddleToken]);

  const openCheckout = () => {
    let itemsList = productIds.map(value => {
      return {
        priceId: value,
        quantity: 1
      }
    });

    window.Paddle.Checkout.open({
      items: itemsList,
    });
  };

  return (
    <button
      onClick={openCheckout}
      className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90"
    >
      Purchase Now
    </button>
  );
};

export default PaddleCheckout;
