import Veriff from "@veriff/js-sdk";
import { useEffect} from "react"


const VeriffModal = (props) => {
    useEffect(() => {
        const veriff = Veriff({
            apiKey: 'd7064fbd-7fc4-4551-9723-f4f3b3704722',
            parentId: 'veriff-root',
            onSession: function(err, response) {

            }
        })
    }, []);
    
    return (
        <div id="veriff-root"></div>
    )
}

export default VeriffModal;