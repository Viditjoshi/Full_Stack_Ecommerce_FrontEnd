import React from 'react'
import { Link } from 'react-router-dom'

const NavigationLink = () => {
    const links = [
        {
            name: "MAN",
            submenu: true,
            sublinks: [{
                Head: "Spcial Chains",
                sublink: [
                    { name: 'Gold Chain', link: '/products/Gold Chain' },
                    { name: 'Black Chain', link: '/products/Black Chain' },
                    { name: 'Sliver Chain', link: '/products/Sliver Chain' },
                ]
            },
            {
                Head: "Spcial Rings",
                sublink: [
                    { name: 'Gold Rings', link: '/products/Gold Rings' },
                    { name: 'Black Rings', link: '/products/Black Rings' },
                    { name: 'Sliver Rings', link: '/products/Sliver Rings' },
                ]
            },
            {
                Head: "Spcial Hand Bracelet",
                sublink: [
                    { name: 'Gold Bracelet', link: '/products' },
                    { name: 'Sliver Bracelet', link: '/products' },
                ]
            },
            {
                Head: "Spcial Hand Bracelet",
                sublink: [
                    { name: 'Gold Bracelet', link: '/products' },
                    { name: 'Sliver Bracelet', link: '/products' },
                ]
            },
            {
                Head: "Raksha Bandhan Rakhi",
                sublink: [
                    { name: 'Gold Rakhi', link: '/products' },
                    { name: 'Sliver Rakhi', link: '/products' },
                ]
            }
            ]
        },
        {
            name: "WOMEN",
            submenu: true,
            sublinks: [{
                Head: "Spcial Dimend Set",
                sublink: [
                    { name: 'Gold Set', link: '/' },
                    { name: 'Sliver Set', link: '/' },
                    { name: 'Antique Set', link: '/' },

                ]
            },
            {
                Head: "Spcial Rings",
                sublink: [
                    { name: 'Gold Rings', link: '/' },
                    { name: 'Black Rings', link: '/' },
                    { name: 'Sliver Rings', link: '/' },
                ]
            },
            {
                Head: "Spcial Hand Bracelet",
                sublink: [
                    { name: 'Gold Bracelet', link: '/' },
                    { name: 'Sliver Bracelet', link: '/' },
                ]
            },
            {
                Head: "Spcial Hand Bracelet",
                sublink: [
                    { name: 'Gold Bracelet', link: '/' },
                    { name: 'Sliver Bracelet', link: '/' },
                ]
            },
            {
                Head: "Raksha Bandhan Rakhi",
                sublink: [
                    { name: 'Gold Rakhi', link: '/' },
                    { name: 'Sliver Rakhi', link: '/' },
                ]
            }
            ]
        }, //{ name: "PAGES" }
    ]

    return (
        <>
            {links.map((links) => (
                <div className='z-20'>
                    <div className='cursor-pointer group '>
                        <h1 className='hover:text-slate-300'>{links.name}</h1>
                        <div></div>
                        {links.submenu && (
                            <div>
                                <div className=' absolute top-[3.9em] hidden delay-500 group-hover:block hover:block '>
                                    <div className='pb-2'>
                                        <div className='w-5 h-5 left-3 absolute bg-gray-800 rotate-45'></div>
                                    </div>
                                    <div className='bg-gray-800 p-3.5 grid grid-cols-3 gap-10 '>
                                        {
                                            links.sublinks?.map((mysublinks) => (
                                                <div>
                                                    <h1 className='text-lg font-semibold'>{mysublinks.Head}</h1>
                                                    {mysublinks.sublink.map(slink => (
                                                        <li className='text-sm text-white my-2.5 list-none '>
                                                            <Link to={slink.link} className='hover:text-slate-300'>{slink.name}</Link>
                                                        </li>
                                                    ))}
                                                </div>
                                            )
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default NavigationLink
