import VerifyInputText from "../Button/VerifyInputText";


function Verify() {
    return (
        <>
            <h2 className="text-center text-xl font-bold text-white opacity-65 mb-10">
                Verify statements by writing in the text box or verify a document by uploading a pdf file
            </h2>
            <VerifyInputText />
        </>
    )
}

export default Verify;