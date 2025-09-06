import {useEffect, useState} from "react";
import Result from "@/components/Result.tsx";
import {ArrowLeft, ArrowRight, Circle, CircleCheck} from "lucide-react";
import {Progress} from "@/components/ui/progress.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {AnimatePresence} from "motion/react";

export interface DISCScores {
    D: number;
    I: number;
    S: number;
    C: number;
}

const Assessment = () => {

    const discQuestions = [
        {
            id: 1,
            question: "When working on a team project, you prefer to:",
            options: [
                {text: "Motivate others and build team enthusiasm", trait: "I", score: 1},
                {text: "Support team harmony and ensure everyone contributes", trait: "S", score: 1},
                {text: "Take charge and direct the team's efforts", trait: "D", score: 1},
                {text: "Focus on accuracy and quality of the work", trait: "C", score: 1}
            ]
        },
        {
            id: 2,
            question: "Under pressure, you typically:",
            options: [
                {text: "Remain calm and seek stability", trait: "S", score: 1},
                {text: "Become more assertive and decisive", trait: "D", score: 1},
                {text: "Try to maintain a positive atmosphere", trait: "I", score: 1},
                {text: "Analyze the situation thoroughly before acting", trait: "C", score: 1}
            ]
        },
        {
            id: 3,
            question: "In social situations, you tend to:",
            options: [
                {text: "Be direct and to the point", trait: "D", score: 1},
                {text: "Listen carefully to others", trait: "S", score: 1},
                {text: "Observe before participating", trait: "C", score: 1},
                {text: "Be outgoing and expressive", trait: "I", score: 1},

            ]
        },
        {
            id: 4,
            question: "When making decisions, you prioritize:",
            options: [
                {text: "Accuracy and thoroughness", trait: "C", score: 1},
                {text: "Impact on people and relationships", trait: "I", score: 1},
                {text: "Speed and efficiency", trait: "D", score: 1},
                {text: "Consensus and stability", trait: "S", score: 1},
            ]
        },
        {
            id: 5,
            question: "Your ideal work environment is:",
            options: [
                {text: "Fast-paced with clear results", trait: "D", score: 1},
                {text: "Stable with supportive colleagues", trait: "S", score: 1},
                {text: "Organized with quality standards", trait: "C", score: 1},
                {text: "Collaborative and people-focused", trait: "I", score: 1},
            ]
        },
        {
            id: 6,
            question: "When facing challenges, you:",
            options: [
                {text: "Seek support and work through them steadily", trait: "S", score: 1},
                {text: "Confront them head-on", trait: "D", score: 1},
                {text: "Look for creative, people-centered solutions", trait: "I", score: 1},
                {text: "Research and plan your approach carefully", trait: "C", score: 1}
            ]
        },
        {
            id: 7,
            question: "In communication, you value:",
            options: [
                {text: "Precision and detail", trait: "C", score: 1},
                {text: "Directness and brevity", trait: "D", score: 1},
                {text: "Enthusiasm and inspiration", trait: "I", score: 1},
                {text: "Patience and understanding", trait: "S", score: 1},
            ]
        },
        {
            id: 8,
            question: "Your biggest fear at work would be:",
            options: [

                {text: "Being rejected or ignored", trait: "I", score: 1},
                {text: "Being taken advantage of", trait: "D", score: 1},
                {text: "Making mistakes or being criticized", trait: "C", score: 1},
                {text: "Sudden changes or conflict", trait: "S", score: 1},
            ]
        }
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [scores, setScores] = useState<DISCScores>({D: 0, I: 0, S: 0, C: 0})
    const [isCompleted, setIsCompleted] = useState(false)

    const progress = (Object.keys(answers).length / discQuestions.length) * 100


    useEffect(() => {
        const newScores: DISCScores = {D: 0, I: 0, S: 0, C: 0}

        Object.entries(answers).forEach(([qIndex, ansIndex]) => {
            const option = discQuestions[Number(qIndex)].options[Number(ansIndex)]
            newScores[option.trait as keyof DISCScores] += option.score
        })
        setScores(newScores)
    }, [answers])

    const handleAnswer = (optionIndex: number) => {
        setAnswers(prev => (
            {
                ...prev,
                [currentQuestion]: `${optionIndex}`
            }
        ))
    }

    const handleNext = () => {
        if (currentQuestion < discQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            setIsCompleted(true)
        }
    }
    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1)
        }
    }
    const resetAssessment = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setScores({D: 0, I: 0, S: 0, C: 0});
        setIsCompleted(false);
    };

    if (isCompleted) {
        return <Result scores={scores} onRetake={resetAssessment}/>
    }
    const question = discQuestions[currentQuestion]

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-4 md:mx-auto">
                <motion.div
                    className="text-center "
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                    viewport={{once: true}}
                >
                    <Link to={'/'}>
                        <div className="flex items-center justify-center">
                            <h1 className="text-xl md:text-3xl font-bold">DISC Assessment</h1>
                        </div>
                    </Link>

                    <div className="mt-2">
                        <Progress value={progress} className="h-2"/>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                    viewport={{once: true}}
                >
                    <Card className="shadow-card border-0 bg-gradient-card animate-slide-up">
                        <CardHeader className="text-center space-y-3 p-1.5 md:p-3">
                            <Badge variant="outline" className="w-fit mx-auto">
                                Question {currentQuestion + 1}
                            </Badge>
                            <CardTitle className="text-xl md:text-2xl leading-relaxed">
                                {question.question}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 p-4 md:p-6">
                            <AnimatePresence>
                            <motion.div
                                className="grid gap-3"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}

                            >
                                {question.options.map((option, index) => {
                                    const isSelected = answers[currentQuestion] === `${index}`;
                                    return (
                                        <Button
                                            key={index}
                                            variant={isSelected ? "default" : "outline"}
                                            className={`p-4 md:p-6 h-auto text-left justify-start transition-all hover:shadow-soft text-sm md:text-base ${
                                                isSelected ? 'bg-primary text-primary-foreground shadow-glow' : ''
                                            }`}
                                            onClick={() => handleAnswer(index)}
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                {isSelected?<CircleCheck/>:<Circle />}

                                                <span className="leading-relaxed text-wrap">{option.text}</span>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </motion.div>

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    onClick={handlePrev}
                                    disabled={currentQuestion === 0}
                                    variant={'outline'}
                                    className={`flex items-center space-x-2 text-sm md:text-base p-4  ${currentQuestion === 0?"cursor-not-allowed":"cursor-pointer"}`}
                                >
                                    <ArrowLeft className="h-4 w-4"/>
                                    <span>Previous</span>
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={!answers[currentQuestion]}
                                    variant={'outline'}
                                    className={`flex items-center space-x-2 text-sm md:text-base px-4 cursor-pointer ${!answers[currentQuestion]?"cursor-not-allowed":"cursor-pointer"}`}
                                >
                                    <span>{currentQuestion === discQuestions.length - 1 ? "Finish" : "Next"}</span>
                                    <ArrowRight className="h-4 w-4"/>
                                </Button>
                            </div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div>
    );
}
export default Assessment