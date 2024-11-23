import VerifyInputText from "../Button/VerifyInputText";


function Verify() {
    return (
        <>
            <h1 className={`absolute right-8 md:right-32 top-14 sm:top-16 font-black bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-transparent bg-clip-text transition-all duration-300 text-4xl mb-4 md:mb-0 md:ml-4`}>
                VeriFind
            </h1>
            <h2 className="text-center text-xl font-bold text-white opacity-65 mb-10">
                Verify statements by writing in the text box or verify a document by uploading a pdf file
            </h2>
            <VerifyInputText />
        </>
    )
}

export default Verify;