import {Button} from "@/components/ui/button.tsx";

import {useNavigate} from "react-router-dom";

const Landing = () => {
    const navigate=useNavigate()
    return(
        <div className={'flex flex-col items-center justify-center h-screen'}>
            <h1 className={'text-6xl font-semibold m-5'}>
                DISC Assessment
            </h1>
            <Button
            onClick={()=>navigate('/quiz')}>
                Take Assessment
            </Button>
        </div>
    )
}
export default Landing