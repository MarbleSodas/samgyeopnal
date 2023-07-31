"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
        const res = await getProviders();
    
        setProviders(res);
    }
    fetchProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <div>
        <Link href="/">
          <Image src="/assets/images/logo_bg.svg" alt='samgyeopnalLogo' width={40} height={40} className='object-contain' />
        </Link>
      </div>

    {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create-post" className='black_btn'>
                    Create Post
                </Link> 
                <button type='button' onClick={signOut} className='outline_btn'>
                    Sign Out
                </button>

                <Link href="/profile">
                    <Image 
                    src={session?.user.image}
                    alt='profile'
                    width={37}
                    height={37}
                    className='rounded-full'
                    />
                </Link>
            </div>
        ):(<>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
        </>)}
      </div>
      
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image 
                        src={session?.user.image}
                        alt='profile'
                        width={37}
                        height={37}
                        className='rounded-full'
                        onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                    
                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link 
                            href="/profile"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link 
                            href="/create-post"
                            className='dropdown_link'
                            onClick={() => setToggleDropdown(false)}
                            >
                                Create Post
                            </Link>
                            <button type='button' onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                            className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ): (
                <>
                    {providers &&
                    Object.values(providers).map((provider) => (
                        <button
                        type='button'
                        key={provider.name}
                        onClick={() => {
                            signIn(provider.id);
                        }}
                        className='black_btn'
                        >
                        Sign in
                        </button>
                    ))}
                </>
            )}
      </div>
    </nav>
  )
}
