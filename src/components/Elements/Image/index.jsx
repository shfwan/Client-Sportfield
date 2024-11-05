const ImagePreview = ({className, src, alt}) => {
    return (
        <img
            className={`flex-[1_0_100%] max-h-96  ${className}`}
            src={src}
            alt={alt}
            loading="lazy"
        />
    )
}

export default ImagePreview