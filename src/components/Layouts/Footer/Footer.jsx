import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className=''>


            <footer class="">
                <div class="mx-auto w-full max-w-screen-xl">
                    <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h1 className=" md:block text-4xl font-extralight text-white font-abc">Hari Om</h1>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <Link to="/contact" class=" hover:underline">Contact</Link>
                                </li>
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Team Work</a>
                                </li>
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Brand Center</a>
                                </li>
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <Link href="#" class="hover:underline">Discord Server</Link>
                                </li>
                                <li class="mb-4">
                                    <Link href="#" class="hover:underline">Twitter</Link>
                                </li>
                                <li class="mb-4">
                                    <Link href="#" class="hover:underline">Facebook</Link>
                                </li>
                                <li class="mb-4">
                                    <Link href="#" class="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                </li>
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Licensing</a>
                                </li>
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="px-4 py-6 md:flex md:items-center md:justify-between">
                        <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/">Vidit Joshi</a>. All Rights Reserved.
                        </span>
                        <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Facebook page</span>
                            </a>

                            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48">
                                    <path d="M 16.5 5 C 10.16639 5 5 10.16639 5 16.5 L 5 31.5 C 5 37.832757 10.166209 43 16.5 43 L 31.5 43 C 37.832938 43 43 37.832938 43 31.5 L 43 16.5 C 43 10.166209 37.832757 5 31.5 5 L 16.5 5 z M 16.5 8 L 31.5 8 C 36.211243 8 40 11.787791 40 16.5 L 40 31.5 C 40 36.211062 36.211062 40 31.5 40 L 16.5 40 C 11.787791 40 8 36.211243 8 31.5 L 8 16.5 C 8 11.78761 11.78761 8 16.5 8 z M 34 12 C 32.895 12 32 12.895 32 14 C 32 15.105 32.895 16 34 16 C 35.105 16 36 15.105 36 14 C 36 12.895 35.105 12 34 12 z M 24 14 C 18.495178 14 14 18.495178 14 24 C 14 29.504822 18.495178 34 24 34 C 29.504822 34 34 29.504822 34 24 C 34 18.495178 29.504822 14 24 14 z M 24 17 C 27.883178 17 31 20.116822 31 24 C 31 27.883178 27.883178 31 24 31 C 20.116822 31 17 27.883178 17 24 C 17 20.116822 20.116822 17 24 17 z"></path>
                                </svg>
                                <span class="sr-only">instgram</span>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">GitHub account</span>
                            </a>

                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
