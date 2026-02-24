import React from 'react'
import { Link } from 'react-router-dom'

const NavigationLink = ({ scrolled, isHome }) => {
    const links = [
        {
            name: "Men",
            submenu: true,
            sublinks: [{
                Head: "Chains",
                sublink: [
                    { name: 'Gold Chain', link: '/products/Gold Chain' },
                    { name: 'Black Chain', link: '/products/Black Chain' },
                    { name: 'Silver Chain', link: '/products/Sliver Chain' },
                ]
            },
            {
                Head: "Rings",
                sublink: [
                    { name: 'Gold Rings', link: '/products/Gold Rings' },
                    { name: 'Black Rings', link: '/products/Black Rings' },
                    { name: 'Silver Rings', link: '/products/Sliver Rings' },
                ]
            },
            {
                Head: "Bracelets",
                sublink: [
                    { name: 'Gold Bracelet', link: '/products' },
                    { name: 'Silver Bracelet', link: '/products' },
                ]
            },
            {
                Head: "Rakhi Collection",
                sublink: [
                    { name: 'Gold Rakhi', link: '/products' },
                    { name: 'Silver Rakhi', link: '/products' },
                ]
            }
            ]
        },
        {
            name: "Women",
            submenu: true,
            sublinks: [{
                Head: "Diamond Sets",
                sublink: [
                    { name: 'Gold Set', link: '/' },
                    { name: 'Silver Set', link: '/' },
                    { name: 'Antique Set', link: '/' },
                ]
            },
            {
                Head: "Rings",
                sublink: [
                    { name: 'Gold Rings', link: '/' },
                    { name: 'Black Rings', link: '/' },
                    { name: 'Silver Rings', link: '/' },
                ]
            },
            {
                Head: "Bracelets",
                sublink: [
                    { name: 'Gold Bracelet', link: '/' },
                    { name: 'Silver Bracelet', link: '/' },
                ]
            },
            {
                Head: "Earrings",
                sublink: [
                    { name: 'Gold Earrings', link: '/' },
                    { name: 'Diamond Earrings', link: '/' },
                ]
            }
            ]
        },
    ]

    return (
        <>
            {links.map((link, idx) => (
                <div key={idx} className='relative z-20'>
                    <div className='cursor-pointer group'>
                        <h1 className='hover:opacity-70 transition-opacity pb-1'>{link.name}</h1>
                        {link.submenu && (
                            <div className='absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block hover:block'>
                                <div className='bg-white rounded-lg shadow-xl border border-cream p-6 grid grid-cols-2 gap-x-10 gap-y-6 min-w-[400px]'>
                                    {link.sublinks?.map((mysublinks, subIdx) => (
                                        <div key={subIdx}>
                                            <h2 className='text-xs font-sans font-semibold tracking-[0.15em] uppercase text-gold mb-3'>
                                                {mysublinks.Head}
                                            </h2>
                                            <ul className="space-y-2">
                                                {mysublinks.sublink.map((slink, sIdx) => (
                                                    <li key={sIdx}>
                                                        <Link 
                                                            to={slink.link} 
                                                            className='text-sm font-sans text-charcoal hover:text-gold transition-colors duration-200'
                                                        >
                                                            {slink.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}

export default NavigationLink
