import { FaCheckCircle } from "react-icons/fa"
import { FaExclamationCircle } from "react-icons/fa"

export const AlertMessage = (props: any) => {
    return(
        <div id="alert-1" className={"fixed flex p-4 mb-4 rounded-lg "+(props.success?"bg-green-50 text-green-800":"bg-red-50 text-red-800")} role="alert">
            {props.success?<FaCheckCircle />:<FaExclamationCircle/>}
            <span className="sr-only">{props.success?"Success":"Error"}</span>
            <div className="ml-3 text-sm font-medium">
                {props.success?
                "Thank you for your response. We'll reach out as soon as possible.":
                "An unexpected error occurred. Please reload the page."
                }
            </div>
                <button type="button" className={"ml-auto -mx-1.5 -my-1.5 inline-flex h-8 w-8 rounded-lg focus:ring-2 p-1.5 "+(props.success?"bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200":"bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200")} data-dismiss-target="#alert-1" aria-label="Close" onClick={() => document.getElementById('alert-1')?.remove()}>
                <span className="sr-only">Close</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    )
}