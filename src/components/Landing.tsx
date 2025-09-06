import {useNavigate} from "react-router-dom";
import {GridBeams} from "./magicui/grid-beams";
import {RainbowButton} from "@/components/magicui/rainbow-button.tsx";
import {InteractiveHoverButton} from "./magicui/interactive-hover-button";
import {TextAnimate} from "@/components/magicui/text-animate.tsx";

const Landing = () => {
    const navigate = useNavigate()
    return (
        <GridBeams gridSize={0} rayOpacity={0.25} gridFadeEnd={40}>
            <div className={'flex flex-col items-center justify-center h-screen'}>
                <RainbowButton className={'text-xs sm:text-base'}>
                    💡 Smart Analytics Dashboard
                </RainbowButton>
                <TextAnimate animation="blurInUp" by="word" once
                             className={'text-4xl md:text-5xl lg:text-7xl font-semibold m-5 px-4 md:px-20 lg:px-44 text-center'}>
                    Professional DISC Assessments Made Simple
                </TextAnimate>

                <TextAnimate animation="blurInUp" by="word" once
                             className={'hidden md:block md:text-xl lg:text-2xl font-medium px-4 md:px-20 lg:px-52 text-center text-neutral-300'}>
                    Get deep personality insights, improve team communication, and boost performance with comprehensive
                    behavioral analysis platform.
                </TextAnimate>
                <InteractiveHoverButton
                    className={'m-5 md:px-6 md:py-3 cursor-pointer'}
                    onClick={() => navigate('/quiz')}>
                    Take Assessment
                </InteractiveHoverButton>

            </div>
        </GridBeams>
    )
}
export default Landing