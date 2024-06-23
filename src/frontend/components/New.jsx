/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iKCSiazBBao
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import React from "react";

export  function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-gray-500 dark:text-gray-400">Browse our selection of products by category.</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Apparel"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Apparel</h3>
              <p className="text-sm leading-none">Discover the latest fashion trends.</p>
            </div>
          </div>
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Electronics"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/placeholder.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Electronics</h3>
              <p className="text-sm leading-none">Find the latest tech gadgets and devices.</p>
            </div>
          </div>
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Home & Garden"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/placeholder.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Home & Garden</h3>
              <p className="text-sm leading-none">Upgrade your living space with our home and garden products.</p>
            </div>
          </div>
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Sports & Outdoors"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/placeholder.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Sports & Outdoors</h3>
              <p className="text-sm leading-none">Gear up for your next adventure.</p>
            </div>
          </div>
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Beauty & Personal Care"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/placeholder.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Beauty & Personal Care</h3>
              <p className="text-sm leading-none">
                Pamper yourself with our selection of beauty and personal care products.
              </p>
            </div>
          </div>
          <div className="grid gap-4 relative group">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Toys & Games"
              className="rounded-lg object-cover w-full aspect-[1/1] group-hover:opacity-50 transition-opacity"
              height="450"
              src="/placeholder.svg"
              width="450"
            />
            <div className="grid gap-1">
              <h3 className="font-semibold">Toys & Games</h3>
              <p className="text-sm leading-none">Discover the perfect gifts for kids and families.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}