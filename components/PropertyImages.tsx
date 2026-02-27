'use client';
import Image from "next/image";
import { Gallery, Item } from 'react-photoswipe-gallery';
type PropertyImagesProp = {
    images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProp) => {
    return (
        <Gallery>
            <section className="bg-blue p-4">
                <div className="container mx-auto">
                    {images.length === 1 ? (
                        <Item
                            original={images[0]}
                            thumbnail={images[0]}
                            width={1000}
                            height={600}
                        >
                            {({ ref, open }) => (
                                <Image
                                    src={images[0]}
                                    alt=''
                                    ref={ref}
                                    onClick={open}
                                    className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                                    width={1800}
                                    height={400}
                                    priority={true}
                                />
                            )}
                        </Item>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {images.map((image, index) => {
                                const spanLength = 2;
                                const imageColSpan = ((index == images.length - 1) && (images.length % spanLength !== 0)) ? `col-span-${spanLength}` : `col-span-${spanLength} md:col-span-1`;
                                {/* className="col-span-2 md:col-span-1" */ }
                                return (
                                    <div key={index} className={imageColSpan}>
                                        <Item
                                            original={image}
                                            thumbnail={image}
                                            width={1000}
                                            height={600}
                                        >
                                            {({ ref, open }) => (
                                                <Image
                                                    src={image}
                                                    alt=''
                                                    ref={ref}
                                                    onClick={open}
                                                    className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                                                    width={1800}
                                                    height={400}
                                                    priority={true}
                                                />
                                            )}
                                        </Item>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </Gallery>
    );
}

export default PropertyImages;