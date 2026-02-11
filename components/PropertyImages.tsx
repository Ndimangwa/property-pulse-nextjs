import Image from "next/image";
type PropertyImagesProp = {
    images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProp) => {
    return (
        <section className="bg-blue p-4">
            <div className="container mx-auto">
                {images.length === 1 ? (
                    <Image
                        src={images[0]}
                        alt=''
                        className='object-cover h-[400px] mx-auto rounded-xl'
                        width={1800}
                        height={400}
                        priority={true}
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => {
                            const spanLength = 2;
                            const imageColSpan = ((index == images.length - 1) && ( images.length % spanLength !== 0 ) ) ? `col-span-${spanLength}` : `col-span-${spanLength} md:col-span-1`;
                            {/* className="col-span-2 md:col-span-1" */}
                            return (
                                <div key={index} className={imageColSpan}>
                                    <Image
                                        src={image}
                                        alt=''
                                        className='object-cover h-[400px] w-full rounded-xl'
                                        width={1800}
                                        height={400}
                                        priority={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default PropertyImages;