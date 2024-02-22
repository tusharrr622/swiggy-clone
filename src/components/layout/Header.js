"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AppProvider, CartContext } from "@/components/AppContext";
import { useSession, signOut } from 'next-auth/react';
import ShoppingCart from '../icons/ShoppingCart';


function AuthLinks({ status, userName, image }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap hover:text-gray-600 text-gray-500">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Sign Out
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'} className='text-gray-500 hover:text-gray-600'>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  let userImage = userData?.image;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <div className="flex flex-wrap place-items-center">
      <section className="relative mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between text-white w-full md:w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <Link href="/">
              <Image className="h-9" src="/swiggy.avif" alt="logo" width={80} height={100} />
            </Link>
            {/* Nav Links */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <Link className="hover:text-gray-600 text-gray-500" href='/'>Home</Link>
              <Link className="hover:text-gray-600 text-gray-500" href={'/menu'}>Menu</Link>
              <Link className='hover:text-gray-600 text-gray-500' href={'/#about'}>About</Link>
              <Link className='hover:text-gray-600 text-gray-500' href={'/#contact'}>Contact</Link>
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex items-center space-x-5 items-center">
              <AuthLinks status={status} userName={userName} image={userImage} />
              <Link href={'/cart'} className="relative">
                <ShoppingCart />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                    {cartProducts.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          {/* Responsive navbar */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="block md:hidden text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
            <Link href={'/cart'} className="relative ml-4">
              <ShoppingCart />
              {cartProducts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
        {mobileNavOpen && (
          <div onClick={() => setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
            <AuthLinks status={status} userName={userName} />
          </div>
        )}
      </section>
    </div>

  )
}

