import React from "react";
import OfferList from "./OfferList";
import { Price } from "@/types/price";
import PaddleCheckout from "@/components/Pricing/PaddleCheckout";
import Modal from "@/components/Pricing/Modal";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN;
const SUBSCRIPTIONS_URL = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL || '';

const PricingBox = ({ product }: { product: Price }) => {

  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div
        className="relative mb-10 overflow-hidden rounded-xl bg-white px-8 py-10 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-14"
        data-wow-delay=".1s"
      >
        {product.id === "PRO_PLUS" && (
          <p className="absolute right-[-50px] top-[60px] inline-block -rotate-90 rounded-bl-md rounded-tl-md bg-primary px-5 py-2 text-base font-medium text-white">
            Recommended
          </p>
        )}
        <span className="mb-5 block text-xl font-medium text-dark dark:text-white">
          {product.nickname}
        </span>
        <h2 className="mb-11 text-4xl font-semibold text-dark dark:text-white xl:text-[42px] xl:leading-[1.21]">
          <span className="-ml-1 -tracking-[2px] text-body-color dark:text-dark-6">
            <del>{product.original_amount}</del>
            {" "}
          </span>
          <span className="-ml-1 -tracking-[2px]">
            {product.unit_amount.toLocaleString("en-US", {
              currency: "USD"
            })}
          </span>
          <span className="text-xl font-medium">$ </span>
          <span className="text-base font-normal text-body-color dark:text-dark-6">
            {" "}
            {product.periode}
          </span><br />
          {product.remark ? <span
            className="bg-body-color m-0 inline-block rounded border border-transparent py-1 px-2.5 text-sm font-medium text-white">
             {product.remark}
          </span> : <><div><br/></div><div></div></>}
        </h2>

        <div className="mb-[50px]">
          <h3 className="mb-5 text-lg font-medium text-dark dark:text-white">
            Features
          </h3>
          <div className="mb-10">
            <ul className="space-y-3">
              {product?.offers.map((offer, i) => (
                <OfferList key={i} text={offer} included={true} />
              ))}
              {product?.notIncluded?.map((notIncluded, i) => (
                <OfferList key={i} text={notIncluded} included={false} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full">
          {
            product.productIds
              ?
              <PaddleCheckout productIds={product.productIds} paddleToken={PADDLE_TOKEN} />
              :
              <Modal SUBSCRIPTION_URL={SUBSCRIPTIONS_URL}/>
          }
        </div>
      </div>
    </div>
  );
};

export default PricingBox;
