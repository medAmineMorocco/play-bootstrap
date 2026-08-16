"use client";

import { useEffect, useState } from "react";

type PaddleEvent = Record<string, unknown>;

type PaddleApi = {
  Environment?: {
    set: (environment: "sandbox") => void;
  };
  Initialize?: (options: {
    token: string;
    eventCallback?: (response: PaddleEvent) => void;
  }) => void;
  Checkout?: {
    open: (options: {
      items: Array<{ priceId: string; quantity: number }>;
    }) => void;
  };
};

type LoadedPaddleApi = PaddleApi & {
  Initialize: NonNullable<PaddleApi["Initialize"]>;
  Checkout: NonNullable<PaddleApi["Checkout"]>;
};

declare global {
  interface Window {
    Paddle?: PaddleApi;
  }
}

let paddleInitialization: Promise<LoadedPaddleApi> | undefined;

function waitForPaddle(isSandbox: boolean): Promise<LoadedPaddleApi> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      const paddle = window.Paddle;
      const environmentReady = !isSandbox || Boolean(paddle?.Environment?.set);

      if (paddle?.Initialize && paddle.Checkout?.open && environmentReady) {
        resolve(paddle as LoadedPaddleApi);
        return;
      }

      if (Date.now() - startedAt >= 10_000) {
        reject(new Error("Paddle.js did not finish loading."));
        return;
      }

      window.setTimeout(check, 100);
    };

    check();
  });
}

function initializePaddle(token: string): Promise<LoadedPaddleApi> {
  if (paddleInitialization) return paddleInitialization;

  paddleInitialization = waitForPaddle(token.startsWith("test_")).then(
    (paddle) => {
      if (token.startsWith("test_")) {
        paddle.Environment?.set("sandbox");
      }

      paddle.Initialize({ token });
      return paddle;
    },
  );

  return paddleInitialization;
}

const PaddleCheckout = ({
  productIds,
  paddleToken,
}: {
  productIds: string[];
  paddleToken: string | undefined;
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    if (!paddleToken) {
      console.error("NEXT_PUBLIC_PADDLE_TOKEN is not configured.");
      return () => {
        active = false;
      };
    }

    initializePaddle(paddleToken)
      .then(() => {
        if (active) setIsReady(true);
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize Paddle checkout.", error);
      });

    return () => {
      active = false;
    };
  }, [paddleToken]);

  const openCheckout = async () => {
    if (!paddleToken) return;

    try {
      const paddle = await initializePaddle(paddleToken);
      paddle.Checkout.open({
        items: productIds.map((priceId) => ({ priceId, quantity: 1 })),
      });
    } catch (error) {
      console.error("Unable to open Paddle checkout.", error);
    }
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={!isReady}
      aria-busy={!isReady}
      className="inline-block rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60"
    >
      {isReady ? "Purchase Now" : "Loading checkout…"}
    </button>
  );
};

export default PaddleCheckout;
